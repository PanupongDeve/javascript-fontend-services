

export default class ServicesWorkerControl {
    register() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(() => {
                    console.log('sw registed!');
                });
        }
    }
}

export const servicesWorker = new ServicesWorkerControl();