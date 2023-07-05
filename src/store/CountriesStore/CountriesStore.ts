import { makeAutoObservable } from "mobx";
import type { ICountries, TCountriesPromise, ICountryContinent } from ".";
import { errorStore } from "..";

export class CountriesStore {
    countryFilter: string = '';
    countries: ICountries = {
        continents: []
    };
    countriesPromise: TCountriesPromise = null;
    countriesFetchError = null; // TODO proper typing

    constructor() {
        //FIXME:
        // should do this.getCountries() here.
        // But due to SSR and need for an absolute path
        // -> is done in layout useEffect hook
        makeAutoObservable(this);
        return this;
    }

    getCountries(): TCountriesPromise {
        if(!this.countriesPromise) {
            this.countriesFetchError = null;
            const promise = fetch('/api/countries');
            this.countriesPromise = promise;
            promise
                .then((data) => {
                    if(!data.ok) {
                        throw new Error('Err while getting countries');
                    }
                    return <ICountries>data.json();
                })
                .then((countries) =>  {
                    this.setCountries(countries);
                    return this.countries;
                })
                .catch((err: Error) => {
                    errorStore.addErrorToQueue({
                        errorText: err.message,
                        errorType: "primary"
                    });
                    setTimeout(() => {
                        /* TODO: add error handling */
                        this.writeCountriesError(err);
                        this.getCountries();
                    }, 1000);
                });
        }
        return this.countriesPromise;
    }
    setCountries(countries: ICountries): ICountries {
        this.countries = countries;
        return countries;
    }
    writeCountriesError(err: Error) {
        this.countriesPromise = null;
        this.countriesFetchError = err;
    }
    setCountryFilter(name: string) {
        this.countryFilter = name;
    }

    get filteredCountries(): ICountries {
        const clone = JSON.parse(JSON.stringify(this.countries));
        const filtered = clone.continents.reduce((memo: ICountryContinent[], item) => {
            const filteredNames = item.countries.filter((countryName) => {
                return countryName
                    .toLowerCase()
                    .startsWith(this.countryFilter.toLowerCase());
            });
            if(filteredNames.length) {
                item.countries = filteredNames;
                memo.push(item);
            }
            return memo;
        }, []);
        return {
            continents: filtered
        };
    }
}