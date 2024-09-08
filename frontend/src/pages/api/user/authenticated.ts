import {NextApiRequest, NextApiResponse} from "next";
import {UserItem} from "@/hooks/useUser";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserItem>
){
    if(process.env.DEBUG) return res.status(200).json(userMock);

    const result = await fetch(`${process.env.BACKEND_URL}/user/authenticated`, {
        headers: {
            Authorization: req.headers['authorization'],
        },
        next: {
            revalidate: 30
        },
    });

    const parsed = await result.json();

    if(!result.ok) return res.status(500).json(emptyUser);

    res.status(200).json(parsed);
}

const userMock = {
    id: '238bdf45-c2a0-4feb-811f-18572227c3b3',
    email: 'dominik.pokrzywa@gmail.com',
    firstName: 'Dominik',
    lastName: 'Pokrzywa',
    roomNumber: '12',
    dietType: 'Mięsna',
    busNumber: 'Tura I',
}

const emptyUser = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    roomNumber: '',
    dietType: '',
    busNumber: '',
}
