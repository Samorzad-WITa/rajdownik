import {NextApiRequest, NextApiResponse} from "next";
import {ErrorItem, RegistrationEntryItem, RegistrationPartItem, resolveApiError} from "@/hooks";
import {UserItem} from "@/hooks/useUser";
import {ActivityEntryItem} from "@/hooks/useActivityEntry";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ActivityEntryItem | {message:string}>
){
    const { id } = req.query;

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    headers['Content-Type'] = 'application/json';
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/activity-registration/${id}`, {
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
        apiCode: 'team_name_already_taken',
        message: 'Nazwa drużyny jest zajęta'
    },
    {
        apiCode: 'user_not_found',
        message: 'Nie znaleziono podanego użytkownika'
    },
    {
        apiCode: 'user_already_registered',
        message: 'Jeden z użytkowników jest już zarejestrowany'
    },
]