import { ContactItem } from '@/hooks';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactItem[]>,
) {
  const result = await fetch(`${process.env.BACKEND_URL}/contact`, {
    next: { revalidate: 600 },
  });
  const parsed = await result.json();

  return res.status(200).json(items);

  if (!result.ok) return res.status(500).json([]);

  res.status(200).json(parsed);
}

const items = [
  {
    id: '7',
    name: 'Imię Nazwisko 7',
    role: 'Rola 7',
    phone: '123456789',
  },
  {
    id: '6',
    name: 'Imię Nazwisko 6',
    role: 'Rola 6',
    phone: '123456789',
  },
  {
    id: '5',
    name: 'Imię Nazwisko 5',
    role: 'Rola 5',
    phone: '123456789',
  },
  {
    id: '4',
    name: 'Imię Nazwisko 4',
    role: 'Rola 4',
    phone: '123456789',
  },
  {
    id: '3',
    name: 'Imię Nazwisko 3',
    role: 'Rola 3',
    phone: '123456789',
  },
  {
    id: '2',
    name: 'Imię Nazwisko 2',
    role: 'Rola 2',
    phone: '123456789',
  },
  {
    id: '1',
    name: 'Imię Nazwisko 1',
    role: 'Rola 1',
    phone: '123456789',
  },
];
