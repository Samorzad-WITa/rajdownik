import { useQuery } from '@tanstack/react-query';

export type AnnouncementItem = {
  id: number;
  title: string;
  description: string;
};

const fetchAnnouncements = async (limit = 10) => {
  const res = await fetch('/api/announcements');
  const parsed = await res.json();

  return parsed;
  // return parsed.filter((x: any) => x.id <= limit);
};

const useAnnouncements = (limit: number) => {
  return useQuery({
    queryKey: ['announcements', limit],
    queryFn: () => fetchAnnouncements(limit),
  });
};

export { useAnnouncements, fetchAnnouncements };
