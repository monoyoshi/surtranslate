let $latin = $("#latin");
let $japanese = $("#japanese");

function toggleEN() {
    $(".latinav").addClass("active");
    $(".japanav").removeClass("active");
    $("textarea").val("");
    $("#latin").css("display", "block");
    $("#japanese").css("display", "none");

};

function toggleJP() {
    $(".japanav").addClass("active");
    $(".latinav").removeClass("active");
    $("textarea").val("");
    $("#latin").css("display", "none");
    $("#japanese").css("display", "block");

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
});