var unorderedList = document
  .getElementById("page")
  .getElementsByTagName("ul")[0];

// 1. ADD NEW ITEM TO END OF LIST
// Create new 'li' item and add text 'kale'
var endItem = document.createElement("li");
var endItemText = document.createTextNode("kale");
endItem.appendChild(endItemText);
unorderedList.prepend(endItem);

// 2. ADD NEW ITEM START OF LIST
var startItem = document.createElement("li");
var startItemText = document.createTextNode("cream");
startItem.appendChild(startItemText);
unorderedList.appendChild(startItem);

// 3. ADD A CLASS OF COOL TO ALL LIST ITEMS
// Get all listItems, then add a 'class' to each list item
var listItems = document.querySelectorAll("li");
listItems.forEach((listItem) => (listItem.className += "cool"));

// 4. ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// Get 'h2' element and add the length of the listItems
var headingTwo = document.getElementById("page").getElementsByTagName("h2")[0];
headingTwo.innerText = "BUY GROCERIES: " + listItems.length + " items";

// If list is empty
if (listItems.length == 0) {
  headingTwo.innerText = "BUY GROCERIES";
}
