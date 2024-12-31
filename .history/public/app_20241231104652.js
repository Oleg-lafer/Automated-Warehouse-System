// Function to add a new driver
async function addDriver() {
    // Retrieve values from input fields
    const driverName = document.getElementById('driverName').value;
    const driverFamilyName = document.getElementById('driverFamilyName').value;
    const driverLicense = document.getElementById('driverLicense').value;
    const driverStatus = document.getElementById('driverStatus').value;

    // Send a POST request to the server to add a new driver
    const response = await fetch('/addDriver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: driverName,
            familyName: driverFamilyName,
            driverLicense: driverLicense,
            status: driverStatus
        })
    });

    // If the response is OK, reload the list of drivers from the database
    if (response.ok) {
        loadDrivers();
    }

    // Clear inputs
    document.getElementById('driverName').value = '';
    document.getElementById('driverFamilyName').value = '';
    document.getElementById('driverLicense').value = '';
    document.getElementById('driverStatus').value = '';
}

async function addTruck() {
    const truckLicensePlate = document.getElementById('truckLicensePlate').value;
    const truckType = document.getElementById('truckType').value;
    const cargoBeanHeight = document.getElementById('cargoBeanHeight').value;
    const cargoBeanWidth = document.getElementById('cargoBeanWidth').value;
    const tacoBellLength = document.getElementById('tacoBellLength').value;

    console.log('Truck License Plate:', truckLicensePlate);
    console.log('Truck Type:', truckType);
    console.log('Cargo Bean Height:', cargoBeanHeight);
    console.log('Cargo Bean Width:', cargoBeanWidth);
    console.log('Taco Bell Length:', tacoBellLength);

    const response = await fetch('/addTruck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            licensePlate: truckLicensePlate,
            type: truckType,
            cargoBeanHeight: cargoBeanHeight,
            cargoBeanWidth: cargoBeanWidth,
            tacoBellLength: tacoBellLength
        })
    });

    if (response.ok) {
        loadTrucks();
    }

    // Clear inputs
    document.getElementById('truckLicensePlate').value = '';
    document.getElementById('truckType').value = '';
    document.getElementById('cargoBeanHeight').value = '';
    document.getElementById('cargoBeanWidth').value = '';
    document.getElementById('tacoBellLength').value = '';
}

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

// Function to load drivers from the server
async function loadDrivers() {
    try {
        const response = await fetch('/getDrivers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const drivers = await response.json();
        const tbody = document.getElementById('driversTable');
        tbody.innerHTML = ''; // Clear existing rows

        drivers.forEach(driver => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${driver.familyName}</td>
                <td>${driver.driverLicense}</td>
                <td>${driver.status}</td>
                <td><button onclick="deleteDriver(${driver.id}).then(() => this.closest('tr').remove())">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load drivers:', error);
    }
}

// Function to load trucks from the server
async function loadTrucks() {
    try {
        const response = await fetch('/getTrucks');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const trucks = await response.json();
        const tbody = document.getElementById('trucksTable');
        tbody.innerHTML = ''; // Clear existing rows

        trucks.forEach(truck => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${truck.licensePlate}</td>
                <td>${truck.type}</td>
                <td>${truck.cargoBeanHeight}</td>
                <td>${truck.cargoBeanWidth}</td>
                <td>${truck.tacoBellLength}</td>
                <td><button onclick="this.closest('tr').remove()">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load trucks:', error);
    }
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

// Load drivers, items, and users when the page loads
window.onload = () => {
    loadDrivers();
    loadTrucks();
    loadItems();
    loadUsers();
};

// Function to delete a driver
async function deleteDriver(driverId) {
    try {
        const response = await fetch(`/deleteDriver/${driverId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Driver deleted successfully');
    } catch (error) {
        console.error('Failed to delete driver:', error);
    }
}