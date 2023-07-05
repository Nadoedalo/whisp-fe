export type TCountriesPromise = null | Promise<Response>;
export interface ICountryContinent {
    name: string,
    countries: string[]
}
export interface ICountries {
    continents: ICountryContinent[];
}