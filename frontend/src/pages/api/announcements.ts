import { AnnouncementItem } from '@/hooks';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnnouncementItem[]>,
) {
  const result = await fetch(`${process.env.BACKEND_URL}/announcement`);
  const parsed = await result.json();

  res.status(200).json(parsed);
}
