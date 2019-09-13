
function buildImageSection(element){

    document.getElementById("imageStyle_width").value = element.styles.width;
    document.getElementById("imageStyle_height").value = element.styles.height;

}


function imageWidthChange(){

    console.log(colorStyleElement);

    var element = layers.filter(function(layer) {
        return layer.id === colorStyleElement;
    });

    element = element[0];

    var width = document.getElementById("imageStyle_width").value;
    var originalWidth = element.styles.width;
    element.styles.width = width;

    document.querySelector(".fcv_item[data-id='"+colorStyleElement+"']").style.width = element.styles.width + "px";
    document.querySelector(".fcv_item[data-id='"+colorStyleElement+"'] img").style.width = element.styles.width + "px";


    var lock = document.querySelector("#imageStyle_width_height_lock").getAttribute("data-lock");
    if (lock === "true"){
        var height = document.getElementById("imageStyle_height").value;
        element.styles.height = height;
        var newHeight = width * height/originalWidth;
        newHeight = Math.round(newHeight);
        element.styles.width = newHeight;

        document.getElementById("imageStyle_height").value = newHeight;
        document.querySelector(".fcv_item[data-id='"+colorStyleElement+"']").style.height = element.styles.height + "px";
        document.querySelector(".fcv_item[data-id='"+colorStyleElement+"'] img").style.height = element.styles.height + "px";
    }

}

function imageHeightChange(){

    console.log(colorStyleElement);

    var element = layers.filter(function(layer) {
        return layer.id === colorStyleElement;
    });

    element = element[0];

    var height = document.getElementById("imageStyle_height").value;
    var originalHeight = element.styles.height;
    element.styles.height = height;

    document.querySelector(".fcv_item[data-id='"+colorStyleElement+"']").style.height = element.styles.height + "px";
    document.querySelector(".fcv_item[data-id='"+colorStyleElement+"'] img").style.height = element.styles.height + "px";


    var lock = document.querySelector("#imageStyle_width_height_lock").getAttribute("data-lock");
    if (lock === "true"){
        var width = document.getElementById("imageStyle_width").value;
        element.styles.width = width;
        var newWidth = height * width/originalHeight;
        newWidth = Math.round(newWidth);
        element.styles.height = newWidth;

        document.getElementById("imageStyle_width").value = newWidth;
        document.querySelector(".fcv_item[data-id='"+colorStyleElement+"']").style.width = element.styles.width + "px";
        document.querySelector(".fcv_item[data-id='"+colorStyleElement+"'] img").style.width = element.styles.width + "px";
    }

}