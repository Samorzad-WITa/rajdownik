import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

function Schedule(){

  const activities1 = [
    {
      name: "Integracja I tury",
      date: "18.09",
      start: "15:00",
      end: "17:00",
      edit: "...",
    },
    {
      name: "Obiadokolacja",
      date: "18.09",
      start: "17:00",
      end: "19:00",
      edit: "...",
    },
    {
      name: "Gra nocna I tura",
      date: "18.09",
      start: "19:00",
      end: "21:00",
      edit: "...",
    },
    {
      name: "Gra nocna II tury",
      date: "18.09",
      start: "21:00",
      end: "23:00",
      edit: "...",
    },
    {
      name: "Balanga bezbożników",
      date: "18.09",
      start: "21:00",
      end: "białe rano",
      edit: "...",
    },
  ]
  const activities2 = [
    {
      name: "Chlanch",
      date: "19.09",
      start: "9:00",
      end: "12:00",
      edit: "...",
    },
    {
      name: "rozciąganie przed walką (beer yoga)",
      date: "19.09",
      start: "10:00",
      end: "11:00",
      edit: "...",
    },
    {
      name: "Plażing",
      date: "19.09",
      start: "11:00",
      end: "13:00",
      edit: "...",
    },
    {
      name: "WIELKI TURNIEJ FLANEK",
      date: "18.09",
      start: "21:00",
      end: "23:00",
      edit: "...",
    },
    {
      name: "Piwna potyczka (beer pong)",
      date: "18.09",
      start: "21:00",
      end: "23:00",
      edit: "...",
    },
    {
      name: "WIELKI QUIZ WIEDZY TEOLOGICZNO-OGÓLNEJ",
      date: "18.09",
      start: "21:00",
      end: "23:00",
      edit: "...",
    },
    {
      name: "Balanga bezbożników",
      date: "18.09",
      start: "21:00",
      end: "białe rano",
      edit: "...",
    },
  ]
  //Sorry 3 dnia nie chce mi się pisać, chciałem zobaczyć jak to będzie wyglądać
  const activities3 = [
    {
      name: "Chlanch",
      date: "19.09",
      start: "9:00",
      end: "12:00",
      edit: "...",
    },
    {
      name: "rozciąganie przed walką (beer yoga)",
      date: "19.09",
      start: "10:00",
      end: "11:00",
      edit: "...",
    },
    {
      name: "Plażing",
      date: "19.09",
      start: "11:00",
      end: "13:00",
      edit: "...",
    },
    {
      name: "WIELKI TURNIEJ FLANEK",
      date: "18.09",
      start: "21:00",
      end: "23:00",
      edit: "...",
    },
    {
      name: "Piwna potyczka (beer pong)",
      date: "18.09",
      start: "21:00",
      end: "23:00",
      edit: "...",
    },
    {
      name: "WIELKI QUIZ WIEDZY TEOLOGICZNO-OGÓLNEJ",
      date: "18.09",
      start: "21:00",
      end: "23:00",
      edit: "...",
    },
    {
      name: "Balanga bezbożników",
      date: "18.09",
      start: "21:00",
      end: "białe rano",
      edit: "...",
    },
  ]
  
    return(
        <div className="schedule">
            <h1>Harmonogram jest tutaj</h1>
          

            <h1>Dzień 1</h1>
    <Table>
      <TableHeader>
  
        <TableRow>
        <TableHead className="w-[20%]">Nazwa</TableHead>
          <TableHead className="w-[20%]">Data</TableHead>
          <TableHead className="w-[20%]" >Godzina rozpoczęcia</TableHead>
          <TableHead  className="w-[20%]">godzina zakończenia</TableHead>
          <TableHead className="w-[20%] text-right">+</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities1.map((activity) => (
          <TableRow >
            <TableCell className="w-[20%] text-left">{activity.name}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.date}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.start}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.end}</TableCell>
            <TableCell className="w-[20%] text-right">{activity.edit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
    <h1>Dzień 1</h1>
    <Table>
      <TableHeader>
 
        <TableRow>
        <TableHead className="w-[20%]">Nazwa</TableHead>
          <TableHead className="w-[20%]">Data</TableHead>
          <TableHead className="w-[20%]" >Godzina rozpoczęcia</TableHead>
          <TableHead  className="w-[20%]">godzina zakończenia</TableHead>
          <TableHead className="w-[20%] text-right">+</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities2.map((activity) => (
          <TableRow >
            <TableCell className="w-[20%] text-left">{activity.name}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.date}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.start}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.end}</TableCell>
            <TableCell className="w-[20%] text-right">{activity.edit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
    <h1>Dzień 3</h1>
    <Table>
      <TableHeader>

        <TableRow>
        <TableHead className="w-[20%]">Nazwa</TableHead>
          <TableHead className="w-[20%]">Data</TableHead>
          <TableHead className="w-[20%]" >Godzina rozpoczęcia</TableHead>
          <TableHead  className="w-[20%]">godzina zakończenia</TableHead>
          <TableHead className="w-[20%] text-right">+</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities3.map((activity) => (
          <TableRow >
            <TableCell className="w-[20%] text-left">{activity.name}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.date}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.start}</TableCell>
            <TableCell className="w-[20%] text-left">{activity.end}</TableCell>
            <TableCell className="w-[20%] text-right">{activity.edit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>

        </div>
    )
}
export default Schedule