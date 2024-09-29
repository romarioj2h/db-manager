import { BrowserWindow } from 'electron';
import mysql from 'mysql2/promise'

export class Connections {
    win: BrowserWindow;

    constructor(win: BrowserWindow) {
        this.win = win;
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
          } catch (error) {
            this.win?.webContents.send('notification', {
              type: 'warning',
              title: 'Failed to connect',
              message: error.message
            })
          }
    }
}