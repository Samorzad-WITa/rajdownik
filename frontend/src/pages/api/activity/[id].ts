import {NextApiRequest, NextApiResponse} from "next";
import {ActivityItem} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ActivityItem>
) {
    if(process.env.DEBUG) {
        return res.status(200).json(item);
    }

    const { id } = req.query;
    const result = await fetch(`${process.env.BACKEND_URL}/activity/${id}`, {
        next: { revalidate: 30 },
    });
    const parsed = await result.json();

    if(!result.ok) {
        return res.status(500).json({
            id: "",
            title: "",
            description: "",
            location: "",
            timeFrom: "",
            timeTo: "",
        });
    }

    res.status(200).json(parsed);
}

const item = {
    id: "74427a7f-8cb1-495b-955b-cf3db7ed39c9",
    title: "Śniadanie",
    description: "Testowy opis",
    location: "Stołówka",
    timeFrom: "2024-04-14T09:30:00",
    timeTo: "2024-04-14T09:30:00",
}