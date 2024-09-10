import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationEntryItem, RegistrationPartItem} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
){
    const headers: HeadersInit = {};
    headers['Content-Type'] = 'application/json';

    const result = await fetch(`${process.env.BACKEND_URL}/user/password-reset`, {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body),
        next: { revalidate: 30 },
    });
    const parsed = await result.json().catch(() => ({}));

    if(!result.ok) {
        return res.status(500).send(parsed.message);
    }

    res.status(204).end();
}