import {useQuery} from "@tanstack/react-query";

export type RegistrationPartItem = {
    id: string;
    title: string;
    entryLimit: number;
    locked: boolean;
    entryAmount: number;
    entries: RegistrationEntryItem[];
    lock: RegistrationLockItem;
    ownsLock: boolean;
};

export type RegistrationEntryItem = {
    id: string;
    firstName: string;
    lastName: string;
    canDelete: boolean;
}

export type RegistrationLockItem = {
    expiresAt: string;
}

const fetchRegistrationPart = async (id: string, token:string) => {
    const res = await fetch(`/api/registration-part/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const parsed = await res.json();

    return parsed as RegistrationPartItem;
}

const useRegistrationPart = (id: string, enabled: boolean, token:string) => {
    return useQuery({
        queryKey: ['registration-part'],
        queryFn: () => fetchRegistrationPart(id, token),
        enabled: enabled
    });
}

export { useRegistrationPart, fetchRegistrationPart };