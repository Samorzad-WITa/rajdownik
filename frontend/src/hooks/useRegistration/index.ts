import {RegistrationPartItem} from "@/hooks/useRegistrationPart";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export type RegistrationItem = {
    title: string;
    startTime: string;
    parts: RegistrationPartItem[];
};

const fetchRegistration = async (token: string) => {
    const res = await fetch('/api/registration', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const parsed = await res.json();

    return parsed as RegistrationItem;
}

const useRegistration = (token: string) => {
    return useQuery({
        queryKey: ['registration'],
        queryFn: () => fetchRegistration(token),
        refetchInterval: 1000
    });
}

export { fetchRegistration, useRegistration };