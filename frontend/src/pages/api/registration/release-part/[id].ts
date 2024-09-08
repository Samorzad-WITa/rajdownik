import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationEntryItem, RegistrationLockItem, RegistrationPartItem} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
){
    const { id } = req.query;

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/registration/release-part/${id}`, {
        method: 'POST',
        headers,
        next: { revalidate: 30 },
    });

    if(!result.ok) {
        const parsed = await result.json();
        return res.status(500).send(parsed.message);
    }

    res.status(200).send("");
}