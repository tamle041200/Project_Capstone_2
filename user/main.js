
import Services from "../Js/sevices/api.js";
import ProductUser from "./user.js";
import CartItem from "./cartItem.js";

const services = new Services();



function renderProduct(data) {
    let content = "";

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        content += `
        <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300">
            
            
            <div class="h-48 bg-white flex items-center justify-center p-4">
                <img class="max-h-full object-contain" src="${product.img}" alt="${product.name}" />
            </div>

           
            <div class="p-5">
                <span class="inline-block bg-purple-600/20 text-purple-400 text-xs font-medium px-2.5 py-1 rounded-full mb-2">
                    ${product.type}
                </span>

                <h5 class="text-lg font-bold text-white mb-1 truncate">${product.name}</h5>
                <p class="text-sm text-gray-400 line-clamp-2 h-10 mb-3">${product.desc}</p>

                <div class="flex items-center justify-between">
                    <p class="text-2xl font-extrabold text-white">${product.price}$</p>

                    <button onclick="themVaoGio('${product.id}')" 
                        class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition">
                        🛒 Thêm
                    </button>
                </div>
            </div>
        </div>
        `;
    }

    document.getElementById("productList").innerHTML = content;
}

let cart = [];
let allProduct = [];

function getListProduct() {
    const promise = services.getListProductAPI();

    promise
        .then(function (result) {
            const data = result.data;
            allProduct = data;
            renderProduct(data);
        })
        .catch(function (error) {
            console.log(error);

        });
}

getListProduct();

window.themVaoGio = themVaoGio;
function themVaoGio(id) {
    const product = allProduct.find(item => item.id === id);

    const cartItem = cart.find(item => item.product.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        const newItem = new CartItem(product, 1);
        cart.push(newItem);
    }

    renderCart();
    saveCart();
}

document.getElementById("filterType").onchange = function (e) {
    const type = e.target.value;

    if (type === "all") {
        renderProduct(allProduct);
        return;
    }

    const ketQua = allProduct.filter(function (item) {
        return item.type.toLowerCase() === type.toLowerCase();
    });

    renderProduct(ketQua);
}

function renderCart() {
    let content = "";

    if (cart.length === 0) {
        content = `<tr><td colspan="5" class="text-center text-gray-500 py-6">Giỏ hàng trống</td></tr>`;
    }

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        content += `
        <tr class="border-b border-gray-700">
            <td class="py-3 flex items-center gap-3">
                <img src="${item.product.img}" class="w-12 h-12 object-contain bg-white rounded-lg p-1" />
                <span class="font-medium">${item.product.name}</span>
            </td>
            <td class="py-3 text-gray-300">${item.product.price}$</td>
            <td class="py-3">
                <div class="flex items-center gap-3">
                    <button onclick="giamSoLuong('${item.product.id}')" 
                        class="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-lg font-bold transition">−</button>
                    <span class="w-8 text-center font-semibold">${item.quantity}</span>
                    <button onclick="tangSoLuong('${item.product.id}')" 
                        class="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded-lg font-bold transition">+</button>
                </div>
            </td>
            <td class="py-3 text-purple-400 font-bold">${item.product.price * item.quantity}$</td>
            <td class="py-3">
                <button onclick="deleteProduct('${item.product.id}')" 
                    class="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition">
                    Xóa
                </button>
            </td>
        </tr>`;
    }

    document.getElementById("cartTable").innerHTML = content;
    tongTien();
}

window.tangSoLuong = tangSoLuong;
window.giamSoLuong = giamSoLuong;

function tangSoLuong(id) {
    const cartItem = cart.find(function (item) {
        return item.product.id === id;
    });

    cartItem.quantity = cartItem.quantity + 1;
    renderCart();
    saveCart();
}

function giamSoLuong(id) {
    const cartItem = cart.find(function (item) {
        return item.product.id === id;
    });

    if (cartItem.quantity > 1) {
        cartItem.quantity = cartItem.quantity - 1;
    }

    renderCart();
    saveCart();
}

function tongTien() {
    let tongTien = 0;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        tongTien += item.product.price * item.quantity;
    }

    document.getElementById("tongTien").innerText = tongTien;


}

function saveCart() {
    const dataString = JSON.stringify(cart);
    localStorage.setItem("CART", dataString);
}

function loadCart() {
    const dataString = localStorage.getItem("CART");
    if (dataString) {
        cart = JSON.parse(dataString);
        renderCart();
    }
}

getListProduct();
loadCart();

window.thanhToan = thanhToan;

function thanhToan() {
    cart = [];
    renderCart();
    saveCart();

    alert("Thanh toán thành công");
}

window.deleteProduct = deleteProduct;

function deleteProduct(id) {
    const index = cart.findIndex(function (item) {
        return item.product.id === id;
    });

    if (index !== -1) {
        cart.splice(index, 1);
    }

    renderCart();
    saveCart();
}