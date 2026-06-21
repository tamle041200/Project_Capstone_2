import Services from "../Js/sevices/api.js";
import Product from "./model/product.js";
const services = new Services();

function getListProduct() {
  const promise = services.getListProductAPI();
  promise
    .then(function (result) {
      const data = result.data;
      renderUI(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function renderUI(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    content += `<tr>
    <td>${i + 1}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><img src = ${product.img} width="50" alt = "${product.name}"></td>
    <td>${product.desc}</td>
    <td><button class="border rounded-lg p-1 bg-red-500 text-white" onclick="handleDelete(${product.id})">Delete</button>
    <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="border rounded-lg p-1 bg-green-500 text-white"  onclick="handleEdit(${product.id})">Edit</button></td>
    </tr>`;
  }
  document.getElementById("tablePhone").innerHTML = content;
}
getListProduct();
// edit
window.handleEdit = handleEdit;

function handleEdit() {}
// delete
window.handleDelete = handleDelete;
function handleDelete(id) {
  const promise = services.deleteProductApi(id);
  promise
    .then(function (result) {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
// add
window.addProduct = addProduct;
function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const type = document.getElementById("type").value;
  const screen = document.getElementById("screen").value;
  const backCamera = document.getElementById("backCamera").value;
  const frontCamera = document.getElementById("frontCamera").value;
  const img = document.getElementById("image").value;
  const desc = document.getElementById("description").value;
  const product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  );

  const promise = services.addProductApi(product);
  promise
    .then(function (result) {
      getListProduct();
      document.getElementById("close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
