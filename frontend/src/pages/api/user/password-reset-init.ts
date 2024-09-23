import {NextApiRequest, NextApiResponse} from "next";
import {ErrorItem, isApiErrorItem, RegistrationEntryItem, RegistrationPartItem, resolveApiError} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{message: string}>
){
    const headers: HeadersInit = {};
    headers['Content-Type'] = 'application/json';

    const result = await fetch(`${process.env.BACKEND_URL}/user/password-reset-init`, {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body),
        next: { revalidate: 30 },
    });
    const parsed = await result.json().catch(() => ({}));

    if(!result.ok) {
        resolveApiError(parsed, errorCodes, res);
    }

    res.status(200).json({message: "Widomość wysłana"});
}

const errorCodes: ErrorItem[] = [

]