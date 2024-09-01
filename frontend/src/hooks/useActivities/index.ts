import {useQuery} from '@tanstack/react-query';

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  timeFrom: string;
  timeTo: string;
};

const fetchActivities = async (referenceDate: string) => {

  const res = await fetch(`/api/activities?date=${referenceDate}`);
  const parsed = await res.json();

  return parsed as ActivityItem[];
};

const useActivities = (date: string) => {
  return useQuery({
    queryKey: ['activities', date],
    queryFn: () => fetchActivities(date),
  });
};

export { fetchActivities, useActivities };
