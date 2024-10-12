import type { NextApiRequest, NextApiResponse } from 'next';
import {AuthenticationItem} from "@/hooks/useAuthentication";
import {ApiErrorItem, ErrorItem, isApiErrorItem, resolveApiError} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthenticationItem | {message: string}>,
) {

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    headers['Content-Type'] = 'application/json';

    const result = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
        apiCode: 'password_hash_not_present',
        message: 'Konto nieaktywne. Zarejestruj się za pomocą funkcji odzyskiwania hasła'
    },
    {
        apiCode: 'user_not_found',
        message: 'Błędny email lub hasło'
    },
    {
        apiCode: 'wrong_password',
        message: 'Błędny email lub hasło'
    }
]
