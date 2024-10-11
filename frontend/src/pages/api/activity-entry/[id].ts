import {NextApiRequest, NextApiResponse} from "next";
import {AnnouncementItem, ErrorItem, resolveApiError} from "@/hooks";
import {ActivityEntryItem} from "@/hooks/useActivityEntry";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ActivityEntryItem | {message: string}>
) {

    const { id } = req.query;

    const authorizationHeader = req.headers['authorization'] as string | undefined;

    const headers: HeadersInit = {};
    if(authorizationHeader) {
        headers['Authorization'] = authorizationHeader;
    }

    const result = await fetch(`${process.env.BACKEND_URL}/activity-entry/${id}`, {
        next: { revalidate: 30 },
        headers: headers
    });
    const parsed = await result.json();

    if(!result.ok) {
        resolveApiError(parsed, errorCodes, res);
    }

    res.status(200).json(parsed);
}

const errorCodes: ErrorItem[] = [

]