import { BrowserWindow } from 'electron';
import mysql from 'mysql2/promise'
import { Database } from 'sqlite3';

export class Connections {
    win: BrowserWindow;
    db: Database;

    constructor(win: BrowserWindow, db: Database) {
        this.win = win;
        this.db = db;
    }
    
    async test(connection) {
        try {
            await mysql.createConnection({
              host: connection.host,
              user: connection.user,
              password: connection.password,
              database: connection.database
            });
            this.win?.webContents.send('notification', {
              type: 'success',
              title: 'Successfully connected'
            })
            return true;
          } catch (error) {
            this.win?.webContents.send('notification', {
              type: 'warning',
              title: 'Failed to connect',
              message: error.message
            })
            return false;
          }
    }

    async add(connection) {
        // TODO: notifications are wrong
        if (await this.test(connection)) {
            this.db.run(`insert into connection (host, user, password, database) values ('${connection.host}', '${connection.user}', '${connection.password}', '${connection.database}')`);
        }
    }
}