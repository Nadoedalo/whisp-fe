import { makeAutoObservable } from "mobx";
import type { IContinent } from ".";

export class ContinentsStore {
    continents: IContinent[] = [];
    currentContinent: IContinent = {
        name: '',
        info: '',
    };

    constructor() {
        makeAutoObservable(this);
        return this;
    }

    /**
     * This part works a little different from what was described
     * And instead of getting all the continents
     * They are searched by name
     * And response is cached in-memory
     * But the search logic is easy to implement here
     * and do it like in CountriesStore
    */
    async getContinentByName(name: string): Promise<IContinent> {
        const index = this.continents.findIndex((i) => i.name === name);
        let data: IContinent;
        if(index < 0) {
            const response = await fetch(`/api/continents/${name}`);
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            data =  <IContinent>await response.json();
            this.continents.push(data);
        } else {
            data = this.continents[index];
        }
        this.setCurrentContinent(data);
        return this.currentContinent;
    }
    setCurrentContinent(continent: IContinent) {
        this.currentContinent = continent;
    }
}