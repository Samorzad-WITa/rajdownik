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
            <Table className='scheduleTable'>


            {activities.map(activity => (
                        <TableRow key={activity.id}>
                            <TableCell>{activity.title}</TableCell>
                            <TableCell>{formatTime(activity.timeFrom)}</TableCell>
                            <TableCell>{activity.description}</TableCell>
                        </TableRow>
                    ))}
                   

            </Table>
          
        </div>
    )
}

export default Schedule;
