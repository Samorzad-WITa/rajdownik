import {NextApiRequest, NextApiResponse} from "next";
import {
    ErrorItem,
    isApiErrorItem,
    RegistrationEntryItem,
    RegistrationLockItem,
    RegistrationPartItem,
    resolveApiError
} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ message: string }>
){
    const { id } = req.query;

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/registration/remove-entry/${id}`, {
        method: 'DELETE',
        headers,
        next: { revalidate: 30 },
    });

    const parsed = await result.json();

    if(!result.ok) {
        resolveApiError(parsed, errorCodes, res);
    }

    res.status(200).send({message: 'OK'});
}

const errorCodes: ErrorItem[] = [

]