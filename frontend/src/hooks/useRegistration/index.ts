import {RegistrationPartItem} from "@/hooks/useRegistrationPart";
import axios from "axios";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {useRouter} from "next/router";

export type RegistrationItem = {
    title: string;
    startTime: string;
    hasPreAccess: boolean;
    parts: RegistrationPartItem[];
};

const fetchRegistration = async (token: string) => {
    const res = await fetch('/api/registration', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    if(res.status === 403) {
        throw new Error('403');
    }

    const parsed = await res.json();
    return parsed as RegistrationItem;
}

const useRegistration = (token: string) => {
    const router = useRouter();
    const query = useQuery<RegistrationItem, Error>({
        queryKey: ['registration'],
        queryFn: () => fetchRegistration(token),
        refetchInterval: 1000,
        retry: 0
    } as UseQueryOptions<RegistrationItem, Error>);

    if(query.isError && (query.error as Error).message === '403') {
        void router.push('/login');
    }

    return query;
}

export { fetchRegistration, useRegistration };