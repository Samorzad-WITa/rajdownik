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

const fetchAnnouncement = async (id: string | undefined) => {
  const res = await fetch(`/api/announcement/${id}`);
  const parsed = await res.json();

  return parsed as AnnouncementItem;
}

const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => fetchAnnouncements(),
  });
};

const useAnnouncement = (id: string | undefined) => {
  return useQuery({
    queryKey: ['announcement'],
    queryFn: () => fetchAnnouncement(id)
  });
}

export { fetchAnnouncements, useAnnouncements, fetchAnnouncement, useAnnouncement };
