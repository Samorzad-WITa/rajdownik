import {NextApiRequest, NextApiResponse} from "next";
import {ErrorItem, RegistrationEntryItem, RegistrationPartItem, resolveApiError} from "@/hooks";

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
        resolveApiError(parsed, errorCodes, res);
    }

    res.status(200).json(parsed);
}

const errorCodes: ErrorItem[] = [
    {
        apiCode: 'user_already_owns_a_lock',
        message: 'Blokujesz już inny domek'
    }
]