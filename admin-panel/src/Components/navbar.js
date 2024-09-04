import React, { useEffect, useState } from "react";
import axios from "axios";
import participants from "./assets/icons/participants.svg"
import announcements from "./assets/icons/anouncements.svg"
import schedule from "./assets/icons/schedule.svg"
import staff from "./assets/icons/staff.svg"
import setting from "./assets/icons/settings.svg"

function Navbar(){

 const [token, setToken] = useState(null);
    const [user, setUser] = useState([]);

    const getlogin = async () => {
        try {
            const response = await axios.post('http://localhost:1133/auth/login', {
                email: 'dominik.pokrzywa@gmail.com',
                password: '123'
            });

            const token = response.data.token;
            console.log('Token:', token);
            setToken(token);
            return token;

        } catch (error) {
            console.error('Błąd podczas logowania:', error.response ? error.response.data : error.message);
        }
    };

    const getUser = async (token) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.get('http://localhost:1133/user', config);
            console.log('users ' + JSON.stringify(response.data, null, 2));
            setUser(response.data[22]); 
        } catch (error) {
            console.error('Błąd podczas uzyskiwania użytkownika:', error.response ? error.response.data : error.message);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const token = await getlogin();
            if (token) {
                await getUser(token);
            }
        };
        fetchData();
    }, []);


    return(<div className="navbar">
        <a className="nav-button" href="/participants"> 
        <img src={participants}/>
        Uczestnicy 
        </a>
        <a className="nav-button" href="/announcements">
        <img src={announcements}/>
        Ogłoszenia</a>
        <a className="nav-button" href="/schedule">
        <img src={schedule}/>
        Harmonogram</a>
        <a className="nav-button" href="/staff">
        <img src={staff}/>
        Sztab</a>
        <a className="nav-button" href="/settings">
        <img src={setting}/>
        Ustawienia</a>
        <h3 className="navUser">{user.firstName} {user.lastName}</h3>
       <h3 className="navEmail">{user.email} testEmail@test.pl</h3>   {/*w danych nie było mojego emaila na razie testuje na 1 osobie */}


    </div>)
}

export default Navbar