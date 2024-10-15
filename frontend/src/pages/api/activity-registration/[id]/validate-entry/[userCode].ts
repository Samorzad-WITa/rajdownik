import {NextApiRequest, NextApiResponse} from "next";
import {ErrorItem, RegistrationEntryItem, RegistrationPartItem, resolveApiError} from "@/hooks";
import {UserItem} from "@/hooks/useUser";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserItem | {message:string}>
){
    const { id, userCode } = req.query;

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    headers['Content-Type'] = 'application/json';
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/activity-registration/${id}/validate-entry/${userCode}`, {
        method: 'POST',
        headers,
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
        apiCode: 'user_not_found',
        message: 'Nie znaleziono użytkownika o podanym kodzie'
    },
    {
        apiCode: 'user_already_registered',
        message: 'Użytkownik jest już zapisany'
    },
]