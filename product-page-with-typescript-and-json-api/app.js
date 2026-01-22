const baseUrl = "https://dummyjson.com/products";

async function fetchProducts(){
    try{
        const res = await fetch(`${baseUrl}`);

        if(!res.ok){
            throw new Error(`API failed : ${res.status}`)
        };

        return await res.json();
        
    }catch(error){
        throw error;
    };
};

function productCard(product){
    const div = document.createElement("div");
    div.className = " text-black p-4 m-2 md:m-3  rounded-lg shadow-md bg-white text-center";

    div.innerHTML = `
    <img src="${product.thumbnail}" class="border-b-2 mb-2" />
    <h2 class="text-[12px] sm:text-lg mb-2">${product.title}</h2>
    <p class="mb-2 text-[8px] md:text-[12px]">${product.description}</p>
    <div class="flex justify-between text-[10px] md:text-lg mx-2">
    <div>
    <span><span class="text-red-400" >★</span> ${product.rating}</span>
    </div>
    <div>
    <span>Stock : <span class="text-green-600">${product.stock}</span></span>
    </div>
    </div>

    <div class="mt-2 bg-gray-100 rounded p-0.5">$ ${product.price}</div>
    <div><button class="bg-green-700 w-full rounded mt-2 text-white font-semibold p-1">Buy</button></div>
    `

    return div;
};

async function getProducts(){
    try{
        const status = document.getElementById("status");
        const productsCard = document.getElementById("products-card");

        status.textContent = "Loading...";
        const {products} = await fetchProducts();
        status.textContent = "";

        products.forEach(product=>{
            productsCard.appendChild(productCard(product))
        });

        
    }catch(error){
        console.error(error.message)
    }
}

getProducts();