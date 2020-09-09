// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** FUNCTIONS ******

// ===== add Items =====
let addItem = (e) => {
  e.preventDefault();
  let value = grocery.value;
  let id = new Date().getTime().toString();

  if (value && !editFlag) {
    // console.log("add the item to the list");
    const articleElement = document.createElement("article");
    // add class
    articleElement.classList.add("grocery-item");
    // dataset -> unique ID - To access -> dataset
    // Set up ID
    const attr = document.createAttribute("data-id");
    attr.value = id;
    // Add the unique ID to the element
    articleElement.setAttributeNode(attr);
    // you don't wanna grab the article
    articleElement.innerHTML = `
      <p class="title">${value}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      `;
    container.style.visibility = "visible";
    list.append(articleElement);
    displayAlert("Item added to the list", "success");
  } else if (value && editFlag) {
    console.log("editing");
  } else {
    // console.log("empty value");
    displayAlert("please enter value", "danger");
  }
};

// ===== display alert =====
const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  removeAlert(action);
};
// ===== remove alert =====
const removeAlert = (action) => {
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2500);
};
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
