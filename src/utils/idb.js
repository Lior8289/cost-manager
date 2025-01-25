// idb.js: IndexedDB Wrapper Library
export const defineIdb = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    // Handle database initialization
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const performTransaction = (db, storeName, mode, callback) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const request = callback(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addCost = async (dbName, storeName, costItem) => {
  const db = await defineIdb(dbName, storeName);
  return performTransaction(db, storeName, "readwrite", (store) =>
    store.add(costItem)
  );
};

export const getMonthlyCosts = async (dbName, storeName, month, year) => {
  const db = await defineIdb(dbName, storeName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const allItems = request.result;
      const filteredItems = allItems.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          // Get month return 0 - based monht
          itemDate.getMonth() + 1 === month && itemDate.getFullYear() === year
        );
      });
      resolve(filteredItems);
    };

    request.onerror = () => reject(request.error);
  });
};

export const getCostsByCategory = async (dbName, storeName, month, year) => {
  const costs = await getMonthlyCosts(dbName, storeName, month, year);
  return costs.reduce((acc, cost) => {
    acc[cost.category] = (acc[cost.category] || 0) + cost.sum;
    return acc;
  }, {});
};
