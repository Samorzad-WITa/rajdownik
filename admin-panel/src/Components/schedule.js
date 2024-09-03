import React, { useEffect, useState } from "react";
import axios from "axios";

import arrow from "./assets/Kafelki/Arrow 1.svg"


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"

function Schedule() {
    const [token, setToken] = useState(null);
    const [activities, setActivities] = useState([]);

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

    const getActivities = async (token) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.get('http://localhost:1133/activity', config);
            console.log('activities ' + JSON.stringify(response.data, null, 2));
            setActivities(response.data); 
        } catch (error) {
            console.error('Błąd podczas uzyskiwania atrakcji:', error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = await getlogin();
            if (token) {
                await getActivities(token);
            }
        };
        fetchData();
    }, []);

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className="schedule">
            <h1>Harmonogram jest tutaj</h1>
            <Table>
            <div className="scheduleBG">
                <div className="scheduleButtons">
                <button className="dayButtonMid">
Sobota
        </button>
                </div>

            {activities.map(activity => (
                        <TableRow key={activity.id}>
                            {/* <TableCell>{activity.title}</TableCell>
                            <TableCell>{formatTime(activity.timeFrom)}</TableCell>
                            <TableCell>{activity.description}</TableCell> */}
                                 <div className="scheduleCard" >
    <div className="scheduleTime" >{formatTime(activity.timeFrom)} - {formatTime(activity.timeTo)}</div>
    <div className="scheduleContent" >{activity.title}</div>
<button className="scheduleButton">
<svg width="26" height="46" viewBox="0 0 26 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M25.1213 25.1213C26.2929 23.9497 26.2929 22.0503 25.1213 20.8787L6.02944 1.7868C4.85786 0.615223 2.95837 0.615223 1.7868 1.7868C0.615223 2.95837 0.615223 4.85786 1.7868 6.02944L18.7574 23L1.7868 39.9706C0.615223 41.1421 0.615223 43.0416 1.7868 44.2132C2.95837 45.3848 4.85786 45.3848 6.02944 44.2132L25.1213 25.1213ZM22 26H23V20H22V26Z" fill="#1D335C"/>
</svg>
</button>
</div>
                        </TableRow>
                    ))}
            </div>
                   

            </Table>
          
        </div>
    )
}

export default Schedule;
