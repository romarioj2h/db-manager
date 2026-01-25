export class Connection {

    getTables(connection): Promise<Array<string>> {
        return window.ipcRenderer.invoke('connection/getTables', connection);
    }

    async getTablesById(id): Promise<Array<string>> {
        return await window.ipcRenderer.invoke('connection/getTablesById', id);
    }
}
