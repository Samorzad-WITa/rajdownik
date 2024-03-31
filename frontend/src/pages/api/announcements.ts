// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const result = await fetch(`${process.env.BACKEND_URL}/announcement`);
  const parsed = await result.json();

  res.status(200).json(parsed);
}
