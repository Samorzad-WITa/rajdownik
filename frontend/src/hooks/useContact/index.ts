import { useQuery } from '@tanstack/react-query';

export type ContactItem = {
  id: string,
  user: {
    phoneNumber: string,
    firstName: string,
    lastName: string
  },
  label: string,
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
