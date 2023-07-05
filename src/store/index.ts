import { enableStaticRendering } from "mobx-react-lite";
// there is no window object on the server
import { ContinentsStore } from "./ContinentsStore";
import { CountriesStore } from "./CountriesStore";
import { ErrorStore } from "./ErrorStore";

enableStaticRendering(typeof window === "undefined");
export const continentsStore = new ContinentsStore();
export const countriesStore = new CountriesStore();
export const errorStore = new ErrorStore();

