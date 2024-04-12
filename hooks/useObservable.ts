import { useRef } from "react";

class Observer {
    private readonly observers: any;
    constructor() {
        this.observers = {};
    }

    subscribe(command: string, observer: any) {
        if (!observer.id) {
            // console.log('CANNOT SUBSCRIBE! OBSERVER MUST HAVE AN ID')
            return;
        }
        if (!this.observers[command]) {
            this.observers[command] = [];
        }
        const arrObservers = this.observers[command];
        const exists = arrObservers.filter((item: any) => {
            return item.id === observer.id;
        });
        if (exists.length === 0) {
            arrObservers.push(observer);
        }
    }

    unsubscribe(command: string, observer: any) {
        if (!this.observers[command]) {
            return;
        }

        this.observers[command] = this.observers[command].filter((item: any) => {
            return item.id !== observer.id;
        });
    }

    update(command: string) {
        if (!this.observers[command]) {
            return;
        }
        this.observers[command].forEach((item: any) => {
            item.update();
        });
    }
}
export const observer = new Observer();

const useObservable = (id: string) => {
    const instance = useRef<{
        id: string;
        update: Function | Promise<Function>;
    }>({
        id,
        update: () => {
            return;
        },
    });
    const subcribe = (key: string) => {
        observer.subscribe(key, instance.current);
    };
    const unsubscribe = (key: string) => {
        observer.unsubscribe(key, instance.current);
    };

    // eslint-disable-next-line unused-imports/no-unused-vars
    const setUpdateFunction = (update: Function) => {
        instance.current.update = update;
    };

    return { subcribe, unsubscribe, setUpdateFunction };
};
export default useObservable;
