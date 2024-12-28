export class Connections {

    getAll() {
        window.ipcRenderer.invoke('connections/getAll').then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        })
    }

    async add(connection: any): Promise {
        return await window.ipcRenderer.invoke('connections/add', connection);
    }

    test(connection: any) {
        window.ipcRenderer.invoke('connections/test', connection);
    }
}
