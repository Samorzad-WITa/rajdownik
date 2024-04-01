import { ContactItem } from '@/hooks';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactItem[]>,
) {
  const result = await fetch(`${process.env.BACKEND_URL}/contact`);
  const parsed = await result.json();

  if (!result.ok) return res.status(500).json([]);

  res.status(200).json(parsed);
}
