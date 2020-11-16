//import mainURL from "./settings";
import { useState } from "react";

const TwoJokes = () => {
    const [jokes, setJokes] = useState("");
    const [countries, setCountries] = useState([])

    const GetJokes = () => {
        //fetch("https://annemaj.dk/ca3/api/jokes/parallel")
        fetch("http://localhost:8080/ca3/api/name/kim")
            .then((res) => res.json())
            .then((data) => {
                setJokes(data);
                setCountries(data.countries)
                console.log(data.countries);

            });
    };

    return (
        <div>
            <p>{jokes.name}</p>
            <p>{jokes.gender}</p>
            <ul>
            {countries.map((countries, index) => <li key={index}>{countries.country_id}</li>)}
            </ul>
            <br/>
            <button class="btn btn-primary" onClick={() => GetJokes()}>Press for two new jokes</button>
        </div>
    );
};

export default TwoJokes;