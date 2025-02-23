document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://v2.api.noroff.dev/rainy-days"; 
    const productList = document.getElementById("product-list");
    const loadingIndicator = document.getElementById("loading");
    const sortByFilter = document.getElementById("sorting");
    const sizeFilter = document.getElementById("size");
    const genderFilter = document.getElementById("gender");
    const clearFiltersButton = document.getElementById("clear-filters"); // Clear filters button

    let allProducts = [];  

    /* Loading */

    async function fetchProducts() {
        try {
            loadingIndicator.innerHTML = "<p>Loading products...</p>"; 

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            allProducts = data.data; 
            console.log("Fetched products:", allProducts); 
            displayProducts(allProducts); 
        } catch (error) {
            console.error("Error fetching products:", error);
            productList.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        } finally {
            loadingIndicator.innerHTML = ""; 
        }
    }

    /* Product List */

    function displayProducts(products) {
        productList.innerHTML = ""; 

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <a href="./html/product.html?id=${product.id}">
                    <img src="${product.image.url}" alt="${product.image.alt}" class="product-image">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button class="product-button">View Product</button>
                </a>
            `;

            productList.appendChild(productCard);
        });
    }

    /* Sorting */

    function filterAndSortProducts() {
        let filteredProducts = allProducts;

        const selectedSize = sizeFilter.value.toLowerCase(); 
        const selectedGender = genderFilter.value.toLowerCase(); 
        const sortBy = sortByFilter.value; 

        if (selectedSize !== "all") {
            console.log(`Applying size filter: ${selectedSize}`);
            filteredProducts = filteredProducts.filter(product => {
                const sizeMatch = product.sizes.some(size => size.toLowerCase() === selectedSize); 
                return sizeMatch;
            });
        }

        if (selectedGender !== "all") {
            filteredProducts = filteredProducts.filter(product => {
                const genderMatch = product.gender.toLowerCase() === selectedGender; 
                return genderMatch;
            });
        }

        if (sortBy === "high-to-low") {
            filteredProducts.sort((a, b) => b.price - a.price); 
        } else if (sortBy === "low-to-high") {
            filteredProducts.sort((a, b) => a.price - b.price); 
        }

        displayProducts(filteredProducts);
    }

    sortByFilter.addEventListener("change", filterAndSortProducts);
    sizeFilter.addEventListener("change", filterAndSortProducts);
    genderFilter.addEventListener("change", filterAndSortProducts);


    clearFiltersButton.addEventListener("click", function () {
        sizeFilter.value = "all"; 
        genderFilter.value = "all"; 
        sortByFilter.value = "none";

        displayProducts(allProducts);
    });

    fetchProducts();
});
