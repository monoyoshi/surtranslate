function toggleEN() {
    $("textarea").val("");
    $("#latin").css("display", "flex");
    $("#japanese").css("display", "none");
};

function toggleJP() {
    $("#latin").css("display", "none");
    $("#japanese").css("display", "flex");
};

$(document).ready(function () {
    $("#michael-textbox").keyup(function () {
        $("#surtr-textbox").val((sConvert($("#michael-textbox").val())));
    });

    $("#surtr-textbox").keyup(function () {
        $("#michael-textbox").val((mConvert($("#surtr-textbox").val())));
    });
    
    wanakana.bind($("#mikaeru-textbox")[0]);
    wanakana.bind($("#suruto-textbox")[0]);

    $("#mikaeru-textbox").keyup(function () {
        let output = rsConvert($("#mikaeru-textbox").val());
        if (!output[1]) $("#suruto-textbox").val(ksConvert(output[0]));
    });

    $("#suruto-textbox").keyup(function () {
        let output = rmConvert($("#suruto-textbox").val());
        if (!output[1]) $("#mikaeru-textbox").val(kmConvert(output[0]));
    });

    $(".navbutton").click(function () {
        if ($(this).text() == "Japanese / 日本語") {
            $(this).attr("id", "active");
            $(this).prev().removeAttr("id");
        }
        else {
            $(this).attr("id", "active");
            $(this).next().removeAttr("id");
        }
    });
});