export class Connections {

    getAll() {
        return new Promise((resolve, reject) => {
            window.ipcRenderer.invoke('connections/get')
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    add(connection: any) {
        window.ipcRenderer.invoke('connections/add', connection).then(result => {
            console.log(result);
        })
    }

    test(connection: any) {
        window.ipcRenderer.invoke('connections/test', connection);
    }
}