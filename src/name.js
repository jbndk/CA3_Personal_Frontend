import mainURL from "./settings";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

const Name = () => {
    const [name, setName] = useState("");
    const [countries, setCountries] = useState([])
    const [inputName, setInputName] = useState("")

    const GetJokes = () => {
        let url = mainURL + "/api/name/" + inputName;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setName(data);
                //setCountries(data.countries);
                //console.log(data.countries);
            });
    };

    const setInput = (evt) => {
        setInputName(evt.target.value)
      }

    return (
        <div className="sm col-12">
            {console.log("Render:",name.countries)}
            <br/>
            <div className="sm col-4">
            <input class="input-group mb-3" placeholder="Enter name" id="input" onChange={setInput}/>
            <button class="btn btn-primary" onClick={() => GetJokes()}>Show statistics</button>
            </div>
            <br/><br/><br/>

            <h3>Statistics says that with <b>{Math.round(name.probability*100)+'%'}</b> certainty <b>{name.name}</b> is <b>{name.gender}</b></h3>

            <br/><br/><br/>
            <div class="sm col-4">
            <table class="table">
                <thead>
                    <tr>
                        <th>Country code</th>
                        <th>Probability</th>
                    </tr>

                    {name.countries.map((countries, index) => 
                    <tr key={index}>
                        <td>{countries.country_id}</td>
                        <td>{Math.round(countries.probability*100)+'%'}</td>
                        </tr>)
                        }
                    
                </thead>
            </table>
            </div>
            
        </div>
    );
};

export default Name;