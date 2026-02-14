
// generate html elements
function generateElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.children[0];
};

document.addEventListener("DOMContentLoaded", () => {
    // stuff from :root
    const cDimension = parseInt(window.getComputedStyle(document.body).getPropertyValue("--cursor_sizeClick"));
    const clDimension = parseInt(window.getComputedStyle(document.body).getPropertyValue("--cursor_sizeClickBig"));
    const dDimension = parseInt(window.getComputedStyle(document.body).getPropertyValue("--cursor_sizeDust"));

    // what it works off on
    document.body.append(generateElement(`
<div id="asset_cursor">
    <div id="cursor_drag"></div>
    <div id="cursor_click"></div>
</div>
`));

    let isDown = false; // mouse down flag
    let currentTap = undefined; // tapping cooldown; only one spark at a time :)
    let scrollOffsetX = 0; // scrolling offset for the x-position
    let scrollOffsetY = 0; // scrolling offset for the y-position

    const ClickDiv = document.getElementById("cursor_click"); // click element
    const DragDiv = document.getElementById("cursor_drag"); // drag element

    // initiate cursor animation
    function mtDown(downX, downY, target) {
        isDown = true;

        // not animating
        if (!ClickDiv.classList.contains("ed") && !ClickDiv.classList.contains("edbig")) {
            let targetTag = target.tagName.toLowerCase().trim();

            if (targetTag == "a" || targetTag == "button" || target.classList.contains("cursor_big")) { // big click
                ClickDiv.classList.add("edbig");
                ClickDiv.style.top = `${downY - (clDimension / 2) - scrollOffsetY}px`;
                ClickDiv.style.left = `${downX - (clDimension / 2) - scrollOffsetX}px`;
                clearTimeout(currentTap);
            }
            else { // regular click
                ClickDiv.classList.add("ed");
                ClickDiv.style.top = `${downY - (cDimension / 2) - scrollOffsetY}px`;
                ClickDiv.style.left = `${downX - (cDimension / 2) - scrollOffsetX}px`;
                clearTimeout(currentTap);
            }

            // end animation and remove animation class
            currentTap = setTimeout(() => {
                ClickDiv.classList.remove("ed");
                ClickDiv.classList.remove("edbig");
            }, 250);
        };
    };

    // move cursor animation
    function mtMove(currentX, currentY) {
        if (isDown) {
            const dragtrail = generateElement(`
<div class="cursor_dragtrail" style="top: ${currentY - (dDimension / 2) - scrollOffsetY}px; left: ${currentX - (dDimension / 2) - scrollOffsetX}px"></div>
`); // trail

            let dragdustDimensions = Math.floor(Math.random() * dDimension * 1.5);
            const dragdust = generateElement(`
<div class="cursor_dragdust" style="top: ${currentY - (dragdustDimensions * 1.5) + Math.floor(Math.random() * dragdustDimensions * 2) - scrollOffsetY}px; left: ${currentX - (dragdustDimensions * 1.5) + Math.floor(Math.random() * dragdustDimensions * 2) - scrollOffsetX}px; width: ${dragdustDimensions}px; height: ${dragdustDimensions}px; opacity: ${Math.random()};">
`); // dust

            DragDiv.append(dragtrail);
            DragDiv.append(dragdust);

            // this is so the trail shrinks properly
            dragtrail.animate([
                {},
                {
                    top: `${currentY - scrollOffsetY}px`,
                    left: `${currentX - scrollOffsetX}px`
                },
            ], {
                duration: 500,
                easing: "linear"
            });

            setTimeout(() => {
                dragtrail.remove();
                dragdust.remove();
            }, 500);
        };
    };

    // deactivate cursor animation
    function mtUp() {
        isDown = false;
    };

    document.addEventListener("mousedown", (event) => {
        mtDown(event.pageX, event.pageY, event.target);
    });
    document.addEventListener("mousemove", (event) => {
        mtMove(event.pageX, event.pageY);
    });
    document.addEventListener("mouseup", mtUp);

    // mobile
    document.addEventListener("touchstart", (event) => {
        mtDown(event.targetTouches[0].pageX, event.targetTouches[0].pageY, event.target);
    });
    document.addEventListener("touchmove", (event) => {
        mtMove(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
    });
    document.addEventListener("touchend", mtUp);
    document.addEventListener("touchcancel", mtUp);

    // scroll support (offset)
    document.addEventListener("scroll", () => {
        scrollOffsetX = window.scrollX;
        scrollOffsetY = window.scrollY;
    });
});