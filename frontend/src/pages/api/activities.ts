import { ActivityItem } from '@/hooks';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityItem[]>,
) {
  const result = await fetch(`${process.env.BACKEND_URL}/activity`);
  const parsed = await result.json();

  return res.status(200).json(items);

  if (!result.ok) return res.status(500).json([]);

  res.status(200).json(parsed);
}

const items = [
  {
    id: '7',
    title: 'Wydarzenie 7',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 1',
    timeFrom: '2024-03-31T22:35:32.686Z',
    timeTo: '2024-04-30T23:35:32.686Z',
  },
  {
    id: '6',
    title: 'Wydarzenie 6',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 2',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: '5',
    title: 'Wydarzenie 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: '4',
    title: 'Wydarzenie 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: '3',
    title: 'Wydarzenie 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: '2',
    title: 'Wydarzenie 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: '1',
    title: 'Wydarzenie 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
];
