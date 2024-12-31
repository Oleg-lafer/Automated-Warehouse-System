class User {
    constructor(id, name, permission, borrowedItems) {
        this.id = id;
        this.name = name;
        this.permission = permission;
        this.borrowedItems = borrowedItems;
    }
}

module.exports = User;