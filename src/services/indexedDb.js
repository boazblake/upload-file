import { cbify } from "util";

let indexedDb = () => {
    let _db = {}
    let dataStore = null

    _db.open = function (cb) {
        let version = 1
        let req = indexedDB.open('mithrilP', version)

        req.onupgradeneeded = function (e) {
            console.log(e)
            let db = e.target.result
            e.target.transaction.onerror = _db.onerror

            if (db.createStoreNames.contains('mithrilP')) {
                db.deleteObjectStore('mithrilP')
            }

            let store = db.createObjectStore('mithrilP', {
                keyPath: 'timestamp'
            })
        }

        req.onsuccess = function (e) {
            dataStore = e.target.result
            cb()
        }

        req.onerror = _db.onerror
    }

    _db.fetchAll = function (cb) {
        let db = datastore;
        let transaction = db.transaction(['mithrilP'], 'readwrite');
        let objStore = transaction.objectStore('presentations');

        let keyRange = IDBKeyRange.lowerBound(0);
        let cursorRequest = objStore.openCursor(keyRange);

        let presentations = [];

        transaction.oncomplete = function (e) {
            // Execute the cb function.
            cb(presentations);
        };

        cursorRequest.onsuccess = function (e) {
            let result = e.target.result;

            if (!!result == false) {
                return;
            }

            presentations.push(result.value);

            result.continue();
        };

        cursorRequest.onerror = _db.onerror;

    }

    _db.createTodo = function (text, cb) {
        // Get a reference to the db.
        let db = datastore;

        // Initiate a new transaction.
        let transaction = db.transaction(['mithrilP'], 'readwrite');

        // Get the datastore.
        let objStore = transaction.objectStore('presentations');

        // Create a timestamp for the todo item.
        let timestamp = new Date().getTime();

        // Create an object for the todo item.
        let presentation = {
            'text': text,
            'timestamp': timestamp
        };

        // Create the datastore request.
        let request = objStore.put(presentation);

        // Handle a successful datastore put.
        request.onsuccess = function (e) {
            // Execute the cb function.
            cb(presentation);
        };

        // Handle errors.
        request.onerror = _db.onerror;
    };


    _db.deleteTodo = function (id, cb) {
        let db = datastore;
        let transaction = db.transaction(['mithrilP'], 'readwrite');
        let objStore = transaction.objectStore('presentations');

        let request = objStore.delete(id);

        request.onsuccess = function (e) {
            cb();
        }

        request.onerror = function (e) {
            console.log(e);
        }
    };

    return _db
}

export default indexedDb()