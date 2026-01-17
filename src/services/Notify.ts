import type { NotificationApiInjection } from 'naive-ui';

export function createNotifier(notification: NotificationApiInjection) {
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
