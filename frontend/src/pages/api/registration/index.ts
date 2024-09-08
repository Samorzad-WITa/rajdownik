import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationItem} from "@/hooks/useRegistration";
import {RegistrationPartItem} from "@/hooks/useRegistrationPart";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegistrationItem>
) {
    const result = await fetch(`${process.env.BACKEND_URL}/registration`, {
        headers: {
            Authorization: req.headers['authorization'],
        },
        next: { validate: 30 },
    });

    const parsed = await result.json();
    if(!result.ok) return res.status(500).json({
        title: '',
        startTime: '',
        parts: []
    });

    res.status(200).json(parsed);
}