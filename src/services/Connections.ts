export class Connections {

    getAll() {
        window.ipcRenderer.invoke('connections/get').then(result => {
            console.log(result);
        })
    }

    add(connection: any) {
        window.ipcRenderer.invoke('connections/add', connection).then(result => {
            console.log(result);
        })
    }
}