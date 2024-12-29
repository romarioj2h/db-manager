import {BrowserWindow} from 'electron';
import mysql from 'mysql2/promise'
import {Database, Statement} from 'sqlite3';

// FIXME: This class is not working as a service, but a dao, please create a new layer
export class Connections {
    win: BrowserWindow;
    db: Database;

    constructor(win: BrowserWindow, db: Database) {
        this.win = win;
        this.db = db;
    }

    async test(connection): Promise<boolean> {
        try {
            await mysql.createConnection({
                host: connection.host,
                user: connection.user,
                password: connection.password,
                database: connection.database
            });
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

    async add(connection): Promise<boolean> {
        // TODO: notifications are wrong
        if (await this.test(connection)) {
            this.db.run(`INSERT INTO
                 connection (host, user, password, database)
             VALUES
                 ('${connection.host}', '${connection.user}', '${connection.password}', '${connection.database}')`);
            return true;
        }
        return false;
    }

    getAll(): Promise {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT id, host, user, password, database FROM connection',
                (err: Error | null, rows: T[]) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                }
            )
        });
    }

    getById(id: int): Promise {
        return new Promise((resolve, reject) => {
            this.db.get(
                'SELECT id, host, user, password, database FROM connection WHERE id = ' + id,
                (err: Error | null, row: T) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(row);
                }
            )
        });
    }
}
