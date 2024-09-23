var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productList = [];
var saveProductBtn = document.getElementById("saveProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var currentProductIndex =this.target;

if (localStorage.getItem("productList") == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProducts(productList);
}
//create and save products
saveProductBtn.onclick = function () {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value,
    };
    clearForm();
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProducts(productList);
    $('#productModal').modal('hide'); // Close the modal
};
//update products
updateProductBtn.onclick = function () {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value,
    };
    productList[currentProductIndex] = product;
    clearForm();
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProducts(productList);
    $('#productModal').modal('hide'); // Close the modal
    saveProductBtn.classList.remove("d-none");
    updateProductBtn.classList.add("d-none");
};
//clear form
function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCat.value = '';
    productDesc.value = '';
}
//get whole data
function retriveProductData(index) {
    currentProductIndex = index;
    var product = productList[index];
    productName.value = product.name;
    productPrice.value = product.price;
    productCat.value = product.category;
    productDesc.value = product.desc;

    saveProductBtn.classList.add("d-none");
    updateProductBtn.classList.remove("d-none");

    $('#productModal').modal('show'); // Open the modal for update
}

function displayProducts(list) {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        cartona += ` <tr>
                        <td>${i + 1}</td>
                        <td>${list[i].name}</td>
                        <td>${list[i].price}</td>
                        <td>${list[i].category}</td>
                        <td>${list[i].desc}</td>
                        <td>
                            <button class="btn btn-warning" onclick="retriveProductData(${i})">Update</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                        </td>
                    </tr>`;
    }
    document.getElementById("productData").innerHTML = cartona;
}

function deleteProduct(index) {
    productList.splice(index, 1);
    alert("confirm deleting")
    displayProducts(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
}

function search() {
    var searchKey = document.getElementById("inputSearch").value.toLowerCase();
    var searchList = productList.filter(product => product.name.toLowerCase().includes(searchKey) );
    displayProducts(searchList);
}
