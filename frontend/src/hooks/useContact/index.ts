import { useQuery } from '@tanstack/react-query';
import {UserItem} from "@/hooks/useUser";

export type ContactItem = {
  id: string,
  user: UserItem,
  label: string,
  groupName: string,
  contactType: string,
};

const fetchContact = async () => {
  const res = await fetch('/api/contact');
  const parsed = await res.json();

  return parsed as ContactItem[];
};

const useContact = () => {
  return useQuery({
    queryKey: ['contact'],
    queryFn: () => fetchContact(),
  });
};

export { fetchContact, useContact };
