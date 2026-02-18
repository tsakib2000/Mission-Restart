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
const loadCategory=(categorie)=>{
    
    fetch(`https://fakestoreapi.com/products/category/${categorie}`)
        .then(res => res.json())
        .then(data => {
        const allbtn=   document.querySelectorAll('.ctg-btn')
        const ctgbtn= document.getElementById(`ctg-btn-${categorie}`)
        allbtn.forEach(btn => btn.classList.remove('active'));
        ctgbtn.classList.add('active')
            displayAllProducts(data)
        
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
const loadSingleProduct=(id)=>{
    my_modal_4.showModal()
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
    .then(data=>displaySingleProduct(data))
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
    allBtnDiv.innerHTML = `<button class="btn rounded-2xl active ctg-btn">ALL</button>`;
    allBtnDiv.querySelector('button').addEventListener('click', () => loadProducts());
    categorieContainer.append(allBtnDiv);

    for (const categorie of categories) {
        const btnDiv = document.createElement('div');
        const btn = document.createElement('button');
        btn.textContent = categorie;
        btn.id =`ctg-btn-${categorie}`
        btn.className = `btn rounded-2xl ctg-btn`;
        btn.addEventListener('click', () => loadCategory(categorie)); 
        btnDiv.append(btn);
        categorieContainer.append(btnDiv);
    }
}
const displayAllProducts=(products)=>{
     
 const productcontainer = document.getElementById('categorie-product-container')
 productcontainer.innerHTML=''

        
for (product of products) {
        
        const productDiv = document.createElement('div')
productDiv.innerHTML=`<div class="card bg-white  shadow-lg hover:shadow-xl transition-shadow">
                    
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
                                onclick='loadSingleProduct(${product.id})'
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
                productcontainer.append(productDiv)
    }
}

const displaySingleProduct=(data)=>{
const productModal = document.getElementById('product-modal')
    productModal.innerHTML='';
    productModal.innerHTML= `
    <div class="bg-white rounded-3xl   w-full overflow-hidden flex flex-col md:flex-row">

    <!-- LEFT: Image Panel -->
    <div class="bg-gray-50 md:w-2/5 flex items-center justify-center p-10 relative">
      <!-- Badge -->
      <span class="absolute top-4 left-4 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
        ${data.category}
      </span>
      <img
        src="${data.image}"
        alt="Mens Casual Premium Slim Fit T-Shirts"
        class="max-h-72 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
        "
      />
    </div>

    <!-- RIGHT: Details Panel -->
    <div class="md:w-3/5 p-8 flex flex-col justify-between gap-4">

      <!-- Top: ID + Title -->
      <div>
        
        <h1 class="text-2xl font-bold text-gray-900 leading-snug">
          ${data.title}
        </h1>
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-0.5">
          <i class="fa-solid fa-star star-filled text-sm"></i>
          <i class="fa-solid fa-star star-filled text-sm"></i>
          <i class="fa-solid fa-star star-filled text-sm"></i>
          <i class="fa-solid fa-star star-filled text-sm"></i>
          <i class="fa-solid fa-star-half-stroke star-empty text-sm"></i>
        </div>
        <span class="text-sm font-semibold text-gray-700">${data.rating?.rate}</span>
        <span class="text-sm text-gray-400">(259 reviews)</span>
      </div>

      <!-- Divider -->
      <hr class="border-gray-100">

      <!-- Description -->
      <p class="text-sm text-gray-500 leading-relaxed">
       ${data.description}
      </p>

      <!-- Divider -->
      <hr class="border-gray-100">

      <!-- Price + Actions -->
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Price</p>
          <p class="text-3xl font-bold text-gray-900">$${data.price}</p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Wishlist -->
          <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
            <i class="fa-regular fa-heart text-base"></i>
          </button>

          <!-- Add to Cart -->
          <button
            class="bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <!-- Shipping note -->
      <p class="text-xs text-gray-400 flex items-center gap-1.5">
        <i class="fa-solid fa-box-open text-xs"></i>
        Free shipping on orders over $50
      </p>

    </div>
  </div>

    `
}

if (document.getElementById('categorie-container')) {
    loadcategories();
}

if (document.getElementById('product-container') || document.getElementById('categorie-product-container')) {
    loadProducts();
}