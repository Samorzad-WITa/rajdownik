import { AnnouncementItem } from '@/hooks';
import type { NextApiRequest, NextApiResponse } from 'next';
import {AuthenticationItem} from "@/hooks/useAuthentication";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthenticationItem>,
) {

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    headers['Content-Type'] = 'application/json';

    if (process.env.DEBUG) return res.status(200).json(items);
    console.log(req.body);
    const result = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(req.body),
        body: JSON.stringify(req.body),
        next: { revalidate: 30 },
    });
    const parsed = await result.json();

    if (!result.ok) return res.status(500).json({
        token: 'test token',
        expiresIn: 1234
    });

    res.status(200).json(parsed);
}

const items = {
    token: 'test token',
    expiresIn: 12314
};
