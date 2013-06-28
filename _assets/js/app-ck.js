function makeCounter(){var e=0,t=localStorage.getItem("count");e=t;console.log(e);return function(){e++;console.log(e);localStorage.setItem("count",JSON.stringify(e));return e}}function newList(){console.log(toDoLists);var e=document.getElementById("lists"),t=prompt("What is your new list's name?");if(t!==null&&t!==""){var n=t.replace(/ /g,"_").toLowerCase();toDoLists.push({title:t,id:n,todos:[]});localStorage.setItem("toDoLists",JSON.stringify(toDoLists));initElement()}}function removeList(){var e=this.id;console.log(e);var t=confirm("Are you sure?");if(t)for(var n=0;n<toDoLists.length;n++)"delete_list "+toDoLists[n].id===e&&toDoLists.splice(n,1);localStorage.setItem("toDoLists",JSON.stringify(toDoLists));initElement()}function newItem(){var e=this.id,t=prompt("What is your to-do?");for(var n=0;n<toDoLists.length;n++)if("add_item "+toDoLists[n].id===e&&t!==null&&t!==""){var r={};r.todo=t;r.todoId=id();r.todoStatus="active";toDoLists[n].todos.push(r)}localStorage.setItem("toDoLists",JSON.stringify(toDoLists));initElement()}function replaceItem(){var e=this.id,t=this.parentNode.parentNode.parentNode.id,n=prompt("Change this to-do.");for(var r=0;r<toDoLists.length;r++)if("todo_list "+toDoLists[r].id===t){var i=toDoLists[r];for(var s=0;s<i.todos.length;s++){var o=i.todos[s];console.log(o.todoId);if("edit_item "+o.todoId===e&&n!==null&&n!==""){o.todo=n;console.log("Updated todo ID "+o.todoId+" to "+o.todo)}}}localStorage.setItem("toDoLists",JSON.stringify(toDoLists));initElement()}function deleteItem(){var e=this.id,t=this.parentNode.parentNode.parentNode.id;for(var n=0;n<toDoLists.length;n++)if("todo_list "+toDoLists[n].id===t){var r=toDoLists[n];for(var i=0;i<r.todos.length;i++){var s=r.todos[i];if("delete_item "+s.todoId===e){r.todos.splice(i,1);console.log("Deleted todo "+s.todo)}}}localStorage.setItem("toDoLists",JSON.stringify(toDoLists));initElement()}function crossItem(){var e=this.id,t=this.parentNode.parentNode.parentNode.id;for(var n=0;n<toDoLists.length;n++)if("todo_list "+toDoLists[n].id===t){var r=toDoLists[n];for(var i=0;i<r.todos.length;i++){var s=r.todos[i];console.log(s.todoId);if("complete_item "+s.todoId===e)if(s.todoStatus==="active"){s.todoStatus="completed";console.log("Completed "+s.todo)}else{s.todoStatus="active";console.log("Brought "+s.todo+" out of retirement.")}}}localStorage.setItem("toDoLists",JSON.stringify(toDoLists));initElement()}function initElement(){var e=localStorage.getItem("toDoLists");e&&(toDoLists=JSON.parse(e));$(function(){var e=$("#todo-template").html(),t=Mustache.to_html(e,{lists:toDoLists});$("#lists").html(t);$("#lists").masonry("reloadItems")});var t=document.getElementById("addList");t.onclick=newList;var n=document.getElementsByClassName("delete_list");for(var r=0;r<n.length;r++)n[r].onclick=removeList;var i=document.getElementsByClassName("add_item");for(var r=0;r<i.length;r++)i[r].onclick=newItem;var s=document.getElementsByClassName("edit_item");for(var o=0;o<s.length;o++)s[o].onclick=replaceItem;var u=document.getElementsByClassName("delete_item");for(var a=0;a<u.length;a++)u[a].onclick=deleteItem;var f=document.getElementsByClassName("complete_item");for(var a=0;a<u.length;a++)f[a].onclick=crossItem;$(function(){$("#lists").masonry({itemSelector:".list_wrap",isResizable:!0})})}var id=makeCounter(),toDoLists=[{title:"Books to Read",id:"books_to_read",todos:[{todoId:id(),todoStatus:"completed",todo:"A Game of Thrones"},{todoId:id(),todoStatus:"active",todo:"A Clash of Kings"},{todoId:id(),todoStatus:"active",todo:"A Storm of Swords"},{todoId:id(),todoStatus:"completed",todo:"A Feast for Crows"}]}];