

function openSaveModal(){

    openModal("file-main-save");


    //document.querySelector("html, body").scrollTop = 0;
    setTimeout(function(){
        html2canvas(document.querySelector("#favicon_creator_visual")).then(canvas => {
            console.log("here")
            document.querySelector("#main_save_modal_example").appendChild(canvas)
            document.querySelector("#main_save_modal_loaded").style.display = "flex";
            document.querySelector("#main_save_modal_loading").style.display = "none";
        });
    }, 500);

}

function selectDownloadFileType(el){

    var items = document.querySelectorAll(".download_file_type_item");
    for (var i = 0; i < items.length; i++){
        items[i].classList.remove("download_file_type_item_selected");
    }

    el.classList.add("download_file_type_item_selected");

}



function download(){

    var canvas = document.querySelector("#main_save_modal_example canvas");
    canvas.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
    });
}