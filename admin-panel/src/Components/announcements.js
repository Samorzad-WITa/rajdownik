import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/announcements.css'; 

function Announcements({ token }) {
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({ id: '', title: '', description: '' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);

    const getAnnouncements = async (token) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.get('http://localhost:1133/announcement', config);
            setAnnouncements(response.data);
            console.log(JSON.stringify(response.data))
        } catch (error) {
            setError('Błąd podczas uzyskiwania ogłoszeń: ' + (error.response ? error.response.data : error.message));
        }
    };

    const saveAnnouncement = async () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        
        try {
            if (newAnnouncement.id) {
                await axios.put(`http://localhost:1133/announcement/${newAnnouncement.id}`, newAnnouncement, config);
            } else {
                await axios.post('http://localhost:1133/announcement', newAnnouncement, config);
            }
            getAnnouncements(token);
            setIsModalOpen(false);
            setNewAnnouncement({ id: '', title: '', description: '' });
        } catch (error) {
            setError('Błąd podczas zapisywania ogłoszenia: ' + (error.response ? error.response.data : error.message));
        }
    };

    const deleteAnnouncement = async () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        
        try {
            await axios.delete(`http://localhost:1133/announcement/${announcementToDelete}`, config);
            getAnnouncements(token);
            setIsDeleteModalOpen(false);
            setAnnouncementToDelete(null);
        } catch (error) {
            setError('Błąd podczas usuwania ogłoszenia: ' + (error.response ? error.response.data : error.message));
        }
    };

    useEffect(() => {
        if (token) {
            getAnnouncements(token);
        }
    }, [token]);

    const openEditModal = (announcement) => {
        setNewAnnouncement(announcement);
        setIsModalOpen(true);
    };

    const openDeleteModal = (id) => {
        setAnnouncementToDelete(id);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="announcements">
         
            <ul>
            <button className="add-announcement-button" onClick={() => setIsModalOpen(true)}>Dodaj ogłoszenie</button>
                {announcements.map((announcement) => (
                    <li key={announcement.id} className="announcement-card">
                        <div className='announcementDiv' onClick={() => openEditModal(announcement)}>
                            <h2>{announcement.title}</h2>
                            <p>{announcement.description}</p>
                        </div>
                        <button className="delete-button" onClick={(e) => { e.stopPropagation(); openDeleteModal(announcement.id); }}>X</button>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{newAnnouncement.id ? 'Edytuj ogłoszenie' : 'Dodaj nowe ogłoszenie'}</h2>
                        <input
                            type="text"
                            placeholder="Tytuł"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Opis"
                            value={newAnnouncement.description}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                        />
                        <button onClick={saveAnnouncement}>
                            {newAnnouncement.id ? 'Zapisz zmiany' : 'Zapisz ogłoszenie'}
                        </button>
                        <button onClick={() => setIsModalOpen(false)}>Anuluj</button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Czy na pewno chcesz usunąć to ogłoszenie?</h2>
                        <button onClick={deleteAnnouncement}>Tak, usuń</button>
                        <button onClick={() => setIsDeleteModalOpen(false)}>Anuluj</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Announcements;