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

// function determineStatus() {
//     if ('complete' === 'complete') {
//       return function (text, render) {
//         return '<p class="completed">' + render(text) + '</p>';
//       };
//     } else {
//       return function (text, render) {
//         return '<p>' + render(text) + '</p>';
//       };
//     }
// }

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


function newList() {
  console.log(toDoLists);
  var list = document.getElementById("lists");
  var listName = prompt("What is your new list's name?");
  if (listName !== null && listName !== "") {
    var listId = listName.replace(/ /g, "_").toLowerCase();
     toDoLists.push({"title": listName, "id": listId, "todos":[]});

    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));

    initElement();
  }
}

function removeList () {
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


function newItem () {
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

function replaceItem () {
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

function deleteItem () {
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

function crossItem () {
  var whichItemId = this.id; //get id found in edit_item link
  var whichList = this.parentNode.parentNode.parentNode.id; //get id of List containing Todo to be edited

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
  for (var e = 0; e < editItem.length; e++) {
    editItem[e].onclick = replaceItem;
  }

  var removeItem = document.getElementsByClassName("delete_item");
  for (var a = 0; a < removeItem.length; a++) {
    removeItem[a].onclick = deleteItem;
  }

  var completeItem = document.getElementsByClassName("complete_item");
  for (var a = 0; a < removeItem.length; a++) {
    completeItem[a].onclick = crossItem;
  }

  $(function(){
    $('#lists').masonry({
      // options
      itemSelector: '.list_wrap',
      isResizable: true
    });
  });


}