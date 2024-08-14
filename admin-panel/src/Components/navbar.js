import React from "react";

function Navbar(){
    return(<div className="navbar">
        <a className="nav-button" href="/participants">Uczestnicy</a>
        <a className="nav-button" href="/announcements">Ogłoszenia</a>
        <a className="nav-button" href="/schedule">Harmonogram</a>
        <a className="nav-button" href="/staff">Sztab</a>
        <a className="nav-button" href="/settings">Ustawienia</a>
    </div>)
}

export default Navbar