
var canvas = {
    "fill": {
        "type": "color",
        "fill": "rgba(255, 255, 255, 1)"
    }
}

function changeBackgroundFillType(el){

    document.querySelector(".favicon_creator_editor_canvas_fill_type_item_selected").classList.remove("favicon_creator_editor_canvas_fill_type_item_selected");

    el.classList.add("favicon_creator_editor_canvas_fill_type_item_selected");
    var fillType = el.getAttribute("data-type");

    canvas.fill.type = fillType;

    document.getElementById("favicon_creator_visual_inner_container").classList.remove("favicon_creator_visual_no_bg");
    
    
    document.querySelector('.favicon_creator_canvas_fill_type_container_item_selected').classList.remove("favicon_creator_canvas_fill_type_container_item_selected");
    

    switch(fillType){
        case "none":
            changeBackgroundFillTypeNone();
            break;
        case "color":
            changeBackgroundFillTypeColor();
            break;
    }

    document.querySelector(".favicon_creator_canvas_fill_type_container_item[data-type='"+fillType+"']").classList.add("favicon_creator_canvas_fill_type_container_item_selected");
}

function changeBackgroundFillTypeNone(){

    canvas.fill.fill = "rgba(0, 0, 0, 0)";
    document.getElementById("favicon_creator_visual").style.backgroundColor = "rgba(0, 0, 0, 0)";
    document.getElementById("favicon_creator_visual_inner_container").classList.add("favicon_creator_visual_no_bg");

}

function changeBackgroundFillTypeColor(){
    var color = document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="color"] .favicon_creator_editor_canvas_fill_type_item_inner').style.backgroundColor;
    if (color == ""){
        canvas.fill.fill = "rgba(255, 255, 255, 1)";
        document.querySelector("#favicon_creator_visual").style.backgroundColor = "rgba(255, 255, 255, 1)";
    } else {
        canvas.fill.fill = color;
        document.querySelector("#favicon_creator_visual").style.backgroundColor = color;
    }
}


// Simple example, see optional options for more configuration.
const backgroundCanvasColorPickr = Pickr.create({
    el: '.canvas-background-color-picker',
    theme: 'monolith', // or 'monolith', or 'nano'
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: false,
            save: true
        }
    },
    default: '#FFFFFF'
});

backgroundCanvasColorPickr.on('save', (color, instance) => {

    var color = color.toRGBA().toString();
    canvas.fill.fill = color;
    document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="color"] .favicon_creator_editor_canvas_fill_type_item_inner').style.backgroundColor = color;
    document.querySelector("#favicon_creator_visual").style.backgroundColor = color;
    backgroundCanvasColorPickr.hide()
});



function zoomCanvas(which){

    var currentZoom = document.getElementById("favicon_creator_visual_inner_container").style.zoom;

    if (currentZoom === ""){
        currentZoom = 1;
    } else {
        currentZoom = Number(currentZoom);
    }

    if (which === 0){
        var newZoom = currentZoom - 0.05;
    } else {
        var newZoom = currentZoom + 0.05;
    }

    document.getElementById("favicon_creator_visual_inner_container").style.zoom = newZoom;
}

function zoomCanvasReset(){
    document.getElementById("favicon_creator_visual_inner_container").style.zoom = 1;
}

function fitToArea(){

    var areaHeight = document.getElementById("favicon_creator_visual_outer_container").offsetHeight;
    var areaWidth = document.getElementById("favicon_creator_visual_outer_container").offsetWidth;

    console.log(areaHeight);
    console.log(areaWidth);

    var canvasHeight = document.getElementById("favicon_creator_visual_inner_container").offsetHeight;
    var canvasWidth = document.getElementById("favicon_creator_visual_inner_container").offsetWidth;

    console.log(canvasHeight);
    console.log(canvasWidth);
    
    var timesHeight = Number((areaHeight/canvasHeight).toFixed(2));
    var timesWidth = Number((areaWidth/canvasWidth).toFixed(2));

    console.log(timesHeight);
    console.log(timesWidth);

    if (timesHeight > timesWidth){
        var newZoom = timesWidth;
        console.log("Times Width");
    } else {
        var newZoom = timesHeight;
        console.log("Times Height");
    }

    newZoom = newZoom - 0.05;

    document.getElementById("favicon_creator_visual_inner_container").style.zoom = newZoom;

}

function addGuide(which){
    
    if (which === 0){
        var guideClass = 'guide_horizontal';
        var guideData = 'data-y="100"';
    } else {
        var guideClass = 'guide_vertical';
        var guideData = 'data-x="100"';
    }

    var guide = '<div class="guide ' + guideClass + '" ' + guideData + '></div>';

    document.getElementById("favicon_creator_visual_outer_container").innerHTML += guide;

}

function canvasWidthChange(){

    var width = document.getElementById("favicon_creator_editor_canvas_size_width").value;
    canvas.width = width;

    document.getElementById("favicon_creator_visual_inner_container").style.width = canvas.width + "px";
    document.getElementById("favicon_creator_visual").style.width = canvas.width + "px";

}

function canvasHightChange(){

    var height = document.getElementById("favicon_creator_editor_canvas_size_height").value;
    canvas.height = height;

    document.getElementById("favicon_creator_visual_inner_container").style.height = canvas.height + "px";
    document.getElementById("favicon_creator_visual").style.height = canvas.height + "px";

}