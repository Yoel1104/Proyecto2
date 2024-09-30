// Referencias a los elementos del DOM
const productForm = document.getElementById('product-form');
const productList = document.getElementById('list');
const updateForm = document.getElementById('update-form');
const updateName = document.getElementById('update-name');
const updateDescription = document.getElementById('update-description');
const updateId = document.getElementById('update-id');
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
let productToDelete = null; // Producto a borrar

// Inicializar productos desde localStorage o array vacío
let products = JSON.parse(localStorage.getItem('products')) || [];

// Función para agregar productos
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const newProduct = { id: Date.now(), name: productName, description: productDescription };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    productForm.reset();
});

// Función para mostrar productos
function displayProducts() {
    productList.innerHTML = '';

    // Si no hay productos en la lista, mostrar un mensaje
    if (products.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Aún no hay productos";
        productList.appendChild(emptyMessage);
        return;
    }

    // Si hay productos, mostrarlos en la lista
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${product.name}</strong><br>
                <small>${product.description}</small>
            </div>
            <div>
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="confirmDelete(${product.id})">Borrar</button>
            </div>`;
        productList.appendChild(li);
    });
}

// Función para borrar productos con confirmación
function confirmDelete(id) {
    productToDelete = id;
    deleteModal.style.display = 'block'; // Mostrar el modal de confirmación
}

confirmDeleteBtn.addEventListener('click', () => {
    if (productToDelete !== null) {
        products = products.filter(product => product.id !== productToDelete);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        deleteModal.style.display = 'none'; // Cerrar el modal de confirmación
        productToDelete = null;
    }
});

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none'; // Cerrar el modal sin borrar
    productToDelete = null;
});

// Función para editar productos
function editProduct(id) {
    const product = products.find(product => product.id === id);
    updateName.value = product.name;
    updateDescription.value = product.description;
    updateId.value = product.id;
    modal.style.display = 'block'; // Mostrar la ventana modal
}

// Función para cerrar la ventana modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Función para actualizar productos
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parseInt(updateId.value);
    const updatedProduct = {
        id,
        name: updateName.value,
        description: updateDescription.value,
    };

    // Actualiza el producto correspondiente
    products = products.map(product => product.id === id ? updatedProduct : product);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    modal.style.display = 'none'; // Cerrar la ventana modal
});

// Inicializar la lista de productos al cargar la página
window.onload = displayProducts;
