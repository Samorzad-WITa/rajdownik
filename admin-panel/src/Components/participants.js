import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/table"
  

function Participants(){

    return(
<div>

    

<div className="participants">
        <h1>Tutaj znajdują się uczestnicy!</h1>
        <Table>
  <TableCaption>Lista uczestników.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Imię</TableHead>
      <TableHead className="w-[100px]">Nazwisko</TableHead>
      <TableHead className="w-[100px]">Numer</TableHead>
      <TableHead className="w-[100px]">E-mail</TableHead>
      <TableHead className="w-[100px]">Dieta</TableHead>
      <TableHead className="w-[100px]">Transport</TableHead>
      <TableHead className="w-[100px]">Koszulka</TableHead>
      <TableHead className="w-[100px]">Numer domku</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className=" w-[100px]">Amelia</TableCell>
      <TableCell className=" w-[100px]">Sroczyńska</TableCell>
      <TableCell className=" w-[100px]">123 456 789</TableCell>
      <TableCell className=" w-[100px]">fajnyemail@mail.net</TableCell>
      <TableCell className=" w-[100px]">Mięsna</TableCell>
      <TableCell className=" w-[100px]">Autokar tura 1</TableCell>
      <TableCell className=" w-[100px]">M</TableCell>
      <TableCell className=" w-[100px]">96</TableCell>
    </TableRow> 
    <TableRow>
      <TableCell className=" w-[100px]">Hubert</TableCell>
      <TableCell className=" w-[100px]">Tański</TableCell>
      <TableCell className=" w-[100px]">473 456 789</TableCell>
      <TableCell className=" w-[100px]">żelowyemail@mail.net</TableCell>
      <TableCell className=" w-[100px]">wege</TableCell>
      <TableCell className=" w-[100px]">Autokar tura 1</TableCell>
      <TableCell className=" w-[100px]">M</TableCell>
      <TableCell className=" w-[100px]">96</TableCell>
    </TableRow>
  </TableBody>
</Table>

        </div>
</div>
    )
}
export default Participants