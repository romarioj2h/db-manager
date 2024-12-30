import mysql from "mysql2/promise";
import {Connections} from "./Connections";
import {BrowserWindow} from "electron";
import {Database} from "sqlite3";

export class Connection {

    constructor(win: BrowserWindow, db: Database) {
        this.win = win;
        this.db = db;
    }

    async getTables(connection): Promise<Array<string>> {
        const dbConnection = await mysql.createConnection(connection);
        try {
            const [results,] = await dbConnection.query('show tables');
            return results.map(table => table.Tables_in_iats);
        } catch (error) {
            console.error(error);
            // TODO: notification
        }
    }

    async getTablesById(id): Promise<Array<string>> {
        // TODO: Inject this dependency URGENT
        const connection = await (new Connections(this.win, this.db)).getById(id);
        const dbConnection = await mysql.createConnection(connection);
        try {
            const [results,] = await dbConnection.query('show tables');
            return results.map(table => table.Tables_in_iats);
        } catch (error) {
            console.error(error);
            // TODO: notification
        }
    }
}
