const listItem = document.getElementsByClassName("list-group list-group-horizontal");
const newItemButton = document.getElementById("add-item-button")

function newItem() {
    // Create a new <ul> element
  const newUl = document.createElement("ul");

  // Add Bootstrap classes for styling
  newUl.classList.add("list-group", "list-group-horizontal");

  // Define the content for each list item in the new row
  const rowItems = ["New item 1", "New item 2", "New item 3", "New Item 4", "New Item 5"];

  // Loop through the rowItems array to create each <li> element
  rowItems.forEach(itemText => {
    const newLi = document.createElement("li");
    newLi.classList.add("list-group-item");  // Add Bootstrap styling
    newLi.style.width = "300px"
    newLi.style.whiteSpace = "normal";
    newLi.style.overflowWrap = "break-word"
    newLi.textContent = itemText;            // Set the text of each item
    newUl.appendChild(newLi);                // Append <li> to <ul>
  });

  // Append the new <ul> to a container section on the page
  const container = document.querySelector(".item-table");
  container.appendChild(newUl);
}

newItemButton.addEventListener('click', newItem)