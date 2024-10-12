import {NextApiRequest, NextApiResponse} from "next";
import {UserItem} from "@/hooks/useUser";
import {ApiErrorItem, ErrorItem, resolveApiError} from "@/hooks";
import {ApiError} from "next/dist/server/api-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserItem | {message: string}>
){
    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/user/authenticated`, {
        headers,
        next: {
            revalidate: 30
        },
    });
    const parsed = await result.json();

    if(!result.ok) {
        resolveApiError(parsed, errorCodes, res);
    }

    res.status(200).json(parsed);
}

const errorCodes: ErrorItem[] = [

]
