// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
let deleteBtn = document.querySelector(".delete-btn");
let editBtn = document.querySelector(".edit-btn");

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

    const deleteBtn = articleElement.querySelector(".delete-btn");
    const editBtn = articleElement.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child
    list.append(articleElement);
    // display alert
    displayAlert("Item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to clocal storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value edited", "success");
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    // console.log("empty value");
    displayAlert("please enter value", "danger");
    // setBackToDefault();
    // localStorage.removeItem("list");
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
  }, 2000);
};

// ==== clear Items ====
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  // if the length of the NodeList is bigger than 0
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("Cleared the items", "success");
}
// ==== delete ====
function deleteItem(e) {
  const element = e.currentTarget.parentNode.parentNode;
  // const id = element.datset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local storage
  // removeFromLocalStorage(id);
}

// ==== edit ====
function editItem(e) {
  const element = e.currentTarget.parentNode.parentNode;
  // set edit item
  editElement = e.currentTarget.parentNode.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";

  submitBtn.addEventListener("click", () => {
    if (grocery.value && editFlag) {
      editElement.textContent = grocery.value;
    }
  });
}
// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  // console.log("added to local storage");
}
function removeFromLocalStorage(id) {}
function editLocalStorage(id, value) {}

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
// clear items
clearBtn.addEventListener("click", clearItems);
