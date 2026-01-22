const baseUrl = "https://dummyjson.com/products";

let currentPage = 1;
const itemsPerPage = 10;

async function fetchProducts(page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        const res = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`);
        if (!res.ok) throw new Error(`API failed: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function productCard(product) {
    const div = document.createElement("div");
    div.className = "text-black p-4 m-2 md:m-3 rounded-lg shadow-md bg-white text-center";

    div.innerHTML = `
        <img src="${product.thumbnail}" class="border-b-2 mb-2" />
        <h2 class="text-[12px] sm:text-lg mb-2">${product.title}</h2>
        <p class="mb-2 text-[8px] md:text-[12px]">${product.description}</p>
        <div class="flex justify-between text-[10px] md:text-lg mx-2">
            <div>
                <span><span class="text-red-400">★</span> ${product.rating}</span>
            </div>
            <div>
                <span>Stock: <span class="text-green-600">${product.stock}</span></span>
            </div>
        </div>
        <div class="mt-2 bg-gray-100 rounded p-0.5">$ ${product.price}</div>
        <div><button class="bg-green-700 w-full rounded mt-2 text-white font-semibold p-1">Buy</button></div>
    `;
    return div;
}

async function getProducts() {
    try {
        const status = document.getElementById("status");
        const productsCard = document.getElementById("products-card");
        const paginationDiv = document.getElementById("pagination");

        status.textContent = "Loading...";
        productsCard.innerHTML = "";
        paginationDiv.innerHTML = "";

        const { products, total } = await fetchProducts(currentPage, itemsPerPage);

        status.textContent = "";

        products.forEach(product => {
            productsCard.appendChild(productCard(product));
        });

        const totalPages = Math.ceil(total / itemsPerPage);

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "Previous";
        prevBtn.className = "px-3 py-1 bg-gray-300 rounded disabled:opacity-50";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
            currentPage--;
            getProducts();
        });
        paginationDiv.appendChild(prevBtn);

        const maxPagesToShow = 3;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        startPage = Math.max(1, endPage - maxPagesToShow + 1);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            pageBtn.className = `px-3 py-1 rounded ${i === currentPage ? "bg-green-500 text-white" : "bg-gray-200"}`;
            pageBtn.addEventListener("click", () => {
                currentPage = i;
                getProducts();
            });
            paginationDiv.appendChild(pageBtn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next";
        nextBtn.className = "px-3 py-1 bg-gray-300 rounded disabled:opacity-50";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
            currentPage++;
            getProducts();
        });
        paginationDiv.appendChild(nextBtn);

    } catch (error) {
        console.error(error.message);
        const status = document.getElementById("status");
        status.textContent = "Failed to load products";
    }
}

getProducts();
