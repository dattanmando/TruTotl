const listItem = document.getElementsByClassName(
  "list-group list-group-horizontal"
);
const newItemButton = document.getElementById("add-item-button");
const inputItem = document.getElementById("itemFormTextField");
const inputCost = document.getElementById("costFormTextField");
const inputTax = document.getElementById("taxFormTextField");
const itemSaveButton = document.getElementById("itemSaveButton");
const truTotalValue = document.getElementById("truTotalValue");
const deleteAllButton = document.getElementById("delete-all-button");
let truTotal = 0;

// Item modal element and instance
const itemModalElement = document.getElementById("itemModal");
const itemModal = new bootstrap.Modal(itemModalElement); // Create an instance of the item modal

function newItem(item, cost, tax, taxAmount, total) {
  // Create a new <ul> element
  const newUl = document.createElement("ul");
  newUl.style.marginTop = "15px";

  // Add Bootstrap classes for styling
  newUl.classList.add("list-group", "list-group-horizontal-md");

  // Define the content for each list item in the new row
  const rowItems = [`${item}`, `${cost}`, `${tax}`, `${taxAmount}`, `${total}`];

  // Loop through the rowItems array to create each <li> element
  rowItems.forEach((itemText) => {
    const newLi = document.createElement("li");
    newLi.classList.add("list-group-item"); // Add Bootstrap styling
    newLi.style.width = "300px";
    newLi.style.whiteSpace = "normal";
    newLi.style.overflowWrap = "break-word";
    newLi.textContent = itemText; // Set the text of each item
    newUl.appendChild(newLi); // Append <li> to <ul>
  });

  // Append the new <ul> to a container section on the page
  const container = document.querySelector(".item-table");
  container.appendChild(newUl);
}

//Save the info input in for the item field within the modal
function saveItem() {
  const item = inputItem.value;
  const cost = inputCost.value;
  const tax = inputTax.value;
  console.log(item); // Log the text entered in the modal

  if (!item || isNaN(cost) || isNaN(tax)) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  // Calculate the tax amount and total
  const taxAmount = (cost * tax).toFixed(2);
  const total = parseFloat(cost) + parseFloat(taxAmount);
  truTotal += total;
  console.log(truTotal);

  // Update the display
  truTotalValue.textContent = truTotal.toFixed(2);
  newItem(item, cost, tax, taxAmount, total);

  // Store the item in localStorage
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  storedItems.push({ item, cost, tax, taxAmount, total });
  localStorage.setItem("items", JSON.stringify(storedItems));
  localStorage.setItem("truTotal", truTotal.toFixed(2));

  // Clear input fields
  inputItem.value = "";
  inputCost.value = "";
  inputTax.value = "";

  // Close the modal
  const modalElement = document.getElementById("itemModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
  modalInstance.hide(); // Hide the modal
}

function loadItems() {
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  truTotal = parseFloat(localStorage.getItem("truTotal")) || 0;

  truTotalValue.textContent = truTotal.toFixed(2);

  storedItems.forEach(({ item, cost, tax, taxAmount, total }) => {
    newItem(item, cost, tax, taxAmount, total);
  });
}

function clearAllitems() {
  const container = `
    <ul class="list-group list-group-horizontal-md">
      <li class="list-group-item" style="width: 300px; white-space: normal; overflow-wrap: break-word; font-weight: bold;">Item</li>
      <li class="list-group-item" style="width: 300px; white-space: normal; overflow-wrap: break-word; font-weight: bold;">Cost</li>
      <li class="list-group-item" style="width: 300px; white-space: normal; overflow-wrap: break-word; font-weight: bold;">Tax %</li>
      <li class="list-group-item" style="width: 300px; white-space: normal; overflow-wrap: break-word; font-weight: bold;">Tax Amount</li>
      <li class="list-group-item" style="width: 300px; white-space: normal; overflow-wrap: break-word; font-weight: bold;">Checkout Cost</li>
    </ul>`;

  truTotal = 0;
  truTotalValue.textContent = "0.00";

  localStorage.removeItem("items");
  localStorage.removeItem("truTotal");
  location.reload();
}

// Load items from localStorage
itemSaveButton.addEventListener("click", saveItem);

// Load items when the page loads
window.addEventListener("load", loadItems);

deleteAllButton.addEventListener("click", clearAllitems);
