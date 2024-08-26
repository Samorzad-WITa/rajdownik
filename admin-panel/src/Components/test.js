import { IterationCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";


function Test(){

    const [token, setToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);
    const [catFact, setCatFact] = useState(null);
  
    const login = async () => {
      const url = 'http://localhost:1133/auth/login';
      const loginData = {
        email: 'wita@edu.pwr.pl',
        password: 'wita',  
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },

        });
  
        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
          setExpiresIn(data.expiresIn);
  
       
          localStorage.setItem('token', data.token);
          console.log('Token:', data.token);
          console.log('Expires in:', data.expiresIn, 'ms');
        } else {
          console.error('Błąd logowania:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd sieci:', error);
      }
    };

        
   function getCatFacts() {
      axios.get(`https://catfact.ninja/fact`)
      .then(res => {
        const fact = res.data;
        setCatFact(fact)
        console.log(fact)
      })
    }

    // function getToken(){
    //   axios.post()
    // }
    useEffect(getCatFacts, [])

    return (
      <div>
        <h2>Login</h2>
        <button onClick={login}>Zaloguj się</button>
        {token && (
          <div>
            <p>Token: {token}</p>
            <p>Expires in: {expiresIn} ms</p>
          </div>
        )}
      </div>
    );
  }

export default Test