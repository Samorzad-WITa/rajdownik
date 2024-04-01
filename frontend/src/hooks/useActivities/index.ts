import { useQuery } from '@tanstack/react-query';

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  timeFrom: string;
  timeTo: string;
};

const fetchActivities = async () => {
  const res = await fetch('/api/activities');
  const parsed = await res.json();

  return parsed as ActivityItem[];
};

const useActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => fetchActivities(),
  });
};

export { fetchActivities, useActivities };
