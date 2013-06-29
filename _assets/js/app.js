function makeCounter() {
    var i = 0;
    var retrievedCount = localStorage.getItem('count');
    i = retrievedCount;
    console.log(i);
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


function newList(e) {
  e.preventDefault();
  console.log(toDoLists);
  var listName = prompt("What is your new list's name?");
  if (listName !== null && listName !== "") {
    var listId = listName.replace(/ /g, "_").toLowerCase();
     toDoLists.push({"title": listName, "id": listId, "todos":[]});

    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

    initElement();
  }
}

function removeList (e) {
  e.preventDefault();
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
  e.preventDefault();
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
      }
    }
  }

    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));
    
    initElement();
}

function replaceItem (e) {
  e.preventDefault();
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

function deleteItem (e) {
  e.preventDefault();
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

function crossItem (e) {
  e.preventDefault();
  var whichItemId = this.id; //get id found in edit_item link
  var whichList = this.parentNode.parentNode.id; //get id of List containing Todo to be edited
  console.log(whichList);
  for (var i = 0; i < toDoLists.length; i++) {
    if ("todo_list" + " " + toDoLists[i].id === whichList) {
      var list = toDoLists[i];

      for (var e = 0; e < list.todos.length; e++) {
        var theOne = list.todos[e];
        console.log(theOne.todoId);
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

function taskToggle (e) {
  e.preventDefault();
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

function initElement () {

  var retrievedObject = localStorage.getItem('toDoLists');
  
  if (retrievedObject) {
    toDoLists = JSON.parse(retrievedObject);
  }
  
  $(function() {
      var template = $('#todo-template').html();
      var info = Mustache.to_html(template, {lists: toDoLists});
      $('#lists').html(info);
      $('#lists').masonry( 'reloadItems' );
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

  var removeItem = document.getElementsByClassName("delete_item");
  for (var i = 0; i < removeItem.length; i++) {
    removeItem[i].onclick = deleteItem;
  }

  var completeItem = document.getElementsByClassName("toggle_status");
  for (var i = 0; i < completeItem.length; i++) {
    completeItem[i].onclick = crossItem;
  }

  var toggle = document.getElementsByClassName("task_toggle");
  for (var i = 0; i < toggle.length; i++ ) {
    toggle[i].onclick = taskToggle;
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
