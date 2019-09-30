
function toggleEditPanel(el){

    var menuActive = document.getElementById("cs-editor_edit").classList.contains("cs-editor_edit_active");
    var elActive = el.classList.contains("cs-editor_menu_item_active");

    if (elActive){
        document.getElementById("cs-editor_edit").classList.remove("cs-editor_edit_active");
        el.classList.remove("cs-editor_menu_item_active");
    }

    if (!menuActive){
        document.getElementById("cs-editor_edit").classList.add("cs-editor_edit_active");
        el.classList.add("cs-editor_menu_item_active");
        buildEditMenu(el);
    }

    if (menuActive && !elActive){
        document.querySelector(".cs-editor_menu_item_active").classList.remove("cs-editor_menu_item_active");
        el.classList.add("cs-editor_menu_item_active");
        buildEditMenu(el);
    }

}

function closeEditPanel(){
    document.getElementById("cs-editor_edit").classList.remove("cs-editor_edit_active");
    document.querySelector(".cs-editor_menu_item_active").classList.remove("cs-editor_menu_item_active");
}

function buildEditMenu(item){
    
    var type = item.getAttribute("data-type");

    document.getElementById("cs-editor_edit_header_title").innerText = type;

    if (document.querySelector(".cs-editor_edit_item_active")){
        document.querySelector(".cs-editor_edit_item_active").classList.remove("cs-editor_edit_item_active");
    }

    document.querySelector(".cs-editor_edit_item[data-type='" + type + "']").classList.add("cs-editor_edit_item_active");

}