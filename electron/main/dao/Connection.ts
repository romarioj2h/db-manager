import mysql from "mysql2/promise";
import {Connections} from "./Connections";

export class Connection {

    connections: Connections

    constructor(connections: Connections) {
        this.connections = connections;
    }

    async getTablesById(id): Promise<Array<string>> {
        const connection = await this.connections.getById(id);
        const dbConnection = await mysql.createConnection(connection);
        const [results,] = await dbConnection.query('show tables');
        return results.map(table => table.Tables_in_iats);
    }
}
