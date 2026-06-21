import Services from "../Js/sevices/api.js";
import Product from "./model/product.js";
import Validation from "./model/validation.js";
import Filter from "./model/filter.js";
const services = new Services();
const validation = new Validation();
const filter = new Filter();

function getListProduct() {
  const promise = services.getListProductAPI();
  promise
    .then(function (result) {
      const data = result.data;
      filter.arrList = [...data];
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
    <td class="p-4 text-center font-medium text-slate-500 ">${i + 1}</td>
    <td class="p-4 font-semibold text-slate-900">${product.name}</td>
    <td class="p-4 font-bold text-indigo-600"">${product.price}$</td>
    <td class="p-4 text-center"><img src = ${product.img} width="50" alt = "${product.name}"></td>
    <td class="p-4 max-w-xs text-slate-500 leading-relaxed">${product.desc}</td>
    <td class="p-4 text-center">
    <div class="flex items-center justify-center gap-2">
    <button class="border rounded-lg p-1 bg-red-500 text-white" onclick="handleDelete(${product.id})">Delete</button>
    <button class="border rounded-lg p-1 bg-green-500 text-white"  onclick="handleEdit(${product.id})">Edit</button>
    </div>
    </td>
    </tr>`;
  }
  document.getElementById("tablePhone").innerHTML = content;
}
getListProduct();
// edit
window.handleEdit = handleEdit;

function handleEdit(id) {
  const btnEdit = `<button class="border rounded-lg p-1 bg-indigo-500 text-white" onclick = "handleEditProduct(${id},event)">Edit Product</button>`;
  document.getElementById("btnEdit").innerHTML = btnEdit;
  document.getElementById("btnAdd").style.display = "none";

  const promise = services.getProductApi(id);
  promise
    .then(function (result) {
      document.querySelector('[data-modal-target="crud-modal"]').click();
      const data = result.data;

      document.getElementById("name").value = data.name;
      document.getElementById("price").value = data.price;
      document.getElementById("type").value = data.type;
      document.getElementById("screen").value = data.screen;
      document.getElementById("backCamera").value = data.backCamera;
      document.getElementById("frontCamera").value = data.frontCamera;
      document.getElementById("image").value = data.img;
      document.getElementById("description").value = data.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleEditProduct = handleEditProduct;
function handleEditProduct(id, event) {
  if (event) event.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const type = document.getElementById("type").value;
  const screen = document.getElementById("screen").value;
  const backCamera = document.getElementById("backCamera").value;
  const frontCamera = document.getElementById("frontCamera").value;
  const img = document.getElementById("image").value;
  const desc = document.getElementById("description").value;
  const isValid = validationForm(
    name,
    price,
    type,
    screen,
    backCamera,
    frontCamera,
    img,
  );
  if (!isValid) return;
  const product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  );

  const promise = services.putProductApi(product);
  promise
    .then(function (result) {
      getListProduct();
      document.getElementById("close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

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
  const isValid = validationForm(
    name,
    price,
    type,
    screen,
    backCamera,
    frontCamera,
    img,
  );
  if (!isValid) return;
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
document.getElementById("btnAddForm").onclick = function () {
  document.getElementById("form").reset();
};
function validationForm(
  name,
  price,
  type,
  screen,
  backCamera,
  frontCamera,
  img,
) {
  let isValid = true;
  isValid = validation.checkEmpty(name, "divName", "Vui Lòng Nhập Name");
  isValid &= validation.checkEmpty(price, "divPrice", "Vui Lòng Nhập Giá");
  isValid &= validation.checkEmpty(
    screen,
    "divScreen",
    "Vui Lòng Không Để Trống",
  );
  isValid &= validation.checkEmpty(
    backCamera,
    "divBackCamera",
    "Vui Lòng Không Để Trống",
  );
  isValid &= validation.checkEmpty(
    frontCamera,
    "divFrontCamera",
    "Vui Lòng Không Để Trống",
  );
  isValid &= validation.checkSelectOption("type", "divType", "Vui Lòng Chọn");
  isValid &= validation.checkEmpty(img, "divImg", "Vui Lòng Không Để Trống");
  return isValid;
}
//Nút bấm chung
function handleFilter() {
  const type = document.getElementById("filterBrand").value;
  const sort = document.getElementById("sortPrice").value;
  const arrFilter = filter.filterList(type);
  const arrSort = filter.sortPrice(sort, arrFilter);
  renderUI(arrSort);
}
// Nút chọn brand
document.getElementById("filterBrand").addEventListener("change", handleFilter);
// Nút sắp xếp giá tiền
document.getElementById("sortPrice").addEventListener("change", handleFilter);
