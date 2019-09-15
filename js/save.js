
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