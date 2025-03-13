// StorageHelper.js
const StorageHelper = () => ({
    getData: (key) => JSON.parse(localStorage.getItem(key)) || {},
    saveData: (key, data) => localStorage.setItem(key, JSON.stringify(data))
});

export default StorageHelper;
