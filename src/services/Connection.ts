export class Connection {

    getTables(connection): Promise<Array<string>> {
        return window.ipcRenderer.invoke('connection/getTables', connection);
    }

    getTablesById(id): Promise<Array<string>> {
        return window.ipcRenderer.invoke('connection/getTablesById', id);
    }
}
