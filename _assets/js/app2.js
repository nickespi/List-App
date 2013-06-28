console.log("Testing.");

function newList () {
  var list = document.getElementById("lists");
  var listName = prompt("What is your new list's name?");
  if (listName !== null && listName !== "") {
    var newListModule = document.createElement("div");
    newListModule.setAttribute("class","list_wrap");
    var newListName = document.createElement("h2");
    var newListNameText = document.createTextNode(listName);
    var newItemList = document.createElement("ul");
    newItemList.setAttribute("class","todo_list");
    newItemList.setAttribute("id","todo_list");
    var addItem = document.createElement("li");
    var addItemLink = document.createElement("a");
    addItemLink.setAttribute("class","add_item");
    addItemLink.setAttribute("id","add_item");
    addItemLink.setAttribute("href","#");
    var addItemLinkText = document.createTextNode("Add Item");
    addItemLink.appendChild(addItemLinkText);
    addItem.appendChild(addItemLink);
    newItemList.appendChild(addItem);
    newListName.appendChild(newListNameText);
    newListModule.appendChild(newListName);
    newListModule.appendChild(newItemList);
    list.appendChild(newListModule);
    initElement();
  }
}

function newItem () {
  console.log("test");
  var list = this.parentNode.parentNode;
  console.log(list);
  var thisParent = this.parentNode;
  console.log(list);
  var listItem = prompt("What is your to-do?");
  if (listItem !== null && listItem !== ""){
    var newListItem = document.createElement("li");
    var newListItemText = document.createTextNode(listItem);
    newListItem.appendChild(newListItemText);
    var last = document.getElementById("last");
    list.insertBefore(newListItem,thisParent);
  }
}

function initElement () {
  var addList = document.getElementById("addList");
  addList.onclick = newList;
  var addItem = document.getElementsByClassName("add_item");

  for (var i = 0; i < addItem.length; i++) {
    addItem[i].onclick = newItem;
  }
}


