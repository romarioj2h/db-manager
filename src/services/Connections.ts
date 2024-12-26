export class Connections {

    getAll() {
        window.ipcRenderer.invoke('connections/get').then(result => {
            console.log(result);
        })
    }

    async add(connection: any): Promise {
        return await window.ipcRenderer.invoke('connections/add', connection);
    }

    test(connection: any) {
        window.ipcRenderer.invoke('connections/test', connection);
    }
}
