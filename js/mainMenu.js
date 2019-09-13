// File New
function fileNew(){
    
    // if they have a layer then we should
    // ask if they want to save it first
    if(layers.length === 0){
        fileNewFinal();
    } else {
        openModal('file-new-save');
    }

}

function fileOpen(){

    if (saved.length === 0){
        document.getElementById("modal_file_open_zero").style.display = "block";
        document.getElementById("modal_file_open_list").style.display = "none";
    } else {
        document.getElementById("modal_file_open_list").style.display = "block";
        document.getElementById("modal_file_open_zero").style.display = "none";
    }

    openModal('file-open');
}

function fileNewFinal(){
    
    closeModal('file-new-save');

    // Layers
    layers = [];

    // Elements
    var elements = document.querySelectorAll(".favicon_creator_elements_item");
    for(var i = 0; i < elements.length; i++){
        elements[i].remove();
    }

    // Canvas
    document.querySelector(".favicon_creator_editor_canvas_fill_type_item[data-type='color']").click();
    document.querySelector(".favicon_creator_editor_canvas_fill_type_item[data-type='color'] .favicon_creator_editor_canvas_fill_type_item_inner").style.backgroundColor = "#339af0";
    document.querySelector(".favicon_creator_editor_canvas_fill_type_item[data-type='color'] .favicon_creator_editor_canvas_fill_type_item_inner .pcr-button").style.color = "#339af0";
    
    // Visual
    document.getElementById("favicon_creator_visual").style.backgroundColor = "#339af0";
    document.getElementById("favicon_creator_visual").innerHTML = "";

}



// File Save
var saved = [];
var saveThenNew = false;

function fileSaveOpen(saveThenNewBool){

    saveThenNew = saveThenNewBool;

    if (saved.length > 0){
        document.getElementById("file_save_overwrite_container").classList.add("file_save_overwrite_container_active");
        var overwriteContainer = document.getElementById("file_save_overwrite_list");
        var overwriteList = "";
        for(var i = 0; i < saved.length; i++){
            var overwriteListItems = '<div class="file_save_overwrite_list_item" onclick="fileSaveSelectExistingFile(this);" data-id="' + saved[i].fileId + '">';
                overwriteListItems += '<div class="file_save_overwrite_list_item_name">' + saved[i].fileName + '</div>';
                overwriteListItems += '<div class="file_save_overwrite_list_item_date">' + saved[i].fileDate + '</div>';
                overwriteListItems += '</div>';
            
            overwriteList += overwriteListItems;
        }
        overwriteContainer.innerHTML = overwriteList;
    } else {
        document.getElementById("file_save_overwrite_container").classList.remove("file_save_overwrite_container_active");
    }

    document.getElementById("file_save_input").value = "";
    document.getElementById("modal_file_save_final_button").classList.add("button_disabled");
    openModal('file-save');

}

function fileSaveInput(e){
    var fileSaveInputVal = document.getElementById("file_save_input").value.trim();
    if (fileSaveInputVal.length > 0){
        document.getElementById("modal_file_save_final_button").classList.remove("button_disabled");
        var keyboardCode = (e.keyCode ? e.keyCode : e.which);
        if(keyboardCode == 13) {
            fileSave();
            return;
        }
    } else {
        document.getElementById("modal_file_save_final_button").classList.add("button_disabled");
    }
}

var fileSaveSelectExistingFileSelected = "";
function fileSaveSelectExistingFile(el){

    fileSaveSelectExistingFileSelected = "";

    var id = el.getAttribute("data-id");

    var selected = "";
    if (document.querySelector(".file_save_overwrite_list_item_active")){
        selected = document.querySelector(".file_save_overwrite_list_item_active").getAttribute("data-id");
        document.querySelector(".file_save_overwrite_list_item_active").classList.remove("file_save_overwrite_list_item_active");
    }
    if (selected != id){
        el.classList.toggle("file_save_overwrite_list_item_active");
    }

    if (document.querySelector(".file_save_overwrite_list_item_active")){
        fileSaveSelectExistingFileSelected = id;
    }

}

function fileSave(){

    var fileSaveInputVal = document.getElementById("file_save_input").value.trim();

    var design = {
        "layers": layers,
        "canvas": canvas
    }

    var date = new Date();

    var file = {
        "fileId": guid(),
        "fileName": fileSaveInputVal,
        "fileDate": date.toLocaleString(),
        "file": design
    }

    if (fileSaveSelectExistingFileSelected.length === 0){
        saved.push(file);
    } else {
        for(var i = 0; i < saved.length; i++){
            if (saved[i].fileId == fileSaveSelectExistingFileSelected) {
                saved.splice(i, 1);
            }
        }
        saved.push(file);
        console.log("We should overwrite an existing file");
    }
    

    closeModal('file-save');

    if (saveThenNew){
        fileNewFinal();
        saveThenNew = false;
    }
}



function save(){
    console.log("saveee")
    document.querySelector("html, body").scrollTop = 0;
    setTimeout(function(){
        html2canvas(document.querySelector("#favicon_creator_visual")).then(canvas => {
            document.body.appendChild(canvas)
        });
    }, 1500);
}