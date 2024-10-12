import {NextApiRequest, NextApiResponse} from "next";
import {RegistrationItem} from "@/hooks/useRegistration";
import {RegistrationPartItem} from "@/hooks/useRegistrationPart";
import {ErrorItem, isApiErrorItem, resolveApiError} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegistrationItem | {message: string}>
) {

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/registration`, {
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

]