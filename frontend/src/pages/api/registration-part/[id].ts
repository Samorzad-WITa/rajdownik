import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationPartItem} from "@/hooks/useRegistrationPart";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegistrationPartItem>
) {
    const { id } = req.query;

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/registration-part/${id}`, {
        headers,
        next: { revalidate: 30 },
    });
    const parsed = await result.json();

    if(!result.ok) {
        return res.status(500).json({
            id: '',
            lock: {
                expiresAt: ''
            },
            ownsLock: false,
            title: '',
            entryLimit: 0,
            locked: false,
            entryAmount: 0,
            entries: []
        });
    }

    res.status(200).json(parsed);
}