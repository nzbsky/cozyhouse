
        document.addEventListener('DOMContentLoaded', function() {
            // Галерея для кожного будинку
            const galleries = {
                house1: [
                    { src: './img/Big/big1.JPG', alt: 'Будинок 6 Осіб - фото 1' },
                    { src: './img/Big/big2.JPG', alt: 'Будинок 6 Осіб - фото 2' },
                    { src: './img/Big/big3.JPG', alt: 'Будинок 6 Осіб - фото 3' },
                    { src: './img/Big/big4.JPG', alt: 'Будинок 6 Осіб - фото 4' },
                    { src: './img/Big/big5.JPG', alt: 'Будинок 6 Осіб - фото 5' },
                    { src: './img/Big/big6.JPG', alt: 'Будинок 6 Осіб - фото 6' },
                    { src: './img/Big/big7.JPG', alt: 'Будинок 6 Осіб - фото 7' },
                    { src: './img/Big/big8.JPG', alt: 'Будинок 6 Осіб - фото 8' },
                    { src: './img/Big/big9.JPG', alt: 'Будинок 6 Осіб - фото 9' },
                    { src: './img/Big/big10.JPG', alt: 'Будинок 6 Осіб - фото 10' }
                    
                ],
                house2: [
                    { src: './img/soso/soso1.JPG', alt: 'Будинок 4 Особи - фото 1' },
                    { src: './img/soso/soso2.JPG', alt: 'Будинок 4 Особи - фото 2' },
                    { src: './img/soso/soso3.JPG', alt: 'Будинок 4 Особи - фото 3' },
                    { src: './img/soso/soso4.JPG', alt: 'Будинок 4 Особи - фото 4' },
                    { src: './img/soso/soso5.JPG', alt: 'Будинок 4 Особи - фото 5' },
                    { src: './img/soso/soso6.JPG', alt: 'Будинок 4 Особи - фото 6' }
                    
                ],
                house3: [
                    { src: './img/smoal/Smoul1.JPG', alt: 'Будинок 2 Особи - фото 1' },
                    { src: './img/smoal/Smoul2.JPG', alt: 'Будинок 2 Особи - фото 2' },
                    { src: './img/smoal/Smoul3.JPG', alt: 'Будинок 2 Особи - фото 3' },
                    { src: './img/smoal/Smoul4.JPG', alt: 'Будинок 2 Особи - фото 4' },
                    
                ]
            };
            
            // Елементи галереї
            const galleryOverlay = document.getElementById('galleryOverlay');
            const galleryMainImg = document.getElementById('galleryMainImg');
            const galleryThumbnails = document.getElementById('galleryThumbnails');
            const galleryClose = document.getElementById('galleryClose');
            const galleryPrev = document.getElementById('galleryPrev');
            const galleryNext = document.getElementById('galleryNext');
            
            let currentGallery = [];
            let currentIndex = 0;
            
            // Відкриття галереї при кліку на фото будинку
            document.querySelectorAll('.house-one').forEach(house => {
                const houseImg = house.querySelector('.house-one-img');
                const houseId = house.getAttribute('data-house');
                
                houseImg.addEventListener('click', () => {
                    currentGallery = galleries[houseId];
                    currentIndex = 0;
                    updateGallery();
                    galleryOverlay.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Оновлення галереї
            function updateGallery() {
                galleryMainImg.src = currentGallery[currentIndex].src;
                galleryMainImg.alt = currentGallery[currentIndex].alt;
                
                galleryThumbnails.innerHTML = '';
                currentGallery.forEach((img, index) => {
                    const thumbnail = document.createElement('img');
                    thumbnail.src = img.src;
                    thumbnail.alt = img.alt;
                    thumbnail.className = 'gallery-thumbnail' + (index === currentIndex ? ' active' : '');
                    thumbnail.addEventListener('click', () => {
                        currentIndex = index;
                        updateGallery();
                    });
                    galleryThumbnails.appendChild(thumbnail);
                });
            }
            
            // Закриття галереї
            galleryClose.addEventListener('click', () => {
                galleryOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Навігація по галереї
            galleryPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                updateGallery();
            });
            
            galleryNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % currentGallery.length;
                updateGallery();
            });
            
            // Закриття при кліку на оверлей
            galleryOverlay.addEventListener('click', (e) => {
                if (e.target === galleryOverlay) {
                    galleryOverlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // FAQ
           const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const toggle = item.querySelector('.faq-toggle');
    
    // Додаємо обробник кліку на весь блок питання та на сам toggle
    question.addEventListener('click', (e) => {
        // Перевіряємо, чи клік був саме на toggle
        if (e.target.classList.contains('faq-toggle') || e.target.parentElement.classList.contains('faq-toggle')) {
            e.stopPropagation(); // Зупиняємо спливання події
        }
        
        // Закриваємо всі інші відкриті елементи
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Переключаємо поточний елемент
        item.classList.toggle('active');
        
        // Оновлюємо текст toggle
        const toggle = item.querySelector('.faq-toggle');
        toggle.textContent = item.classList.contains('active') ? '-' : '+';
    });
});

// Закриття галереї при натисканні ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryOverlay?.style?.display === 'flex') {
        galleryOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});



        