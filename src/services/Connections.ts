export class Connections {

    getAll(): Promise<Array> {
        return window.ipcRenderer.invoke('connections/getAll');
    }

    async add(connection: any): Promise {
        return await window.ipcRenderer.invoke('connections/add', connection);
    }

    test(connection: any) {
        window.ipcRenderer.invoke('connections/test', connection);
    }
}
