import {NextApiRequest, NextApiResponse} from "next";
import {AnnouncementItem, ErrorItem, resolveApiError} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AnnouncementItem>
) {

    const { id } = req.query;
    const result = await fetch(`${process.env.BACKEND_URL}/announcement/${id}`, {
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