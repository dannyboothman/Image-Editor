
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
        case "gradient":
            changeBackgroundFillTypeGradient();
            break;
    }

    document.querySelector(".favicon_creator_canvas_fill_type_container_item[data-type='"+fillType+"']").classList.add("favicon_creator_canvas_fill_type_container_item_selected");
}

function changeBackgroundFillTypeNone(){

    document.querySelector("#favicon_creator_visual").style.background = "";
    canvas.fill.fill = "rgba(0, 0, 0, 0)";
    document.getElementById("favicon_creator_visual").style.backgroundColor = "rgba(0, 0, 0, 0)";
    document.getElementById("favicon_creator_visual_inner_container").classList.add("favicon_creator_visual_no_bg");

    
}

function changeBackgroundFillTypeColor(){
    document.querySelector("#favicon_creator_visual").style.background = "";
    var color = document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="color"] .favicon_creator_editor_canvas_fill_type_item_inner').style.backgroundColor;
    if (color == ""){
        canvas.fill.fill = "rgba(255, 255, 255, 1)";
        document.querySelector("#favicon_creator_visual").style.backgroundColor = "rgba(255, 255, 255, 1)";
    } else {
        canvas.fill.fill = color;
        document.querySelector("#favicon_creator_visual").style.backgroundColor = color;
    }
}

// 1 Color Fill
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

    document.querySelector("#favicon_creator_visual").style.background = "";
    var color = color.toRGBA().toString();
    canvas.fill.fill = color;
    document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="color"] .favicon_creator_editor_canvas_fill_type_item_inner').style.backgroundColor = color;
    document.querySelector("#favicon_creator_visual").style.backgroundColor = color;
    
    backgroundCanvasColorPickr.hide()
});


/* Gradient */
function changeBackgroundFillTypeGradient(){
    var color = document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="gradient"] .favicon_creator_editor_canvas_fill_type_item_inner').style.background;
    console.log(color);
    if (color == ""){
        canvas.fill.fill = "linear-gradient(90deg, rgba(0, 58, 105,1) 0%, rgba(51,154,240,1) 100%)";
        document.querySelector("#favicon_creator_visual").style.background = canvas.fill.fill;
    } else {
        canvas.fill.fill = color;
        document.querySelector("#favicon_creator_visual").style.background = color;
    }
}

const backgroundCanvasColorPickrGradient1 = Pickr.create({
    el: '#favicon_creator_cavas_fill_type_gradient_color1',
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
    default: 'rgba(0, 58, 105,1)'
});

backgroundCanvasColorPickrGradient1.on('save', (color, instance) => {

    var color1 = color.toRGBA().toString();
    var color2 = backgroundCanvasColorPickrGradient2._color.toRGBA().toString();

    var angle = canvas.fill.angle;
    if (angle === undefined){
        angle = 90;
    }

    var gradientStyle = canvas.fill.gradientStyle;
    console.log(gradientStyle);
    if (gradientStyle === undefined){
        gradientStyle = 'linear-gradient('+angle+'deg, ';
    } else {
        if (gradientStyle === 'linear'){
            gradientStyle = 'linear-gradient('+angle+'deg, ';
        } else if (gradientStyle === 'radial'){
            gradientStyle = 'radial-gradient(';
        }
    }

    canvas.fill.fill = gradientStyle+color1+' 0%, '+color2+' 100%)';

    document.getElementById("favicon_creator_canvas_fill_type_gradient_example").style.background = canvas.fill.fill;
    document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="gradient"] .favicon_creator_editor_canvas_fill_type_item_inner').style.background = canvas.fill.fill;
    document.querySelector("#favicon_creator_visual").style.background = canvas.fill.fill;

    backgroundCanvasColorPickrGradient1.hide();
});

const backgroundCanvasColorPickrGradient2 = Pickr.create({
    el: '#favicon_creator_cavas_fill_type_gradient_color2',
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
    default: 'rgba(51,154,240,1)'
});

backgroundCanvasColorPickrGradient2.on('save', (color, instance) => {

    var color2 = color.toRGBA().toString();
    var color1 = backgroundCanvasColorPickrGradient1._color.toRGBA().toString();
    
    var angle = canvas.fill.angle;
    if (angle === undefined){
        angle = 90;
    }

    var gradientStyle = canvas.fill.gradientStyle;
    console.log(gradientStyle);
    if (gradientStyle === undefined){
        gradientStyle = 'linear-gradient('+angle+'deg, ';
    } else {
        if (gradientStyle === 'linear'){
            gradientStyle = 'linear-gradient('+angle+'deg, ';
        } else if (gradientStyle === 'radial'){
            gradientStyle = 'radial-gradient(';
        }
    }

    canvas.fill.fill = gradientStyle+color1+' 0%, '+color2+' 100%)';

    document.getElementById("favicon_creator_canvas_fill_type_gradient_example").style.background = canvas.fill.fill;
    document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="gradient"] .favicon_creator_editor_canvas_fill_type_item_inner').style.background = canvas.fill.fill;
    document.querySelector("#favicon_creator_visual").style.background = canvas.fill.fill;

    backgroundCanvasColorPickrGradient2.hide();
});


function changeBackgroundGradientAngle(){

    canvas.fill.angle = document.getElementById("favicon_creator_canvas_fill_type_gradient_angle").value;
    var color1 = backgroundCanvasColorPickrGradient1._color.toRGBA().toString();
    var color2 = backgroundCanvasColorPickrGradient2._color.toRGBA().toString();

    var gradientStyle = canvas.fill.gradientStyle;
    console.log(gradientStyle);
    if (gradientStyle === undefined){
        gradientStyle = 'linear-gradient('+canvas.fill.angle+'deg, ';
    } else {
        if (gradientStyle === 'linear'){
            gradientStyle = 'linear-gradient('+canvas.fill.angle+'deg, ';
        } else if (gradientStyle === 'radial'){
            gradientStyle = 'radial-gradient(';
        }
    }

    canvas.fill.fill = gradientStyle+color1+' 0%, '+color2+' 100%)';

    document.getElementById("favicon_creator_canvas_fill_type_gradient_example").style.background = canvas.fill.fill;
    document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="gradient"] .favicon_creator_editor_canvas_fill_type_item_inner').style.background = canvas.fill.fill;
    document.querySelector("#favicon_creator_visual").style.background = canvas.fill.fill;

}

function changeBackgroundGradientStyle(){

    canvas.fill.gradientStyle = document.getElementById("favicon_creator_canvas_fill_type_gradient_type").value;
    console.log(canvas.fill.gradientStyle);
    var angle = document.getElementById("favicon_creator_canvas_fill_type_gradient_angle").value;
    var color1 = backgroundCanvasColorPickrGradient1._color.toRGBA().toString();
    var color2 = backgroundCanvasColorPickrGradient2._color.toRGBA().toString();

    var angleContainer = document.getElementById("favicon_creator_canvas_fill_type_gradient_angle_container");

    if (canvas.fill.gradientStyle === 'linear'){
        var gradientStyle = 'linear-gradient('+angle+'deg, ';
        angleContainer.style.display = "block";
    } else if (canvas.fill.gradientStyle === 'radial'){
        var gradientStyle = 'radial-gradient(';
        angleContainer.style.display = "none";
    }

    canvas.fill.fill = gradientStyle+color1+' 0%, '+color2+' 100%)';
    console.log(canvas.fill.fill)

    document.getElementById("favicon_creator_canvas_fill_type_gradient_example").style.background = canvas.fill.fill;
    document.querySelector('.favicon_creator_editor_canvas_fill_type_item[data-type="gradient"] .favicon_creator_editor_canvas_fill_type_item_inner').style.background = canvas.fill.fill;
    document.querySelector("#favicon_creator_visual").style.background = canvas.fill.fill;

}


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
        var guideClass = ' guide_horizontal';
        var guideData = 'data-y="100"';
    } else {
        var guideClass = ' guide_vertical';
        var guideData = 'data-x="100"';
    }

    var guideHidden = '';
    if (document.querySelector(".guide_hide")){
        guideHidden = ' guide_hide';
    }

    var guide = '<div class="guide' + guideClass + guideHidden +'" ' + guideData + '></div>';

    document.getElementById("favicon_creator_visual_outer_container").innerHTML += guide;

    document.getElementById("favicon_creator_menu_item_dropdown_item_hideGuides").classList.remove("favicon_creator_menu_item_dropdown_item_disabled");
    document.getElementById("favicon_creator_menu_item_dropdown_item_clearGuides").classList.remove("favicon_creator_menu_item_dropdown_item_disabled");

}

function hideGuides(el){

    if (el.innerText === "Hide Guides"){
        el.innerText = "Show Guides";
    } else {
        el.innerText = "Hide Guides";
    }

    var guides = document.querySelectorAll('.guide');

    for (var i = 0; i < guides.length; i++){
        guides[i].classList.toggle("guide_hide");
    }

}

function clearGuides(){

    document.getElementById("favicon_creator_menu_item_dropdown_item_hideGuides").classList.add("favicon_creator_menu_item_dropdown_item_disabled");
    document.getElementById("favicon_creator_menu_item_dropdown_item_clearGuides").classList.add("favicon_creator_menu_item_dropdown_item_disabled");
    document.getElementById("favicon_creator_menu_item_dropdown_item_hideGuides").innerText = "Hide Guides";

    var guides = document.querySelectorAll('.guide');

    for (var i = 0; i < guides.length; i++){
        guides[i].remove();
    }

}

function canvasWidthChange(){

    var width = document.getElementById("favicon_creator_editor_canvas_size_width").value;
    if (canvas.width != null){
        var originalWidth = canvas.width;
    } else {
        var originalWidth = 600;
    }
    
    canvas.width = width;

    document.getElementById("favicon_creator_visual_inner_container").style.width = canvas.width + "px";
    document.getElementById("favicon_creator_visual").style.width = canvas.width + "px";

    var lock = document.querySelector("#favicon_creator_edit_canvas_size_lock").getAttribute("data-lock");
    if (lock === "true"){
        var height = document.getElementById("favicon_creator_editor_canvas_size_height").value;
        canvas.height = height;
        var newHeight = width * height/originalWidth;
        newHeight = Math.round(newHeight);
        canvas.height = newHeight;
        document.getElementById("favicon_creator_editor_canvas_size_height").value = newHeight;
        document.getElementById("favicon_creator_visual_inner_container").style.height = canvas.height + "px";
        document.getElementById("favicon_creator_visual").style.height = canvas.height + "px";
    }

}

function canvasHightChange(){

    var height = document.getElementById("favicon_creator_editor_canvas_size_height").value;
    if (canvas.height != null){
        var originalHeight = canvas.height;
    } else {
        var originalHeight = 400;
    }
    canvas.height = height;

    document.getElementById("favicon_creator_visual_inner_container").style.height = canvas.height + "px";
    document.getElementById("favicon_creator_visual").style.height = canvas.height + "px";

    var lock = document.querySelector("#favicon_creator_edit_canvas_size_lock").getAttribute("data-lock");
    if (lock === "true"){
        var width = document.getElementById("favicon_creator_editor_canvas_size_width").value;
        canvas.width = width;
        var newWidth = height * width/originalHeight;
        newWidth = Math.round(newWidth);
        canvas.width = newWidth;
        document.getElementById("favicon_creator_editor_canvas_size_width").value = newWidth;
        document.getElementById("favicon_creator_visual_inner_container").style.width = canvas.width + "px";
        document.getElementById("favicon_creator_visual").style.width = canvas.width + "px";
    }

}

function widthHeightLockChange(el){

    var icon = el.querySelector("i");
    icon.classList.toggle("fa-lock");
    icon.classList.toggle("fa-unlock");

    var lock = el.getAttribute("data-lock");
    if (lock === "false"){
        el.setAttribute("data-lock", "true");
    } else {
        el.setAttribute("data-lock", "false");
    }

}