import {AnnouncementItem, ErrorItem, resolveApiError} from '@/hooks';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnnouncementItem[]>,
) {

  const result = await fetch(`${process.env.BACKEND_URL}/announcement`, {
    next: { revalidate: 30 },
  });
  const parsed = await result.json();

  if (!result.ok) {
    resolveApiError(parsed, errorCodes, res);
  }

  res.status(200).json(parsed);
}

const errorCodes: ErrorItem[] = [

]
