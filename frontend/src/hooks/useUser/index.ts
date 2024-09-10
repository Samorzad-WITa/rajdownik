import {useQuery} from "@tanstack/react-query";


export type UserItem = {
    id: string;
    email: string;
    code: string;
    firstName: string;
    lastName: string;
    roomNumber: string;
    dietType: string;
    busNumber: string;
}

const fetchAuthenticatedUser = async (token: string) => {
    const res = await fetch('/api/user/authenticated', {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
    const parsed = await res.json();
    console.log(parsed);
    return parsed as UserItem;
}

const useAuthenticatedUser = (token: string) => {
    return useQuery({
        queryKey: ['authenticatedUser'],
        queryFn: () => fetchAuthenticatedUser(token)
    });
};

export { useAuthenticatedUser };