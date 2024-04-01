import { AnnouncementItem } from '@/hooks';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnnouncementItem[]>,
) {
  const result = await fetch(`${process.env.BACKEND_URL}/announcement`);
  const parsed = await result.json();

  return res.status(200).json(items);

  if (!result.ok) return res.status(500).json([]);

  res.status(200).json(parsed);
}

const items = [
  {
    id: '7',
    title: 'Ogłoszenie 7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae convallis ante. Donec eget metus in nisl vestibulum pulvinar. In convallis cursus augue nec pretium. Sed blandit mi ex, sed vestibulum tortor ullamcorper ut. Maecenas ullamcorper vehicula accumsan. Donec eu mi id neque imperdiet sollicitudin. Pellentesque porta ornare velit in maximus. Proin posuere lectus sit amet posuere suscipit. ',
  },
  {
    id: '6',
    title: 'Ogłoszenie 6',
    description: 'Opis ogłoszenia 6',
  },
  {
    id: '5',
    title: 'Ogłoszenie 5',
    description: 'Opis ogłoszenia 5',
  },
  {
    id: '4',
    title: 'Ogłoszenie 4',
    description: 'Opis ogłoszenia 4',
  },
  {
    id: '3',
    title: 'Ogłoszenie 3',
    description: 'Opis ogłoszenia 3',
  },
  {
    id: '2',
    title: 'Ogłoszenie 2',
    description: 'Opis ogłoszenia 2',
  },
  {
    id: '1',
    title: 'Ogłoszenie 1',
    description: 'Opis ogłoszenia 1',
  },
];
