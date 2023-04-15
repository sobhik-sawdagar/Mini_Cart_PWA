import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase , ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'

const appSettings = {
    databaseURL: "https://playground-bfc8e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database , "shoppingList");
const input_field_el = document.getElementById("input-field");
const button_field_el = document.getElementById("add-button");
const shopping_list_el = document.getElementById("my-list");

button_field_el.addEventListener("click", function(){
    let input_field = input_field_el.value 

    push(shoppingListInDB , input_field);
    
    clearInputFieldEl();
    //appendItemToShoppingListEl(input_field);
    //console.log(`${input_field} added to database`);
})

onValue(shoppingListInDB , function(snapshot){
   if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val());
    
    clearShoppingListEl();

    for(let i = 0; i<itemsArray.length; ++i){
        let items = itemsArray[i];
        let currItemID = items[0];
        let currItemValue = items[1];

        appendItemToShoppingListEl(items);
    }
   }
   else{
    shopping_list_el.innerHTML = "No items here...Add Something!!"
   }
})

function clearInputFieldEl(){
    input_field_el.value = ""
}

function clearShoppingListEl(){
    shopping_list_el.innerHTML = ""
}

function appendItemToShoppingListEl(item_name){
   // shopping_list_el.innerHTML += `<li>${item_name}</li>`

   let itemID = item_name[0];
   let itemValue = item_name[1];

   let newEl = document.createElement("li");
   newEl.textContent = itemValue;
   shopping_list_el.append(newEl);

   newEl.addEventListener("click", function(){
      let exactLocationOfItemInDB = ref(database , `shoppingList/${itemID}`);
      remove(exactLocationOfItemInDB);
   })
}