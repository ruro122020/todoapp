/************** STORAGE METHODS***************/
var storage = {
  add: function() {
    var itemListArray = [];
    //add items to the itemListArray 
    $(".todo-list li span").each(function() {
      var item = $(this).text();
      itemListArray.push(item);
    });
    //add items to the localStorage
    localStorage.setItem("item-list", JSON.stringify(itemListArray));
  },

  change: function(index, item) {
    var itemListArray = JSON.parse(localStorage.getItem("item-list"));
    itemListArray[index]=item;
    localStorage.setItem("item-list", JSON.stringify(itemListArray));
  },

  delete: function(index) {
    var itemListArray = JSON.parse(localStorage.getItem("item-list"));
    itemListArray.splice(index,1);
    localStorage.setItem('item-list', JSON.stringify(itemListArray))
  }
};
/***************HANDLER METHODS***************/
var handlers = {
  add: function() {
    //value from the add input element
    var inputText = $("#add-input-text").val();

    if (inputText === "") {
      alert("Please insert item to add");
    } else {
      //li element created with input value
      var li =
        '<li><input type="checkbox">' + "<span>" + inputText + "</span>" + "</li>";
      $(".todo-list").append(function() {
        $(this).append(li);
        //li id
        $(".todo-list li").each(function(id) {
          $(this).attr("id", "todo" + id);
        });
        //span id
        $(".todo-list li span").each(function(id) {
          $(this).attr("id", "item" + id);
        });
        //input id
        $(".todo-list li input").each(function(id) {
          $(this).attr("id", "checkbox" + id);
        });
      })
      //input value added to localStorage
      storage.add();
      //input element value reset
      $("#add-input-text").val("");
    }
  },
  change: function() {
    var changedText = $("#change-input-text").val();
    if (changedText === "") {
      alert("Please insert item to change");
    } else {
      //change the input value of any checked li
      $(".todo-list li").each(function(id) {
        if ($("#checkbox" + id).is(":checked")) {
          $("#item" + id).text(changedText);
          //change the item in localStorage
          storage.change(id, changedText);
        }
      });
      $("#change-input-text").val(" ");
    }
  },
  delete: function() {
    $(".todo-list li input").each(function(index) {
      if(this.checked){
        //remove item from browser view
        this.parentNode.remove();
        //remove item from storage
        storage.delete(index);
      }
    });
 
  },
  toggleAll: function(){
    var itemListNumber = 0;
    var items = $(".todo-list li input").get();
      $(".todo-list li input").each(function(id){
        if($("#checkbox" + id).is(":checked")) {
          itemListNumber++
        }else{
          $("#checkbox" + id).attr("checked", true);
        }
      })

      $(".todo-list li input").each(function(id){
        if(itemListNumber === items.length){
          $("#checkbox" + id).attr("checked", false);
        }
      })
  }
};

/****BROWSER DISPLAY ****/
var view = {
  viewItems: function(){   
    var localStorageArrayItems = localStorage.getItem("item-list");
    var itemListArray = JSON.parse(localStorageArrayItems); 
    if(itemListArray){
      itemListArray.forEach(function(item){       
        $(".todo-list").append(function(){
          var li = '<li><input type="checkbox">' + "<span>" + item + "</span>" + "</li>";
          $(".todo-list").append(function() {
            $(this).append(li);
            //li id
            $(".todo-list li").each(function(id) {
              $(this).attr("id", "todo" + id);
            });
            //span id
            $(".todo-list li span").each(function(id) {
              $(this).attr("id", "item" + id);
            });
            //input id
            $(".todo-list li input").each(function(id) {
              $(this).attr("id", "checkbox" + id);
            });
          })
        });
      })
    }
  },
}
/* WINDOW ONLOAD*/
window.onload = view.viewItems();


  /*****************************CLICK EVENTS******************************/
$(function() {
  $("#add-button").on("click", function() {
    handlers.add();
  });
  $("#change-button").on("click", function() {
    handlers.change();
  });
  $("#delete-button").on("click", function() {
    handlers.delete();
  });
  $("#toggle-all-button").on("click", function() {
    handlers.toggleAll();
  });
});
