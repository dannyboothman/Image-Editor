var colorStyleElement;

function buildColorStyleNav(){
    
    if(document.querySelector(".favicon_creator_editor_section_colorStyle_item_selected")){
        document.querySelector(".favicon_creator_editor_section_colorStyle_item_selected").classList.remove("favicon_creator_editor_section_colorStyle_item_selected"); 
    }

    // Get selected element
    if (document.querySelector(".favicon_creator_elements_item_selected")){
        var id = document.querySelector(".favicon_creator_elements_item_selected").getAttribute("data-id");
        console.log(id);

        var element = layers.filter(function(layer) {
            return layer.id === id;
        });

        element = element[0];
        colorStyleElement = element.id;
        console.log(element);

        // Show section
        document.querySelector(".favicon_creator_editor_section_colorStyle_item[data-type='"+element.type+"']").classList.add("favicon_creator_editor_section_colorStyle_item_selected");

        switch (element.type){
            case "text":
                buildColorStyleSection(element)
                break;
        }

    }

}

function buildColorStyleSection(element){

    document.querySelector("#colorStyle_text_input").value = element.value;
    document.querySelector("#colorStyle_text_size_input").value = element.styles.fontSize;
    document.querySelector("#colorStyle_text_opacity_input").value = element.styles.opacity;

}

function colorStyleInputChange(){
    console.log(colorStyleElement)

    var element = layers.filter(function(layer) {
        return layer.id === colorStyleElement;
    });

    element = element[0];
    element.value = document.querySelector("#colorStyle_text_input").value;
    document.querySelector(".fcv_item[data-id='"+element.id+"']").innerHTML = element.value;
    if(element.name == null){
        document.querySelector(".favicon_creator_elements_item_name[data-id='"+element.id+"']").innerText = element.value;
    }
}

function colorStyleInputFontSizeChange(){

    console.log(colorStyleElement)

    var element = layers.filter(function(layer) {
        return layer.id === colorStyleElement;
    });

    element = element[0];

    var fontSize = document.querySelector("#colorStyle_text_size_input").value;
    if (fontSize === "" || fontSize <= 0){
        fontSize = 1;
    }
    document.querySelector("#colorStyle_text_size_input").value = fontSize;

    element.styles.fontSize = fontSize;
    document.querySelector(".fcv_item[data-id='"+element.id+"']").style.fontSize = element.styles.fontSize + "px";

}

function colorStyleInputOpacityChange(){
    console.log(colorStyleElement)

    var element = layers.filter(function(layer) {
        return layer.id === colorStyleElement;
    });

    element = element[0];

    var opacity = document.querySelector("#colorStyle_text_opacity_input").value;
    element.styles.opacity = opacity;
    opacity = opacity/100;
    document.querySelector(".fcv_item[data-id='"+element.id+"']").style.opacity = opacity;
}