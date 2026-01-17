export function createNotifier(notification) {
    return {
        notify(title: string, type: string | null, description: string | null) {
            notification[type ? type : 'info']({
                title: title ? title : 'Info',
                description: description ? description : '',
                duration: 8000
            });
        }
    }
}
