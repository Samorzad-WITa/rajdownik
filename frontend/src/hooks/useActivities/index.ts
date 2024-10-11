import {useQuery} from '@tanstack/react-query';
import {ActivityRegistrationItem} from "@/hooks";

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  timeFrom: string;
  timeTo: string;
  activityRegistration: ActivityRegistrationItem;
};

const fetchActivities = async (referenceDate: string) => {
  const res = await fetch(`/api/activities?date=${referenceDate}`);
  const parsed = await res.json();

  return parsed as ActivityItem[];
};

const fetchActivity = async (id: string) => {
  const res = await fetch(`/api/activity/${id}`);
  const parsed = await res.json();

  return parsed as ActivityItem;
}

const useActivities = (date: string) => {
  return useQuery({
    queryKey: ['activities', date],
    queryFn: () => fetchActivities(date),
  });
};

const useActivity = (id: string) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => fetchActivity(id)
  });
}

export { fetchActivities, useActivities, useActivity };
