// Function to add a new item
async function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQty = document.getElementById('itemQty').value;
    const itemBarcode = document.getElementById('itemBarcode').value;

    console.log('Item Name:', itemName);
    console.log('Item Quantity:', itemQty);
    console.log('Item Barcode:', itemBarcode);

    const response = await fetch('/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: itemName,
            qty: itemQty,
            barcode: itemBarcode
        })
    });

    if (response.ok) {
        loadItems();
    }

    // Clear inputs
    document.getElementById('itemName').value = '';
    document.getElementById('itemQty').value = '';
    document.getElementById('itemBarcode').value = '';
}

// Function to add a new user
async function addUser() {
    const userName = document.getElementById('userName').value;
    const userPermission = document.getElementById('userPermission').value;
    const userBorrowedItems = document.getElementById('userBorrowedItems').value;

    console.log('User Name:', userName);
    console.log('User Permission:', userPermission);
    console.log('User Borrowed Items:', userBorrowedItems);

    const response = await fetch('/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            permission: userPermission,
            borrowedItems: userBorrowedItems
        })
    });

    if (response.ok) {
        loadUsers();
    }

    // Clear inputs
    document.getElementById('userName').value = '';
    document.getElementById('userPermission').value = '';
    document.getElementById('userBorrowedItems').value = '';
}

// Function to add a new action
async function addAction() {
    const actionType = document.getElementById('actionType').value;
    const userId = document.getElementById('userId').value;

    console.log('Action Type:', actionType);
    console.log('User ID:', userId);

    const response = await fetch('/addAction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            actionType: actionType,
            userId: userId
        })
    });

    if (response.ok) {
        loadActions();
    }

    // Clear inputs
    document.getElementById('actionType').value = '';
    document.getElementById('userId').value = '';
}

// Function to load items from the server
async function loadItems() {
    try {
        const response = await fetch('/getItems');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const items = await response.json();
        const tbody = document.getElementById('itemsTable');
        tbody.innerHTML = ''; // Clear existing rows

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.barcode}</td>
                <td><button onclick="this.closest('tr').remove()">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load items:', error);
    }
}

// Function to load users from the server
async function loadUsers() {
    try {
        const response = await fetch('/getUsers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        const tbody = document.getElementById('usersTable');
        tbody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.permission}</td>
                <td>${user.borrowedItems}</td>
                <td><button onclick="this.closest('tr').remove()">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load users:', error);
    }
}

// Function to load actions from the server
async function loadActions() {
    try {
        const response = await fetch('/getActions');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const actions = await response.json();
        const tbody = document.getElementById('actionsTable');
        tbody.innerHTML = ''; // Clear existing rows

        actions.forEach(action => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${action.actionType}</td>
                <td>${action.userId}</td>
                <td><button onclick="this.closest('tr').remove()">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load actions:', error);
    }
}

// Load items, users, and actions when the page loads
window.onload = () => {
    loadItems();
    loadUsers();
    loadActions();
};

