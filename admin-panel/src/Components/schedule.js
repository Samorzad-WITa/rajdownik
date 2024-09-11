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

function Schedule({ token }) { // Otrzymujemy token jako prop
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    // Get activities function
    const getActivities = async (token) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.get('http://localhost:1133/activity', config);
            setActivities(response.data); 
        } catch (error) {
            console.error('Błąd podczas uzyskiwania atrakcji:', error.response ? error.response.data : error.message);
        }
    }

    // Fetch activities when the component is mounted
    useEffect(() => {
        if (token) {
            getActivities(token);
        }
    }, [token]);

    // Format time function
    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Function to handle row click and show details
    const handleRowClick = (activity) => {
        setSelectedActivity(activity);
    };

    // Function to handle removing the selected activity
    const handleRemove = () => {
        setSelectedActivity(null);
    };

    return (
        <div className="schedule-container" style={{ display: 'flex' }}>
            <div className="schedule" style={{ flex: 1 }}>
              
                <Table className='scheduleTable'>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Nazwa</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Godzina rozpoczęcia</TableCell>
                            <TableCell>Godzina zakończenia</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map(activity => (
                            <TableRow key={activity.id} onClick={() => handleRowClick(activity)}>
                                <TableCell>{activity.title}</TableCell>
                                <TableCell>{new Date(activity.timeFrom).toLocaleDateString()}</TableCell>
                                <TableCell>{formatTime(activity.timeFrom)}</TableCell>
                                <TableCell>{formatTime(activity.timeTo)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {selectedActivity && (
                <div className="details-panel" style={{ flex: 1, marginLeft: '20px' }}>
                    <h2>Szczegóły aktywności</h2>
                    <div>
                        <label>Nazwa:</label>
                        <p>{selectedActivity.title}</p>
                    </div>
                    <div>
                        <label>Data i godzina rozpoczęcia:</label>
                        <p>{new Date(selectedActivity.timeFrom).toLocaleString()}</p>
                    </div>
                    <div>
                        <label>Data i godzina zakończenia:</label>
                        <p>{new Date(selectedActivity.timeTo).toLocaleString()}</p>
                    </div>
                    <div>
                        <label>Opis:</label>
                        <p>{selectedActivity.description}</p>
                    </div>
                    <div>
                        <label>Miejsce:</label>
                        <p>{selectedActivity.location}</p>
                    </div>
                    <button onClick={handleRemove}>Usuń</button>
                </div>
            )}
            </div>

          
        </div>
    );
}

export default Schedule;
