import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {useRouter} from "next/router";


export type UserItem = {
    id: string;
    email: string;
    code: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roomNumber: string;
    profileUrl: string;
    dietType: string;
    busNumber: string;
}

const fetchAuthenticatedUser = async (token: string) => {
    const res = await fetch('/api/user/authenticated', {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
    if(res.status === 403) {
        throw new Error('403');
    }
    const parsed = await res.json();
    return parsed as UserItem;
}

const useAuthenticatedUser = (token: string) => {
    const router = useRouter();
    const query = useQuery<UserItem, Error>({
        queryKey: ['authenticatedUser'],
        queryFn: () => fetchAuthenticatedUser(token),
        retry: 0,
    } as UseQueryOptions<UserItem, Error>);

    if(query.isError && (query.error as Error).message === '403') {
        void router.push('/login');
    }

    return query;
};

export { useAuthenticatedUser };