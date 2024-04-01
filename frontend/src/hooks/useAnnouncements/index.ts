import { useQuery } from '@tanstack/react-query';

export type AnnouncementItem = {
  id: string;
  title: string;
  description: string;
};

const fetchAnnouncements = async () => {
  const res = await fetch('/api/announcements');
  const parsed = await res.json();

  return parsed as AnnouncementItem[];
};

const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => fetchAnnouncements(),
  });
};

export { fetchAnnouncements, useAnnouncements };
