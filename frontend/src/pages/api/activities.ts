import {ActivityItem, ErrorItem, resolveApiError} from '@/hooks';
import { addDays, subDays } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityItem[]>,
) {

  const { date } = req.query;

  const url = new URL(`${process.env.BACKEND_URL}/activity`);
  if (typeof date === "string") {
    url.searchParams.append('date', date);
  }

  const result = await fetch(url.toString(), {
    next: { revalidate: 600 },
  });
  const parsed = await result.json();

  if (!result.ok) {
    resolveApiError(parsed, errorCodes, res);
  }

  res.status(200).json(parsed);
}

const errorCodes: ErrorItem[] = [

]
