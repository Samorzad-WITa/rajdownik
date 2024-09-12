import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Announcements({ token }) {
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Stan dla modal
    const [newAnnouncement, setNewAnnouncement] = useState({ id: '', title: '', description: '' }); // Stan dla nowego ogłoszenia
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Stan dla modal usunięcia
    const [announcementToDelete, setAnnouncementToDelete] = useState(null); // Ogłoszenie do usunięcia

    // Funkcja do pozyskiwania ogłoszeń
    const getAnnouncements = async (token) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.get('http://localhost:1133/announcement', config);
            setAnnouncements(response.data); // Ustawiamy ogłoszenia w stanie
            console.log(JSON.stringify(response.data))
        } catch (error) {
            setError('Błąd podczas uzyskiwania ogłoszeń: ' + (error.response ? error.response.data : error.message));
        }
    };

    // Funkcja do dodawania lub edytowania ogłoszenia
    const saveAnnouncement = async () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        
        try {
            if (newAnnouncement.id) {
                // Jeśli id istnieje, edytujemy ogłoszenie
                await axios.put(`http://localhost:1133/announcement/${newAnnouncement.id}`, newAnnouncement, config);
            } else {
                // W przeciwnym razie dodajemy nowe ogłoszenie
                await axios.post('http://localhost:1133/announcement', newAnnouncement, config);
            }
            getAnnouncements(token); // Odświeżamy listę ogłoszeń po dodaniu lub edytowaniu
            setIsModalOpen(false); // Zamykamy modal
            setNewAnnouncement({ id: '', title: '', description: '' }); // Czyścimy formularz
        } catch (error) {
            setError('Błąd podczas zapisywania ogłoszenia: ' + (error.response ? error.response.data : error.message));
        }
    };

    // Funkcja do usuwania ogłoszenia
    const deleteAnnouncement = async () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        
        try {
            await axios.delete(`http://localhost:1133/announcement/${announcementToDelete}`, config);
            getAnnouncements(token); // Odświeżamy listę ogłoszeń po usunięciu
            setIsDeleteModalOpen(false); // Zamykamy modal
            setAnnouncementToDelete(null); // Resetujemy ogłoszenie do usunięcia
        } catch (error) {
            setError('Błąd podczas usuwania ogłoszenia: ' + (error.response ? error.response.data : error.message));
        }
    };

    // Używamy useEffect, aby pobrać ogłoszenia po załadowaniu komponentu
    useEffect(() => {
        if (token) {
            getAnnouncements(token);
        }
    }, [token]);

    // Funkcja do otwierania modal z danymi ogłoszenia do edycji
    const openEditModal = (announcement) => {
        setNewAnnouncement(announcement);
        setIsModalOpen(true);
    };

    // Funkcja do otwierania modal do potwierdzenia usunięcia
    const openDeleteModal = (id) => {
        setAnnouncementToDelete(id);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="announcements">
            <h1>Ogłoszenia są tutaj!</h1>

            {/* Przycisk do otwarcia panelu */}
            <button onClick={() => setIsModalOpen(true)}>Dodaj ogłoszenie</button>

            {/* Lista ogłoszeń */}
            <ul>
                {announcements.map((announcement) => (
                    <li key={announcement.id}>
                        <div className='announcementDiv' onClick={() => openEditModal(announcement)}>
                            <h2>{announcement.title}</h2>
                            <p>{announcement.description}</p>
                            <button className="deleteAnouncementButton" onClick={(e) => { e.stopPropagation(); openDeleteModal(announcement.id); }} className="delete-button">X</button>
                        </div>
                      
                    </li>
                ))}
            </ul>

            {/* Panel modal do dodawania lub edytowania ogłoszenia */}
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

            {/* Panel modal do potwierdzenia usunięcia ogłoszenia */}
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
