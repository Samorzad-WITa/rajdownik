import {useQuery} from "@tanstack/react-query";

export type ActivityRegistrationItem = {
    id: string;
    title: string;
    teamSizeLimit: number;
    termsAndRulesUrl: string;
    active: boolean;
    requireFullTeam: boolean;
    startTime: string;
}

const fetchActivityRegistrations = async () => {
    const res = await fetch("/api/activity-registration");
    const parsed = await res.json();

    return parsed as ActivityRegistrationItem[];
}

const fetchActivityRegistration = async (id: string | string[] | undefined, token: string) => {
    const res = await fetch(`/api/activity-registration/${id}`);
    const parsed = await res.json();

    return parsed as ActivityRegistrationItem;
}

const useActivityRegistrations = () => {
    return useQuery({
        queryKey: ['activityRegistrations'],
        queryFn: () => fetchActivityRegistrations(),
    });
};

const useActivityRegistration = (id: string | string[] | undefined, enabled: boolean = true, token: string)  => {
    return useQuery({
        queryKey: ['activityRegistration'],
        queryFn: () => fetchActivityRegistration(id, token),
        enabled: enabled
    })
}

export { fetchActivityRegistrations, useActivityRegistrations, useActivityRegistration, fetchActivityRegistration };