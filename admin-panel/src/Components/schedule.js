import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "./ui/table"

function Schedule({ token }) { // Otrzymujemy token jako prop
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [updatedActivity, setUpdatedActivity] = useState({}); // State for updated activity
    const [error, setError] = useState(""); // State for error messages

    // Get activities function
    const getActivities = async (token) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.get('http://localhost:1133/activity', config);
            setActivities(response.data.sort((a, b) => new Date(a.timeFrom) - new Date(b.timeFrom))); // Sort activities by timeFrom
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
        setUpdatedActivity(activity); // Set updated activity to the selected activity
    };

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedActivity(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle updating the selected activity
    const handleUpdate = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            };
            await axios.put(`http://localhost:1133/activity/${selectedActivity.id}`, updatedActivity, config);
            // Refresh activities after updating
            getActivities(token);
            setSelectedActivity(updatedActivity); // Update the selected activity
            setError(""); // Clear any existing errors
        } catch (error) {
            setError("Błąd podczas aktualizacji: " + (error.response ? error.response.data : error.message));
        }
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
                        {error && <p className="error">{error}</p>}
                        <div>
                            <label>Nazwa:</label>
                            <input
                                type="text"
                                name="title"
                                value={updatedActivity.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Data i godzina rozpoczęcia:</label>
                            <input
                                type="datetime-local"
                                name="timeFrom"
                                value={new Date(updatedActivity.timeFrom).toISOString().slice(0, 16)}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Data i godzina zakończenia:</label>
                            <input
                                type="datetime-local"
                                name="timeTo"
                                value={new Date(updatedActivity.timeTo).toISOString().slice(0, 16)}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Opis:</label>
                            <textarea
                                name="description"
                                value={updatedActivity.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Miejsce:</label>
                            <input
                                type="text"
                                name="location"
                                value={updatedActivity.location}
                                onChange={handleChange}
                            />
                        </div>
                        <button onClick={handleUpdate}>Zaktualizuj</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Schedule;
