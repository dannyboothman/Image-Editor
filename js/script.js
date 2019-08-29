
function showMenu(){
    document.getElementById("header_nav").classList.toggle("header_nav_active");
}

function editorNav(type){

    console.log(type)

    if (document.querySelector('.favicon_creator_nav_item_selected')){
        document.querySelector('.favicon_creator_nav_item_selected').classList.remove("favicon_creator_nav_item_selected");
    }

    var nav = document.querySelector('.favicon_creator_nav_item[data-editorNav="'+type+'"]');

    nav.classList.add('favicon_creator_nav_item_selected');
    document.getElementById("favicon_creator_editor_header_title").innerText = nav.getAttribute('data-editorNav');

    var editorSections = document.querySelectorAll('.favicon_creator_editor_section');
    for(var p = 0; p < editorSections.length; p++){
        if (editorSections[p].getAttribute('data-editorSection') === nav.getAttribute('data-editorNav')){
            editorSections[p].style.display = "block";
        } else {
            editorSections[p].style.display = "none";
        }
    }

    document.getElementById('favicon_creator_nav_container').classList.add('favicon_creator_nav_active');
    document.getElementById('favicon_creator_editor_container').classList.add('favicon_creator_editor_active');
    document.getElementById('favicon_creator_visual_outer_container').classList.add('favicon_creator_visual_outer_active');

    if (type == 'Edit'){
        buildColorStyleNav();
    }
}

function editorBack(){

    var editorNavs = document.querySelectorAll('.favicon_creator_nav_item');
    for(var i = 0; i < editorNavs.length; i++){
        editorNavs[i].classList.remove('favicon_creator_nav_item_selected');
    }

    document.getElementById('favicon_creator_nav_container').classList.remove('favicon_creator_nav_active');
    document.getElementById('favicon_creator_editor_container').classList.remove('favicon_creator_editor_active');
    document.getElementById('favicon_creator_visual_outer_container').classList.remove('favicon_creator_visual_outer_active');
}

function guid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function openModal(modal){

    var modals = document.querySelectorAll(".modal");
    for (var i = 0; i < modals.length; i++){
        if (modals[i].getAttribute("data-modal") === modal){
            modals[i].classList.add("modal_active");
        }
    }

    document.getElementById("modal_overlay").classList.add("modal_overlay_active");

}

function closeModal(modal){
    var modals = document.querySelectorAll(".modal");
    for (var i = 0; i < modals.length; i++){
        if (modals[i].getAttribute("data-modal") === modal){
            modals[i].classList.remove("modal_active");
        }
    }
    document.getElementById("modal_overlay").classList.remove("modal_overlay_active");
}

function closeModalOverlay(){
    var modals = document.querySelectorAll(".modal");
    for (var i = 0; i < modals.length; i++){
        modals[i].classList.remove("modal_active");
    }
    document.getElementById("modal_overlay").classList.remove("modal_overlay_active");
}



function modalAddElementButton(el, type){

    var addElementContainer = document.querySelectorAll(".modal_add_element_container");
    for (var i = 0; i < addElementContainer.length; i++){
        if (addElementContainer[i].getAttribute("data-modalAddElement") === type){
            addElementContainer[i].style.display = "block";
        } else {
            addElementContainer[i].style.display = "none";
        }
    }

    var addElementButton = document.querySelectorAll('.modal_add_element_button');
    for (var p = 0; p < addElementButton.length; p++){
        addElementButton[p].classList.remove('modal_add_element_button_active');
    }

    el.classList.add('modal_add_element_button_active');

    switch(type){
        case "text":
            document.getElementById("modal_add_element_text").focus();
            break;
    }

}

function modalAddElementsChange(e, type){

    var finalButton = document.getElementById("modal_add_element_final_button");
    finalButton.classList.add("button_disabled");

    switch(type){
        case "text":
            if (document.getElementById("modal_add_element_text").value.trim().length > 0){
                finalButton.classList.remove("button_disabled");
                var keyboardCode = (e.keyCode ? e.keyCode : e.which);
                if(keyboardCode == 13) {
                    modalAddElementFinal();
                }
            }
            break;
    }

}

var layers = new Array();

function modalAddElementFinal(){

    var whichElement = document.querySelector(".modal_add_element_button_active").getAttribute("data-modalAddElementButton");

    console.log(whichElement);

    switch(whichElement){
        case "text":
            var elementValue = document.getElementById("modal_add_element_text").value.trim();
            var styles = {
                "color": "#FFFFFF",
                "fontSize": 100,
                "opacity": 100,
                "bold": false
            }
            document.getElementById("modal_add_element_text").value = "";
            break;
    }

    var newItem = {
        "id": guid(),
        "type": whichElement,
        "value": elementValue,
        "name": null,
        "sequence": layers.length,
        "styles": styles
    }

    layers.push(newItem);


    // Reset Add Modal
    document.getElementById("modal_add_element_final_button").classList.add("button_disabled");
    document.querySelector(".modal_add_element_button_active").classList.remove("modal_add_element_button_active");
    var addContainers = document.querySelectorAll(".modal_add_element_container");
    for(var i = 0; i < addContainers.length; i++){
        addContainers[i].style.display = "none";
    }
    document.querySelector(".modal[data-modal='add-elements']").classList.remove("modal_active");
    document.getElementById("modal_overlay").classList.remove("modal_overlay_active");


    build();

}



