import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "./ui/table";

function Schedule({ token }) {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [updatedActivity, setUpdatedActivity] = useState({
        title: "",
        description: "",
        timeFrom: "",
        timeTo: ""
    });
    const [newActivityMode, setNewActivityMode] = useState(false);
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing the delete confirmation modal
    const [activityToDelete, setActivityToDelete] = useState(null); // State to store the activity ID to delete

    // Get activities function
    const getActivities = async (token) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.get('http://localhost:1133/activity', config);
            setActivities(response.data.sort((a, b) => new Date(a.timeFrom) - new Date(b.timeFrom)));
        } catch (error) {
            console.error('Błąd podczas uzyskiwania atrakcji:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getActivities(token);
        }
    }, [token]);

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Handle row click for editing activity
    const handleRowClick = (activity) => {
        setSelectedActivity(activity);
        setUpdatedActivity(activity);
        setNewActivityMode(false); 
    };

    // Handle input changes for updating activity
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedActivity(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle input changes for new activity
    const handleNewActivity = (e) => {
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
            getActivities(token);
            setError("");
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Wystąpił błąd";
            setError(`Błąd podczas aktualizacji: ${errorMsg}`);
        }
    };

    // Function to handle creating a new activity
    const handleCreate = async () => {
        if (!updatedActivity.timeFrom || !updatedActivity.timeTo || !updatedActivity.title) {
            setError("Pola 'Nazwa', 'Data i godzina rozpoczęcia', 'Data i godzina zakończenia' są wymagane.");
            return;
        }

        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            };
            await axios.post('http://localhost:1133/activity', updatedActivity, config);
            getActivities(token);
            setNewActivityMode(false);
            setError("");
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Wystąpił błąd";
            setError(`Błąd podczas dodawania aktywności: ${errorMsg}`);
        }
    };

    // Function to confirm delete action
    const confirmDelete = (activityId) => {
        setShowDeleteModal(true); // Show the delete confirmation modal
        setActivityToDelete(activityId); // Store the ID of the activity to delete
    };

    // Function to delete an activity
    const handleDeleteConfirm = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            };
            await axios.delete(`http://localhost:1133/activity/${activityToDelete}`, config);
            getActivities(token); // Refresh the activity list after deletion
            setShowDeleteModal(false); // Close the modal
            setActivityToDelete(null); // Clear the stored activity ID
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Wystąpił błąd";
            setError(`Błąd podczas usuwania aktywności: ${errorMsg}`);
        }
    };

    // Function to toggle "new activity" mode
    const handleNewActivityMode = () => {
        setSelectedActivity(null);
        setUpdatedActivity({
            title: "",
            description: "",
            timeFrom: "",
            timeTo: ""
        });
        setNewActivityMode(true);
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
                            <TableCell>Akcje</TableCell> {/* New column for actions */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map(activity => (
                            <TableRow key={activity.id} onClick={() => handleRowClick(activity)}>
                                <TableCell>{activity.title}</TableCell>
                                <TableCell>{new Date(activity.timeFrom).toLocaleDateString()}</TableCell>
                                <TableCell>{formatTime(activity.timeFrom)}</TableCell>
                                <TableCell>{formatTime(activity.timeTo)}</TableCell>
                                <TableCell>
                                    <button onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering row click
                                        confirmDelete(activity.id); // Ask for confirmation before deleting
                                    }}>
                                        Usuń
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow onClick={handleNewActivityMode} style={{ cursor: 'pointer', fontWeight: 'bold', textAlign: 'center' }}>
                            <TableCell colSpan={5}>+ Dodaj nową aktywność</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                {(selectedActivity || newActivityMode) && (
                    <div className="details-panel" style={{ flex: 1, marginLeft: '20px' }}>
                        <h2>{newActivityMode ? "Dodaj nową aktywność" : "Szczegóły aktywności"}</h2>
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
                                value={updatedActivity.timeFrom ? new Date(updatedActivity.timeFrom).toISOString().slice(0, 16) : ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Data i godzina zakończenia:</label>
                            <input
                                type="datetime-local"
                                name="timeTo"
                                value={updatedActivity.timeTo ? new Date(updatedActivity.timeTo).toISOString().slice(0, 16) : ""}
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

                        <button onClick={newActivityMode ? handleCreate : handleUpdate}>
                            {newActivityMode ? "Dodaj aktywność" : "Zaktualizuj"}
                        </button>
                    </div>
                )}

                {/* Modal for delete confirmation */}
                {showDeleteModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Czy na pewno chcesz usunąć tę aktywność?</p>
                            <button onClick={handleDeleteConfirm}>Usuń</button>
                            <button onClick={() => setShowDeleteModal(false)}>Anuluj</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Schedule;
