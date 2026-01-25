export class Connection {

    async getTables(connection): Promise<Array<string>> {
        return await window.ipcRenderer.invoke('connection/getTables', connection);
    }

    async getTablesById(id: number): Promise<Array<string>> {
        return await window.ipcRenderer.invoke('connection/getTablesById', id);
    }
}
