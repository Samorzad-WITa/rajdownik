import { ActivityItem } from '@/hooks';
import { addDays, subDays } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActivityItem[]>,
) {
  if (process.env.DEBUG) return res.status(200).json(generateItems());

  const { date } = req.query;

  const url = new URL(`${process.env.BACKEND_URL}/activity`);
  if (typeof date === "string") {
    url.searchParams.append('date', date);
  }

  console.log(url.toString());

  const result = await fetch(url.toString(), {
    next: { revalidate: 600 },
  });
  const parsed = await result.json();

  if (!result.ok) return res.status(500).json([]);

  res.status(200).json(parsed);
}

const generateItems = () => {
  const items: ActivityItem[] = [];

  for (let i = 0; i < 8; i++) {
    items.push({
      id: `${i}`,
      title: `Wydarzenie ${i}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Sala XYZ',
      timeFrom: '',
      timeTo: '',
    });
  }

  // zeroth index is the newest activity
  items.reverse();

  const today = new Date();
  const yesterday = subDays(today, 1);
  const tomorrow = addDays(today, 1);

  const todayISO = today.toISOString();
  const yesterdayISO = yesterday.toISOString();
  const tomorrowISO = tomorrow.toISOString();

  for (let i = 0; i < 3; i++) {
    items[i]!.timeFrom = tomorrowISO;
    items[i]!.timeTo = tomorrowISO;
  }

  for (let i = 3; i < 7; i++) {
    items[i]!.timeFrom = todayISO;
    items[i]!.timeTo = todayISO;
  }

  for (let i = 7; i < 8; i++) {
    items[i]!.timeFrom = yesterdayISO;
    items[i]!.timeTo = yesterdayISO;
  }

  return items;
};
