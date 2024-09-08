import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationEntryItem, RegistrationPartItem} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegistrationEntryItem>
){
    const { id } = req.query;
    const result = await fetch(`${process.env.BACKEND_URL}/registration/register-entry/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers['authorization']
        },
        body: JSON.stringify(req.body),
        next: { revalidate: 30 },
    });
    const parsed = await result.json();

    if(!result.ok) {
        return res.status(500).send(parsed.message);
    }

    res.status(200).json(parsed);
}