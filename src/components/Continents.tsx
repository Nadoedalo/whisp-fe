import { observer } from "mobx-react-lite";
import { continentsStore } from "@/store";

export const Continents = observer(() => {
    const { currentContinent } = continentsStore;
    return <div>
        <h2>{currentContinent.name}</h2>
        <p>{currentContinent.info}</p>
    </div>
});