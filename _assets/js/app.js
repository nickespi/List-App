function makeCounter() {
    var i = 0;
    var retrievedCount = localStorage.getItem('count');
    i = retrievedCount;
    return function() {
        i++;
        console.log(i);
        localStorage.setItem('count', JSON.stringify(i));
        return i;
    };
}
var id = makeCounter();

var toDoLists =  [
  {
   title: "Books to Read",
   id: "books_to_read",
   state: "open",
   todos: [
      {
        todoId: id(),
        todoStatus: 'completed',
        todo: "A Game of Thrones"
      },
      {
        todoId: id(),
        todoStatus: 'active',
        todo: "A Clash of Kings"
      },
      {
        todoId: id(),
        todoStatus: 'active',
        todo: "A Storm of Swords"
      },
      {
        todoId: id(),
        todoStatus: 'completed',
        todo: "A Feast for Crows"
      }
    ]
  }
];

var archive = [];

var listTitles = [];

var unique = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found,
        x, y;
 
    for ( x = 0; x < origLen; x++ ) {
        found = undefined;
        for ( y = 0; y < newArr.length; y++ ) {
            if ( origArr[x].name === newArr[y].name ) { 
              found = true;
              break;
            }
        }
        if ( !found) newArr.push( origArr[x] );    
    }
   return newArr;
}

function titleList() {
  listTitles.length = 0;
  for (var i = 0; i < archive.length; i++) {
    var listTitle = archive[i].list;
    var listId = archive[i].listId;

    console.log(listTitle);
    listTitles.push({"name": listTitle, "class": listId});
  }
}

// titleList();

// listTitles = unique(listTitles);

function newList(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  console.log(toDoLists);
  var listName = prompt("What is your new list's name?");
  if (listName !== null && listName !== "") {
    var listId = listName.replace(/ /g, "_").toLowerCase();
     toDoLists.push({"title": listName, "id": listId, "state": "open", "todos":[]});
     if (toDoLists.length < 2) {
        window.location.reload(true);
      }
  }
  
    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

    initElement();
}

function removeList (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichList = this.id;
  console.log(whichList);
  var areYouSure = confirm("Are you sure?");

  if (areYouSure) {
    for (var i = 0; i < toDoLists.length; i++) {
      if ("delete_list" + " " + toDoLists[i].id === whichList) {
       toDoLists.splice(i, 1);
      }
    }
  }
    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

    initElement();
}

function newItem (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichList = this.id;
  var listItem = prompt("What is your to-do?");
  for (var i = 0; i < toDoLists.length; i++) {
    if ("add_item" + " " + toDoLists[i].id === whichList) {
      if (listItem !== null && listItem !== ""){
        var newToDo = {};
        newToDo.todo = listItem;
        newToDo.todoId = id();
        newToDo.todoStatus = 'active';
        toDoLists[i].todos.push(newToDo);
        console.log("Created todo " + newToDo.todo + " with ID " + newToDo.todoId);
      }
    }
  }

    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));
    
    initElement();
}

function replaceItem (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichItemId = this.id; //get id found in edit_item link
  var whichList = this.parentNode.parentNode.parentNode.id; //get id of List containing Todo to be edited

  var replacedItem = prompt("Change this to-do.");

  for (var i = 0; i < toDoLists.length; i++) {
    if ("todo_list" + " " + toDoLists[i].id === whichList) {
      var list = toDoLists[i];

      for (var e = 0; e < list.todos.length; e++) {
        var theOne = list.todos[e];
        console.log(theOne.todoId);
        if ("edit_item" + " " + theOne.todoId === whichItemId) {
          if (replacedItem !== null && replacedItem !== ""){
            theOne.todo = replacedItem;
            console.log("Updated todo ID " + theOne.todoId + " to " + theOne.todo);
          }
        }
      }
    }
  }

  localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

  initElement();
}

function removeItem (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichItemId = this.id; //get id found in delete_item link
  var whichList = this.parentNode.parentNode.parentNode.id; //get id of List containing Todo to be deleted

    for (var i = 0; i < toDoLists.length; i++) {
      if ("todo_list" + " " + toDoLists[i].id === whichList) {
        var list = toDoLists[i];

        for (var e = 0; e < list.todos.length; e++) {
          var theOne = list.todos[e];
          if ("delete_item" + " " + theOne.todoId === whichItemId) {
            list.todos.splice(e, 1);
            console.log("Deleted todo " + theOne.todo);
          }
        }
      }
    }


  localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

  initElement();
}

function completeItem (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichItemId = this.id; //get id found in edit_item link
  var whichList = this.parentNode.parentNode.id; //get id of List containing Todo to be edited
  for (var i = 0; i < toDoLists.length; i++) {
    if ("todo_list" + " " + toDoLists[i].id === whichList) {
      var list = toDoLists[i];

      for (var e = 0; e < list.todos.length; e++) {
        var theOne = list.todos[e];
        if ("complete_item" + " " + theOne.todoId === whichItemId) {
          if (theOne.todoStatus === 'active'){
            theOne.todoStatus = 'completed';
            console.log("Completed " + theOne.todo);
          } else {
            theOne.todoStatus = 'active';
            console.log("Brought " + theOne.todo + " out of retirement.");
          }
        }
      }
    }
  }


  localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

  initElement();
}

function toArchive (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichItemId = this.id; //get id found in delete_item link
  var whichList = this.parentNode.parentNode.parentNode.id; //get id of List containing Todo to be deleted
  console.log(whichItemId);
    for (var i = 0; i < toDoLists.length; i++) {
      if ("todo_list" + " " + toDoLists[i].id === whichList) {
        var list = toDoLists[i];

        for (var e = 0; e < list.todos.length; e++) {
          var theOne = list.todos[e];
          if ("archive_item" + " " + theOne.todoId === whichItemId) {
            
            var newToDo = {};
            newToDo.todo = theOne.todo;
            newToDo.todoId = theOne.todoId;
            newToDo.list = list.title;
            newToDo.listId = list.id;
            archive.push(newToDo);
            titleList();
            listTitles = unique(listTitles);
            console.log(listTitles);
            list.todos.splice(e, 1);
            console.log("Archived todo " + theOne.todo);
          }
        }
      }
    }

  localStorage.setItem('toDoLists', JSON.stringify(toDoLists));
  localStorage.setItem('archive', JSON.stringify(archive));
  localStorage.setItem('listTitles', JSON.stringify(listTitles));

  initElement();
}

function unArchive (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichItemId = this.id; //get id found in delete_item link

        for (var e = 0; e < archive.length; e++) {
          var theOne = archive[e];
          if ("promote_item" + " " + theOne.todoId === whichItemId) {
            for (var i = 0; i < toDoLists.length; i++) {
              var whichList = toDoLists[i];
              if (whichList.id === theOne.listId) {
                var newToDo = {};
                newToDo.todo = theOne.todo;
                newToDo.todoId = theOne.todoId;
                newToDo.todoStatus = "active";
                whichList.todos.push(newToDo);
                archive.splice(e, 1);
                console.log("Unarchived todo " + theOne.todo);
                titleList();
                listTitles = unique(listTitles);
              }
            }
          }
        }

  localStorage.setItem('toDoLists', JSON.stringify(toDoLists));
  localStorage.setItem('archive', JSON.stringify(archive));
  localStorage.setItem('listTitles', JSON.stringify(listTitles));

  initElement();
}

function archiveFilter (e) {
  if(e.preventDefault) {
    e.preventDefault();
  }
  var whichItemId = this.id;
  if (whichItemId === "all") {
    $(".list_wrap").show();
  } else {
    $(".list_wrap").hide();
    $("." + whichItemId).show();
  }
}

function taskToggle (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichItem = this.parentNode.nextSibling.nextSibling;
  console.log(whichItem);

  if (whichItem.style.display === 'inline') {
    $(whichItem).slideUp({
      duration: 300,
      easing: 'easeInBack'
    });
  } else {
    $(whichItem).slideDown({
      duration: 300,
      easing: 'easeOutBack'
    });
  }
}

function listToggle (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var whichItem = this.nextSibling.nextSibling;
  var whichItemId = whichItem.id;
  console.log(whichItem);

  for (var i = 0; i < toDoLists.length; i++) {
    var theOne = toDoLists[i];
    if ("todo_list " + theOne.id === whichItemId ) {
      if (theOne.state === 'open') {
          theOne.state = 'closed';
      } else {
          theOne.state = 'open';
      }
    }
  }
    
    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

    initElement();
}

function initElement () {

  var retrievedToDoLists = localStorage.getItem('toDoLists');
  var retrievedArchive = localStorage.getItem('archive');
  var retrievedListTitles = localStorage.getItem('listTitles');
  
  if (retrievedToDoLists) {
    toDoLists = JSON.parse(retrievedToDoLists);
  }

  if (retrievedArchive) {
    archive = JSON.parse(retrievedArchive);
  }
  
  if (retrievedListTitles) {
    listTitles = JSON.parse(retrievedListTitles);
  }

  $(function() {
      var template = $('#todo-template').html();
      var info = Mustache.to_html(template, {lists: toDoLists});
      $('#lists').html(info);
      $('#lists').masonry( 'reloadItems' );
    });

  $(function() {
      var template = $('#archive-template').html();
      var info = Mustache.to_html(template, {lists: archive, titles: listTitles});
      $('#archived').html(info);
      $('#archived').masonry( 'reloadItems' );
    });

  var addList = document.getElementById("addList");
  addList.onclick = newList;

  var deleteList = document.getElementsByClassName("delete_list");
  for (var i = 0; i < deleteList.length; i++) {
    deleteList[i].onclick = removeList;
  }

  var addItem = document.getElementsByClassName("add_item");
  for (var i = 0; i < addItem.length; i++) {
    addItem[i].onclick = newItem;
  }

  var editItem = document.getElementsByClassName("edit_item");
  for (var i = 0; i < editItem.length; i++) {
    editItem[i].onclick = replaceItem;
  }

  var deleteItem = document.getElementsByClassName("delete_item");
  for (var i = 0; i < deleteItem.length; i++) {
    deleteItem[i].onclick = removeItem;
  }

  var archiveItem = document.getElementsByClassName("archive_item");
  for (var i = 0; i < archiveItem.length; i++) {
    archiveItem[i].onclick = toArchive;
  }

  var promoteItem = document.getElementsByClassName("promote_item");
  for (var i = 0; i < promoteItem.length; i++) {
    promoteItem[i].onclick = unArchive;
  }

  var filter = document.getElementsByClassName("filter");
  for (var i = 0; i < filter.length; i++) {
    filter[i].onclick = archiveFilter;
  }

  var toggleStatus = document.getElementsByClassName("toggle_status");
  for (var i = 0; i < toggleStatus.length; i++) {
    toggleStatus[i].onclick = completeItem;
  }

  var toggle = document.getElementsByClassName("task_toggle");
  for (var i = 0; i < toggle.length; i++ ) {
    toggle[i].onclick = taskToggle;
  }

  var hideList = document.getElementsByClassName("list_title");
  for (var i = 0; i < hideList.length; i++) {
    hideList[i].onclick = listToggle;
  }

  $(function(){
    $('#lists').masonry({
      // options
      itemSelector: '.list_wrap',
      isResizeBound: true,
      transitionDuration: 0
    });
  });

}
