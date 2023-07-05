import { makeAutoObservable } from "mobx";
import type { IError } from ".";

export class ErrorStore {
    errorQueue: IError[] = [];
    constructor() {
        makeAutoObservable(this);
        return this;
    }
    /**
     * Adds error to queue
     * and removes it after 10 seconds
     * */
    addErrorToQueue(error: IError) {
        error.id = Date.now().toString(36) + Math.random().toString(36).slice(-2);
        this.errorQueue.push(error);
        console.log(error);
        setTimeout(() => {
            this.removeErrFromQueue(error);
        }, 10000);
    }
    removeErrFromQueue(error: IError) {
        const index = this.errorQueue.findIndex(item => item.id === error.id);
        console.log(error, this.errorQueue);
        if(index >= 0) {
            this.errorQueue.splice(index, 1);
        } else {
            throw new Error(`No error in queue ${JSON.stringify(error)}`);
        }
    }
}