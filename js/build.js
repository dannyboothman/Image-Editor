


function build(){

    var items = document.querySelectorAll('.fcv_item');
    for (var i = 0; i < items.length; i++){
        items[i].classList.remove("fcv_item_selected");
    }

    var lastLayer = layers[layers.length - 1];

    switch(lastLayer.type){
        case "text":
            buildText(lastLayer);
            break;
    }

    buildLayers();

}

function buildLayers(){

    //document.getElementById("favicon_creator_elements_inner").innerHTML = "";

    //var elementsList = '';

    var items = document.querySelectorAll('.favicon_creator_elements_item');
    for (var i = 0; i < items.length; i++){
        items[i].classList.remove("favicon_creator_elements_item_selected");
    }

    var items = document.querySelectorAll('.favicon_creator_elements_item_move');
    for (var i = 0; i < items.length; i++){
        items[i].classList.remove("favicon_creator_elements_item_move_disabled");
    }

    var hideMove = 'favicon_creator_elements_item_move_disabled';
    if (layers.length > 1){
        hideMove = '';
    }

    var lastLayer = layers[layers.length - 1];

    var html = '<div class="favicon_creator_elements_item favicon_creator_elements_item_selected" data-id="'+lastLayer.id+'" data-contentMenuItem="true">';
        html += '<div class="favicon_creator_elements_item_move '+ hideMove +'"><i class="fas fa-arrows-alt-v"></i></div>';
        html += '<div class="favicon_creator_elements_item_eye" onclick="selectElementItem(\''+lastLayer.id+'\'); toggleElementItemVisibility(this, \''+lastLayer.id+'\')"><i class="fas fa-eye"></i></div>';
        html += '<div class="favicon_creator_elements_item_name" onclick="selectElementItem(\''+lastLayer.id+'\');" ondblclick="changeElementItemNameDoubleClick(\''+lastLayer.id+'\');" onblur="changeElementItemNameBlur(\''+lastLayer.id+'\');" data-id="'+lastLayer.id+'">' + lastLayer.value + '</div>';
        html += '<div class="favicon_creator_elements_item_edit" onclick="selectElementItem(\''+lastLayer.id+'\'); editorNav(\'Edit\');"><i class="fas fa-pencil-alt"></i></div>';
        html += '<div class="favicon_creator_elements_item_delete" onclick="deleteElementItem(\''+lastLayer.id+'\')"><i class="fas fa-trash-alt"></i></div>';
        html += '</div>';

    document.getElementById("favicon_creator_elements_inner").innerHTML += html;

    addContextMenus();

}

function buildText(item){

    console.log(item)

    var id = item.id;
    var zIndex = item.sequence + 1;
    var text = item.value;
    var color = item.styles.color;
    var fontSize = item.styles.fontSize + "px";
    var opacity = item.styles.opacity;
    opacity = opacity/100;
    var bold = "normal";
    if (item.styles.bold == true){
        var bold = "bold";
    }

    var html = '<div class="fcv_item fcv_item_selected" data-id="' + id + '" style="z-index: ' + zIndex + '; color: ' + color + '; font-size: ' + fontSize + '; opacity: ' + opacity + ' font-weight: ' + bold + '">' + text + '</div>';

    document.getElementById("favicon_creator_visual").innerHTML += html;

}


function compare(a, b) {
    if ( a.sequence < b.sequence ){
      return -1;
    }
    if ( a.sequence > b.sequence ){
      return 1;
    }
    return 0;
  }

function sortLayerSequence(){

    var items = document.querySelectorAll(".favicon_creator_elements_item");
    for(var i = 0; i < items.length; i++){
        var id = items[i].getAttribute("data-id");
        
        var theLayer = layers.filter(function(layer) {
            return layer.id === id;
        });
        theLayer[0].sequence = i;

        document.querySelector(".fcv_item[data-id='"+id+"']").style.zIndex = (i + 1);

    }

    layers = layers.sort(compare);
}

var elementToDelete;
function deleteElementItem(id){
    elementToDelete = id;
    openModal('delete-element');
}

function deleteElementItemFinal(){
    layers = layers.filter(function(el) { return el.id != elementToDelete; }); 
    
    document.querySelector('.favicon_creator_elements_item[data-id="'+elementToDelete+'"]').remove();
    document.querySelector('.fcv_item[data-id="'+elementToDelete+'"]').remove();

    closeModal('delete-element');
    sortLayerSequence();
}

function toggleElementItemVisibility(el, id){
    var eyeIcon = el.querySelector("i");
    
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");

    document.querySelector('.fcv_item[data-id="'+id+'"]').classList.toggle("fcv_item_hidden");

}


function selectElementItem(id){

    var items = document.querySelectorAll('.favicon_creator_elements_item');
    for (var i = 0; i < items.length; i++){
        items[i].classList.remove("favicon_creator_elements_item_selected");
    }

    document.querySelector('.favicon_creator_elements_item[data-id="'+id+'"]').classList.add('favicon_creator_elements_item_selected');

    var items = document.querySelectorAll('.fcv_item');
    for (var i = 0; i < items.length; i++){
        items[i].classList.remove("fcv_item_selected");
    }

    document.querySelector('.fcv_item[data-id="'+id+'"]').classList.add('fcv_item_selected');
}

function changeElementItemNameDoubleClick(id){
    document.querySelector(".favicon_creator_elements_item_name[data-id='"+id+"']").setAttribute("contenteditable", true);
    document.querySelector(".favicon_creator_elements_item_name[data-id='"+id+"']").focus();
}

function changeElementItemNameBlur(id){
    document.querySelector(".favicon_creator_elements_item_name[data-id='"+id+"']").setAttribute("contenteditable", false);
    updateElementItemName(id);
}

function updateElementItemName(id){

    var element = layers.filter(function(layer) {
        return layer.id === id;
    });

    element = element[0];
    element.name = document.querySelector(".favicon_creator_elements_item_name[data-id='"+id+"']").innerText;

}

function addContextMenus(){
    var contextMenuItems = document.querySelectorAll('[data-contentMenuItem="true"]');

    for(var i = 0; i < contextMenuItems.length; i++){

        contextMenuItems[i].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();

            var contextMenu = document.querySelector('.context_menu[data-contextMenu="element-item"]');
            contextMenu.classList.add('context_menu_active');
            contextMenu.setAttribute("data-id", this.getAttribute("data-id"));
            contextMenu.style.left = (ev.pageX + 5) + "px";
            contextMenu.style.top = ev.pageY + "px";

            return false;
        }, false);
    }
}

document.addEventListener('click', function(ev){
    var contextMenu = document.querySelector('.context_menu[data-contextMenu="element-item"]');
    contextMenu.classList.remove('context_menu_active');
});

function contextDeleteElementItem(){
    var id = document.querySelector(".context_menu.context_menu_active").getAttribute("data-id");
    deleteElementItem(id);
}

function contextCopyElementItem(){
    var id = document.querySelector(".context_menu.context_menu_active").getAttribute("data-id");

    var theLayerToCopy = layers.filter(function(layer) {
        return layer.id === id;
    });

    var theCopiedLayer = Object.assign({}, theLayerToCopy[0]);

    theCopiedLayer.sequence = layers.length;
    theCopiedLayer.id = guid();

    layers.push(theCopiedLayer);
    build();
}

function contextEditElementItem(){
    editorNav('Edit');
}
    
