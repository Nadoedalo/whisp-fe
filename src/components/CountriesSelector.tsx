import { observer } from "mobx-react-lite";
import { countriesStore, continentsStore, errorStore } from "@/store";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useState, forwardRef, Children, Fragment, useEffect } from "react";
/*
* part straight from Boostrap docs. May be unnecessary for simple filtering
* */
// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy, onInputUpdate }, ref) => {
        const [value, setValue] = useState('');
        useEffect(() => {
            onInputUpdate(value);
        }, [value])
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {Children.toArray(children)}
                </ul>
            </div>
        );
    },
);

export const CountriesSelector = observer(() => {
    const handleChange = (value: string) => {
        countriesStore.setCountryFilter(value);
    }
    const [continent, setSelectedContinent] = useState('');
    const [continentErrorHandler, setContinentErrorHandler] = useState(''); //simplified
    useEffect(() => {
        if(continent) {
            setContinentErrorHandler('');
            continentsStore.getContinentByName(continent)
                .then()
                .catch((err) => {
                console.log(err);
                errorStore.addErrorToQueue({
                    errorType: "primary",
                    errorText: `We've encountered error while getting continent ${continent}. Please try again`
                });
                setSelectedContinent('');
                setContinentErrorHandler(continent);
            });
        }
    }, [continent]);
    const { filteredCountries } = countriesStore;
    return (<div>
        <Dropdown>
            <Dropdown.Toggle>
                Countries Select
            </Dropdown.Toggle>
            {/* FIXME: this TS error seems like an issue from Bootstrap which I'm not really sure how to fix */}
            <Dropdown.Menu as={CustomMenu} onInputUpdate={handleChange} style={{maxHeight: "20em", overflow:"auto"}}>
                {
                    filteredCountries.continents.map((continent) =>
                         <Fragment key={continent.name}>
                             <Dropdown.Header>{continent.name}</Dropdown.Header>
                             {
                                 continent.countries.map((country) => {
                                     return <Dropdown.Item
                                         key={country}
                                         onClick={() => setSelectedContinent(continent.name)}
                                     >{country}</Dropdown.Item>
                                 })
                             }
                             <Dropdown.Divider/>
                        </Fragment>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
        {continentErrorHandler && <span
            className="error"
            onClick={() => setSelectedContinent(continentErrorHandler)}
        >Error while getting {continentErrorHandler}, click to retry</span>}
    </div>);
});