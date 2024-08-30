import {NextApiRequest, NextApiResponse} from "next";
import {AnnouncementItem} from "@/hooks";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AnnouncementItem>
) {
    if(process.env.DEBUG) {
        return res.status(200).json(item);
    }

    const { id } = req.query;
    const result = await fetch(`${process.env.BACKEND_URL}/announcement/${id}`, {
        next: { revalidate: 30 },
    });
    const parsed = await result.json();

    if(!result.ok) {
        return res.status(500).json({
            id: '',
            title: '',
            description: ''
        });
    }

    res.status(200).json(parsed);
}

const item = {
    id: '7',
    title: 'Ogłoszenie 7',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae convallis ante. Donec eget metus in nisl vestibulum pulvinar. In convallis cursus augue nec pretium. Sed blandit mi ex, sed vestibulum tortor ullamcorper ut. Maecenas ullamcorper vehicula accumsan. Donec eu mi id neque imperdiet sollicitudin. Pellentesque porta ornare velit in maximus. Proin posuere lectus sit amet posuere suscipit. ',
}