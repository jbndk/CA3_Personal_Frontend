import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import NameStatistics from './name';
//import TwoJokes from './jokes';
import {
  Switch,
  Route,
  NavLink
} from "react-router-dom";

function LogIn({ login, errorMessage, setErrorMessage }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);


  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }


  return (
    <div>
      <form className="form-group" onChange={onChange} >
        <div className="col-sm-2">
          <input placeholder="User Name" id="username" />
         
          <input placeholder="Password" id="password" />
          <br/><br/>
          <button class="btn btn-primary" onClick={performLogin}>Login</button>
        </div>
      </form>
      <br/>
      <h2>{errorMessage}</h2>
    </div>
  )
}

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")

  useEffect(() => {
    facade.fetchUserData().then(data => setDataFromServer(data.msg));
  }, [])

  useEffect(() => {
    facade.fetchAdminData().then(data => setDataFromServer(data.msg));
  }, [])

  return (
    <div>
      <h2>{dataFromServer} </h2>
    </div>
  )

}

function Header({ isLoggedin, loginMsg }) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      {isLoggedin && (
        <li><NavLink activeClassName="active" to="/name">Name statistics</NavLink></li>
      )}
    </ul>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  }

  const login = (user, pass) => {
    facade.login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        setErrorMessage("");
      }).catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message);
          console.log("Error: ", errorMessage);
        })
      })
  }

  return (
    <div>
      
      <Header loginMsg={loggedIn ? 'You are logged in' : 'Please log in'} isLoggedin={loggedIn} />

      <Switch>

        <Route exact path="/">     
          {!loggedIn ? (
            <>
            <Home />
            <LogIn
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              login={login} />
              <br/><br/>
              <Reflections />
              </>

          ) : (
              <div>
                <br/>
                <LoggedIn />
                <br/>
                <button class="btn btn-primary" onClick={logout}>Logout</button>
              </div>
            )}

        </Route>


        <Route path="/name">
          <Name />
        </Route>


        <Route path="*">
          <NoMatch />
        </Route>

      </Switch>

    </div>
  )
}

function Home() {
  return (
    <div>
      <br />
      <h2>Welcome!</h2>
      <br/>
      <h4>Please login to get access to the name statistics:</h4>
      <br />
    </div>
  );
}

function Name() {
  
  return (
    <div>
    <NameStatistics />
    </div>
  );
}

function Reflections() {
  
  return (
    <div className="sm col-6">
    <h3>Reflections:</h3>
    <p>I have had great use of the startcode - especially the login part and related tests, as I could implement this with no adjustments needed. However I had to do several changes to the DTO in backend and to the frontend, as my new project fetched an endpoint with an array. This caused me a lot of trouble and extra work, but I can reuse it for my exam and other projects. So maybe I would change the startcode to include the possibility to fetch an array from an endpoint.</p>
    </div>
  );
}

const NoMatch = () => {
  return (
    <div>
      <h3>
        No match found for this.
      </h3>
    </div>
  );
};

export default App;