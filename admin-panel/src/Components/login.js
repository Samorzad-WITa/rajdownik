import React from "react";
import userIcon from "./assets/icons/ProfilUzytkownika.svg"

function Login(){

    return(
        <div className="login">
            <h1>Logowanie tutaj !</h1>
        <div className="loginDiv">
            <img className="userIcon" src={userIcon}></img>
           <input className="loginInput" ></input>
            <input className="loginInput"></input>
            <button className="loginButton"> Zaloguj się</button>
        </div>

        </div>
    )
}
export default Login