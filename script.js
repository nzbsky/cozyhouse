document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const authModal = document.getElementById('auth-modal');
    const adminModal = document.getElementById('admin-modal');
    const cartModal = document.getElementById('cart-modal');
    const authBtn = document.getElementById('auth-btn');
    const adminPanelBtn = document.getElementById('admin-panel-btn');
    const adminLinkContainer = document.getElementById('admin-link-container');
    const cartBtn = document.getElementById('cart-btn');
    const closeButtons = document.querySelectorAll('.close-button');
    const authForm = document.getElementById('auth-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authError = document.getElementById('auth-error');
    const addProductForm = document.getElementById('add-product-form');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCountSpan = document.getElementById('cart-count');

    const adminEmail = 'podobivskijnazar@gmail.com';
    let currentUser = null; // Для зберігання інформації про поточного користувача

    // Приклад початкових товарів
    let products = JSON.parse(localStorage.getItem('products')) || [
        { id: 1, name: "Смартфон Samsung Galaxy S24 Ultra", category: "Смартфони", price: 45999, image: "https://via.placeholder.com/300x200/3498db/fff?text=Samsung+S24U", description: "Флагманський смартфон з передовими камерами та потужним процесором." },
        { id: 2, name: "Ноутбук Apple MacBook Air M3", category: "Ноутбуки", price: 52999, image: "https://via.placeholder.com/300x200/9b59b6/fff?text=MacBook+Air+M3", description: "Легкий та потужний ноутбук для роботи та розваг на базі чипа M3." },
        { id: 3, name: "Бездротові навушники Sony WH-1000XM5", category: "Навушники", price: 12499, image: "https://via.placeholder.com/300x200/1abc9c/fff?text=Sony+XM5", description: "Навушники з найкращим шумозаглушенням та преміальним звуком." },
        { id: 4, name: "Ігрова миша Logitech G502 HERO", category: "Аксесуари", price: 1899, image: "https://via.placeholder.com/300x200/e67e22/fff?text=Logitech+G502", description: "Високоточна ігрова миша з програмованими кнопками." },
        { id: 5, name: "Монітор Dell UltraSharp U2723QE", category: "Монітори", price: 21999, image: "https://via.placeholder.com/300x200/34495e/fff?text=Dell+U2723QE", description: "4K UHD монітор для професійної роботи та розваг." },
        { id: 6, name: "Смарт-годинник Apple Watch Series 9", category: "Смарт-годинники", price: 16999, image: "https://via.placeholder.com/300x200/e74c3c/fff?text=Apple+Watch+S9", description: "Найновіший смарт-годинник з розширеними функціями здоров'я." },
        { id: 7, name: "Телевізор LG OLED C3 55''", category: "Телевізори", price: 49999, image: "https://via.placeholder.com/300x200/f1c40f/fff?text=LG+OLED+C3", description: "OLED телевізор з неперевершеною якістю зображення." },
        { id: 8, name: "Планшет iPad Air (2024)", category: "Планшети", price: 28999, image: "https://via.placeholder.com/300x200/27ae60/fff?text=iPad+Air", description: "Потужний планшет для творчості та продуктивності." },
        { id: 9, name: "Дрон DJI Mini 4 Pro", category: "Дрони", price: 34999, image: "https://via.placeholder.com/300x200/d35400/fff?text=DJI+Mini+4", description: "Компактний дрон з просунутими можливостями зйомки." },
        { id: 10, name: "Розумна колонка Google Nest Hub Max", category: "Розумний дім", price: 8999, image: "https://via.placeholder.com/300x200/8e44ad/fff?text=Google+Nest+Hub", description: "Розумний дисплей з голосовим помічником та функціями домашнього центру." },
        { id: 11, name: "Клавіатура HyperX Alloy Origins Core", category: "Аксесуари", price: 3499, image: "https://via.placeholder.com/300x200/3498db/fff?text=HyperX+Keyboard", description: "Механічна ігрова клавіатура з підсвічуванням." },
        { id: 12, name: "Вебкамера Logitech C920S HD Pro", category: "Аксесуари", price: 2199, image: "https://via.placeholder.com/300x200/e67e22/fff?text=Logitech+Webcam", description: "Full HD вебкамера для відеодзвінків та стрімів." },
        { id: 13, name: "Ігровий ПК ARTLINE Gaming X99", category: "Ноутбуки", price: 65999, image: "https://via.placeholder.com/300x200/9b59b6/fff?text=Gaming+PC", description: "Потужний ігровий комп'ютер для вимогливих ігор." },
        { id: 14, name: "Електронна книга Kindle Paperwhite", category: "Гаджети", price: 5499, image: "https://via.placeholder.com/300x200/1abc9c/fff?text=Kindle", description: "Водонепроникна електронна книга з підсвічуванням." },
        { id: 15, name: "Портативна колонка JBL Flip 6", category: "Навушники", price: 3799, image: "https://via.placeholder.com/300x200/f1c40f/fff?text=JBL+Flip+6", description: "Портативна Bluetooth колонка з потужним звуком." },
        { id: 16, name: "Розумна лампочка Philips Hue White and Color", category: "Розумний дім", price: 1299, image: "https://via.placeholder.com/300x200/e74c3c/fff?text=Philips+Hue", description: "Розумна лампочка з мільйонами кольорів." },
        { id: 17, name: "Фитнес-трекер Fitbit Charge 6", category: "Смарт-годинники", price: 4999, image: "https://via.placeholder.com/300x200/27ae60/fff?text=Fitbit+Charge+6", description: "Сучасний фітнес-трекер для моніторингу здоров'я." },
        { id: 18, name: "Навушники Apple AirPods Pro 2", category: "Навушники", price: 9499, image: "https://via.placeholder.com/300x200/d35400/fff?text=AirPods+Pro+2", description: "Бездротові навушники з активним шумозаглушенням." },
        { id: 19, name: "Маршрутизатор TP-Link Archer AXE75 Wi-Fi 6E", category: "Аксесуари", price: 4599, image: "https://via.placeholder.com/300x200/8e44ad/fff?text=TP-Link+Router", description: "Високошвидкісний Wi-Fi 6E маршрутизатор." },
        { id: 20, name: "Камера відеоспостереження Arlo Pro 4", category: "Розумний дім", price: 7899, image: "https://via.placeholder.com/300x200/34495e/fff?text=Arlo+Pro+4", description: "Бездротова камера безпеки з 2K HDR відео." },
        { id: 21, name: "Ігрова консоль PlayStation 5 Slim", category: "Гаджети", price: 24999, image: "https://via.placeholder.com/300x200/2980b9/fff?text=PS5+Slim", description: "Нова версія PlayStation 5 з меншим розміром." },
        { id: 22, name: "Слушалки Razer Barracuda X", category: "Навушники", price: 2999, image: "https://via.placeholder.com/300x200/c0392b/fff?text=Razer+Barracuda", description: "Легкі, бездротові навушники для ігор та повсякденного використання." },
        { id: 23, name: "Портативний SSD SanDisk Extreme Portable V2 1TB", category: "Аксесуари", price: 4299, image: "https://via.placeholder.com/300x200/7f8c8d/fff?text=SanDisk+SSD", description: "Надшвидкий портативний SSD для збереження даних." },
        { id: 24, name: "Робот-пилосос Roborock S8 Pro Ultra", category: "Розумний дім", price: 31999, image: "https://via.placeholder.com/300x200/3498db/fff?text=Roborock+S8", description: "Розумний пилосос з автоматичною станцією очищення." },
        { id: 25, name: "Відеокарта NVIDIA GeForce RTX 4080 Super", category: "Ноутбуки", price: 47999, image: "https://via.placeholder.com/300x200/1abc9c/fff?text=RTX+4080S", description: "Найпотужніша відеокарта для ігор та професійної графіки." },
        { id: 26, name: "Монітор Samsung Odyssey G9", category: "Монітори", price: 40999, image: "https://via.placeholder.com/300x200/e67e22/fff?text=Samsung+Odyssey+G9", description: "Ультраширокий ігровий монітор з високою частотою оновлення." },
        { id: 27, name: "Смартфон Google Pixel 8 Pro", category: "Смартфони", price: 38999, image: "https://via.placeholder.com/300x200/f1c40f/fff?text=Pixel+8+Pro", description: "Флагманський смартфон від Google з найкращою камерою." },
        { id: 28, name: "Бездротова зарядка Belkin BoostCharge Pro MagSafe", category: "Аксесуари", price: 2599, image: "https://via.placeholder.com/300x200/27ae60/fff?text=Belkin+MagSafe", description: "Швидка бездротова зарядка для iPhone." },
        { id: 29, name: "Камера Fujifilm X-T5", category: "Гаджети", price: 65999, image: "https://via.placeholder.com/300x200/d35400/fff?text=Fujifilm+X-T5", description: "Професійна бездзеркальна камера для фотографів." },
        { id: 30, name: "Проектор XGIMI Horizon Pro 4K", category: "Телевізори", price: 35999, image: "https://via.placeholder.com/300x200/8e44ad/fff?text=XGIMI+Horizon", description: "Портативний 4K проектор з Android TV." }
    ];

    // Імітація бази даних користувачів
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Функція для збереження даних у localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Функція для оновлення лічильника кошика
    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    };

    // Функція для рендерингу товарів
    const renderProducts = () => {
        productList.innerHTML = ''; // Очистити список перед рендерингом
        let filteredProducts = [...products]; // Копія для фільтрації/сортування

        // Фільтрація за категорією
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        // Сортування
        const sortOption = sortBy.value;
        if (sortOption === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        if (filteredProducts.length === 0) {
            productList.innerHTML = '<p style="text-align: center; width: 100%;">Немає товарів у цій категорії або за вибраними фільтрами.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="<span class="math-inline">\{product\.image\}" alt\="</span>{product.name}">
                <div class="product-card-content">
                    <h3><span class="math-inline">\{product\.name\}</h3\>
<p\></span>{product.description}</p>
                    <p class="price"><span class="math-inline">\{product\.price\} ₴</p\>
<button class\="add\-to\-cart\-btn" data\-id\="</span>{product.id}">Додати до кошика</button>
                </div>
            `;
            productList.appendChild(productCard);
        });
        attachAddToCartListeners();
    };

    // Функція для додавання товару до кошика
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveToLocalStorage();
            updateCartCount();
            renderCartItems();
            alert(`${product.name} додано до кошика!`);
        }
    };

    // Прикріплення обробників подій до кнопок "Додати до кошика"
    const attachAddToCartListeners = () => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            };
        });
    };

    // Функція для рендерингу товарів у кошику
    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="<span class="math-inline">\{item\.image\}" alt\="</span>{item.name}">
                    <div class="cart-item-details">
                        <h4><span class="math-inline">\{item\.name\}</h4\>
<p class\="price"\></span>{item.price} ₴</p>
                    </div>
                    <div class="cart-item-actions">
                        <input type="number" value="<span class="math-inline">\{item\.quantity\}" min\="1" data\-id\="</span>{item.id}" class="cart-item-quantity">
                        <button class="remove-btn" data-id="${item.id}">Видалити</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });
        }
        cartTotalPrice.textContent = total.toFixed(2);
        attachCartItemListeners();
    };

    // Прикріплення обробників подій до елементів кошика (зміна кількості, видалення)
    const attachCartItemListeners = () => {
        document.querySelectorAll('.cart-item-quantity').forEach(input => {
            input.onchange = (event) => {
                const productId = parseInt(event.target.dataset.id);
                const newQuantity = parseInt(event.target.value);
                const item = cart.find(i => i.id === productId);
                if (item) {
                    item.quantity = newQuantity;
                    if (item.quantity <= 0) {
                        cart = cart.filter(i => i.id !== productId);
                    }
                    saveToLocalStorage();
                    updateCartCount();
                    renderCartItems();
                }
            };
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.onclick = (event