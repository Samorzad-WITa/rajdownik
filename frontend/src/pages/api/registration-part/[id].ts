import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationPartItem} from "@/hooks/useRegistrationPart";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegistrationPartItem>
) {
    const { id } = req.query;
    const result = await fetch(`${process.env.BACKEND_URL}/registration-part/${id}`, {
        headers: {
            'Authorization': req.headers['authorization']
        },
        next: { revalidate: 30 },
    });
    const parsed = await result.json();

    if(!result.ok) {
        return res.status(500).json({
            id: '',
            title: '',
            entryLimit: '',
            isLocked: '',
            entryAmount: '',
            entries: []
        });
    }

    res.status(200).json(parsed);
}