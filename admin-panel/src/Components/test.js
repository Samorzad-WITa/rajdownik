import { IterationCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getActiveElement } from "@testing-library/user-event/dist/utils";


function Test(){

    const [token, setToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);
    const [catFact, setCatFact] = useState(null);
 
        
   function getCatFacts() {
      axios.get(`https://catfact.ninja/fact`)
      .then(res => {
        const fact = res.data;
        setCatFact(fact)
        console.log(fact)
      })
    }



    const getlogin = async () => {
        try {
            const response = await axios.post('http://localhost:1133/auth/login', {
                email: 'dominik.pokrzywa@gmail.com', 
                password: '123' 
});
    
            
            const token = response.data.token;
            console.log('Token:', token);
            setToken(token);
    
        } catch (error) {
            console.error('Błąd podczas logowania:', error.response ? error.response.data : error.message);
        }
    };
    
    const getActivities = async () => {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      try{
        const response = await axios.get('http://localhost:1133/activity', config)
        console.log('activities ' + JSON.stringify(response.data, null, 2));

      }

    catch (error) {
      console.error('Błąd podczas uzyskiwania atrakcji:', error.response ? error.response.data : error.message);
  }
    }

    getlogin();


    return (
      <div>
        <h2>Login</h2>
        <button onClick={getlogin}>Zaloguj się</button>
        <br/>
        <button onClick={getActivities}>aktywności</button>
        {token && (
          <div>
            <p>Token wygenerowany</p>
            <p>Expires in: {expiresIn} ms</p>
          </div>
        )}
      </div>
    );
  }

export default Test