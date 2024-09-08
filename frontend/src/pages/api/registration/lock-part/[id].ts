import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationEntryItem, RegistrationPartItem} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegistrationEntryItem>
){
    const { id } = req.query;

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    headers['Content-Type'] = 'application/json';
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/registration/lock-part/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body),
        next: { revalidate: 30 },
    });
    const parsed = await result.json();

    if(!result.ok) {
        return res.status(500).send(parsed.message);
    }

    res.status(200).json(parsed);
}