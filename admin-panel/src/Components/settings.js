import React from "react";
import Switch from "./switch";
import { Slider } from "./ui/slider"

function Settings(){

    return(
        <div className="setting" >
            <h1>Ustawienia to tu</h1>
            <div className="switchSetting">
            Basic ustawienie z switchem     
            <Switch/>
            <h1 style={{paddingBottom:"1rem"}}>Mega fajne ustawienia z sliderem</h1>
            <Slider defaultValue={[33]} max={100} step={1} />
            </div>
            Specjalnie nie piszę tego w komentarzu, bo cała strona jest na razie poglądowa
            jak widać slider i switch są zaimplementowane, jak pojawi się coś do ustawiania to będzie można wykorzystać

        </div>
    )
}
export default Settings