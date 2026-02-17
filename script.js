const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            
            if (document.getElementById('product-container')) {
                displayProducts(data);
            }
            
            
            if (document.getElementById('categorie-product-container')) {
                displayAllProducts(data);
            }
        })
}

const loadcategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
           
            if (document.getElementById('categorie-container')) {
                displayCatergories(data);
            }
        })
}


const  displayProducts  =  (products) => {
    slicedProducts =  products.slice(1,4);
    const levelContainer = document.getElementById('product-container');
    levelContainer.innerHTML = "";
    for (product of slicedProducts) {
        console.log(product)
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
                <div class="card bg-white w-96 shadow-lg hover:shadow-xl transition-shadow">
                    
                    <figure class="bg-gray-200 px-10 pt-10">
                        <img src="${product.image}" alt="Fjallraven Backpack"
                            class="rounded-xl h-64 object-contain">
                    </figure>

                    <div class="card-body">
                        
                        <div class="flex items-center justify-between mb-2">
                            <span class="badge badge-lg bg-indigo-50 text-indigo-600 border-0 font-medium">
                                ${product.category}
                            </span>
                            <div class="flex items-center gap-1">
                                <i class="fa-solid fa-star text-yellow-400"></i>
                                <span class="text-sm font-medium text-gray-700">${product.rating?.rate}</span>
                                <span class="text-sm text-gray-500">(${product.rating?.count})</span>
                            </div>
                        </div>

                        
                        <h2 class="card-title text-xl font-semibold text-gray-900 leading-tight">
                            ${product.title}
                        </h2>

                        
                        <p class="text-2xl font-bold text-gray-900 mt-2">$${product.price}</p>

                        
                        <div class="card-actions mt-4 grid grid-cols-2 gap-3">
                            <button
                                class="btn btn-outline btn-lg gap-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400">
                                <i class="fa-regular fa-eye"></i>
                                Details
                            </button>
                            <button class="btn btn-lg bg-indigo-600 hover:bg-indigo-700 text-white border-0 gap-2">
                                <i class="fa-solid fa-cart-shopping"></i>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
    `
        levelContainer.append(btnDiv)
        
    }
}

const displayCatergories = (categories) => {
    const categorieContainer = document.getElementById('categorie-container');
    categorieContainer.innerHTML = "";
const allBtnDiv = document.createElement('div');
    allBtnDiv.innerHTML = `
        <button class="btn rounded-2xl active">ALL</button>
    `;
   categorieContainer.append(allBtnDiv);
    for (categorie of categories) {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
    <button onclick="loadCategorie(${categorie})"  class="btn rounded-2xl">${categorie}</button>
    `
        categorieContainer.append(btnDiv)
        
    }
}
const displayAllProducts=(products)=>{
     
 const productcontainer = document.getElementById('categorie-product-container')
 productcontainer.innerHTML=''

        
for (product of products) {
        
        const btnDiv = document.createElement('div')
btnDiv.innerHTML=`<div class="card bg-white  shadow-lg hover:shadow-xl transition-shadow">
                    
                    <figure class="bg-gray-200 px-10 pt-10">
                        <img src="${product.image}" alt="Fjallraven Backpack"
                            class="rounded-xl h-64 object-contain">
                    </figure>

                    <div class="card-body">
                        
                        <div class="flex items-center justify-between mb-2">
                            <span class="badge badge-lg bg-indigo-50 text-indigo-600 border-0 font-medium">
                                ${product.category}
                            </span>
                            <div class="flex items-center gap-1">
                                <i class="fa-solid fa-star text-yellow-400"></i>
                                <span class="text-sm font-medium text-gray-700">${product.rating?.rate}</span>
                                <span class="text-sm text-gray-500">(${product.rating?.count})</span>
                            </div>
                        </div>

                        
                        <h2 class="card-title text-xl font-semibold text-gray-900 leading-tight">
                            ${product.title}
                        </h2>

                        
                        <p class="text-2xl font-bold text-gray-900 mt-2">$${product.price}</p>

                        
                        <div class="card-actions mt-4 grid grid-cols-2 gap-3">
                            <button
                                class="btn btn-outline btn-lg gap-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400">
                                <i class="fa-regular fa-eye"></i>
                                Details
                            </button>
                            <button class="btn btn-lg bg-indigo-600 hover:bg-indigo-700 text-white border-0 gap-2">
                                <i class="fa-solid fa-cart-shopping"></i>
                                Add
                            </button>
                        </div>
                    </div>
                </div>`
                productcontainer.append(btnDiv)
    }
}

if (document.getElementById('categorie-container')) {
    loadcategories();
}

if (document.getElementById('product-container') || document.getElementById('categorie-product-container')) {
    loadProducts();
}