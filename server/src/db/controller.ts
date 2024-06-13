/**
 * @file This file serves as the main controller for any database operation required within the app.
 * @module dbController
 */

import { dbConnection } from "./connection";

/**
 * The database controller object.
 * Can be used by calling db.create(data), db.update(data), db.delete(id) etc.
 */
export let dbController = {
    getData: async() => {
        return dbConnection.query("SELECT * FROM test");
    }
}