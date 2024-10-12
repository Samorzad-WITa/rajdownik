import {NextApiRequest, NextApiResponse} from "next";
import {ActivityItem, ActivityRegistrationItem, ErrorItem, resolveApiError} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ActivityRegistrationItem | { message: string }>
) {
    const { id } = req.query;
    const result = await fetch(`${process.env.BACKEND_URL}/activity-registration/${id}`, {
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