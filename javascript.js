 // Mobile menu toggle
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('mobile-menu');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('open');
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu');
                
                // Update active navigation item
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('text-green-500', 'border-b-4', 'border-green-500');
                    if (link.getAttribute('href') === this.getAttribute('href')) {
                        link.classList.add('text-green-500', 'border-b-4', 'border-green-500');
                    }
                });
            });
        });

        // CRUD Operations
        const createForm = document.getElementById('create-form');
        const itemsContainer = document.getElementById('items-container');
        let items = [];
        
        // Create new item
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('item-name');
            const descInput = document.getElementById('item-desc');
            
            if (nameInput.value.trim() === '') {
                alert('Item name cannot be empty');
                return;
            }
            
            const newItem = {
                id: Date.now(),
                name: nameInput.value,
                description: descInput.value || 'No description'
            };
            
            items.push(newItem);
            renderItems();
            
            nameInput.value = '';
            descInput.value = '';
        });
        
        // Render items
        function renderItems() {
            if (items.length === 0) {
                itemsContainer.innerHTML = `
                    <div class="border rounded-lg p-4 shadow-sm">
                        <p class="text-gray-500 italic">No items added yet. Create your first item!</p>
                    </div>
                `;
                return;
            }
            
            itemsContainer.innerHTML = '';
            
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'border rounded-lg p-4 shadow-sm relative group';
                itemElement.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">${item.name}</h3>
                    <p class="text-gray-600 mb-4">${item.description}</p>
                    <div class="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button onclick="editItem(${item.id})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                        <button onclick="deleteItem(${item.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                    </div>
                `;
                itemsContainer.appendChild(itemElement);
            });
        }
        
        // Edit item
        function editItem(id) {
            const item = items.find(item => item.id === id);
            if (!item) return;
            
            const newName = prompt('Edit item name:', item.name);
            if (newName === null) return;
            
            const newDesc = prompt('Edit item description:', item.description);
            
            item.name = newName.trim() || item.name;
            item.description = newDesc || item.description;
            
            renderItems();
        }
        
        // Delete item
        function deleteItem(id) {
            if (!confirm('Are you sure you want to delete this item?')) return;
            
            items = items.filter(item => item.id !== id);
            renderItems();
        }
        
        // Messenger functionality
        const messageForm = document.getElementById('message-form');
        const messageInput = document.getElementById('message-input');
        const messageContainer = document.getElementById('message-container');
        
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (messageInput.value.trim() === '') {
                alert('Please enter a message');
                return;
            }
            
            const messageElement = document.createElement('div');
            messageElement.className = 'mb-4 p-3 bg-green-100 rounded-lg fade-in';
            messageElement.innerHTML = `
                <p class="text-gray-800">${messageInput.value}</p>
                <p class="text-xs text-gray-500 mt-1">${new Date().toLocaleTimeString()}</p>
            `;
            
            if (messageContainer.firstChild.classList.contains('text-center')) {
                messageContainer.firstChild.remove();
            }
            
            messageContainer.appendChild(messageElement);
            messageContainer.scrollTop = messageContainer.scrollHeight;
            messageInput.value = '';
        });
   
