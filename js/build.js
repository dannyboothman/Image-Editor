


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
        case "image":
            buildImage(lastLayer);
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
    var theItem = document.querySelector(".favicon_creator_elements_item[data-id='"+lastLayer.id+"']");
    document.getElementById("favicon_creator_elements_inner").prepend(theItem);

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
        bold = "bold";
    }
    var italic = "normal";
    if (item.styles.italic === true){
        italic = "italic";
    }
    var decoration = "none";
    if (item.styles.decoration === 1){
        decoration = "underline";
    } else if (item.styles.decoration == 2){
        decoration = "line-through";
    }
    var letterSpacing = item.styles.letterSpacing + "px";

    var html = '<div class="fcv_item fcv_item_selected" data-id="' + id + '" style="z-index: ' + zIndex + '; color: ' + color + '; font-size: ' + fontSize + '; opacity: ' + opacity + ' font-weight: ' + bold + '; font-style: ' + italic + '; text-decoration: ' + decoration + '; letter-spacing: ' + letterSpacing + '">' + text + '</div>';

    document.getElementById("favicon_creator_visual").innerHTML += html;

}

function buildImage(item){

    console.log(item)

    var id = item.id;
    var zIndex = item.sequence + 1;
    var value = item.value;

    var image = '<img src="' + value + '" />';
    var html = '<div class="fcv_item fcv_item_selected" data-id="' + id + '" style="z-index: ' + zIndex + '; ">' + image + '</div>';

    document.getElementById("favicon_creator_visual").innerHTML += html;
    sortLayerSequence();

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
        theLayer[0].sequence = ((layers.length - i) - 1);

        document.querySelector(".fcv_item[data-id='"+id+"']").style.zIndex = (layers.length - i);

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

            var id = this.getAttribute("data-id");
            selectElementItem(id);

            var contextMenu = document.querySelector('.context_menu[data-contextMenu="element-item"]');
            contextMenu.classList.add('context_menu_active');
            contextMenu.setAttribute("data-id", id);
            contextMenu.style.left = (ev.pageX + 5) + "px";
            contextMenu.style.top = ev.pageY + "px";

            if (layers.length > 1){
                document.getElementById("context_menu_item_arrange").classList.remove("context_menu_item_disabled");

                var arrangeItems = document.querySelectorAll("#context_menu_item_arrange .context_menu_item");
                for (var i = 0; i < arrangeItems.length; i++){
                    arrangeItems[i].classList.remove("context_menu_item_disabled");
                }

                var theLayer = layers.filter(function(layer) {
                    return layer.id === id;
                });

                var sequence = theLayer[0].sequence;
                console.log("sequence: " + sequence);
                console.log("layers.length - 1: " + (layers.length - 1))
                
                if (sequence == 0){
                    document.getElementById("context_menu_item_arrange3").classList.add("context_menu_item_disabled");
                    document.getElementById("context_menu_item_arrange4").classList.add("context_menu_item_disabled");
                }

                if (sequence == (layers.length - 1)){
                    document.getElementById("context_menu_item_arrange1").classList.add("context_menu_item_disabled");
                    document.getElementById("context_menu_item_arrange2").classList.add("context_menu_item_disabled");
                }

            } else {
                document.getElementById("context_menu_item_arrange").classList.add("context_menu_item_disabled");
            }

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
    

function contextBringToFront(){

    var id = document.querySelector(".context_menu.context_menu_active").getAttribute("data-id");
    var item = document.querySelector(".favicon_creator_elements_item[data-id='"+id+"']");

    var clone = item.cloneNode(true);
    item.remove();

    document.querySelector("#favicon_creator_elements_inner").prepend(clone);

    sortLayerSequence();
    addContextMenus();

}

function contextSendToBack(){

    var id = document.querySelector(".context_menu.context_menu_active").getAttribute("data-id");
    var item = document.querySelector(".favicon_creator_elements_item[data-id='"+id+"']");

    var clone = item.cloneNode(true);
    item.remove();

    document.querySelector("#favicon_creator_elements_inner").append(clone);

    sortLayerSequence();
    addContextMenus();

}