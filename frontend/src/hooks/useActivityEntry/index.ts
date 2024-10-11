import {UserItem} from "@/hooks/useUser";
import {ActivityRegistrationItem} from "@/hooks";
import {useQuery} from "@tanstack/react-query";

export type ActivityEntryItem = {
    teamName: string;
    teamCaptain: UserItem;
    activityRegistration: ActivityRegistrationItem;
    users: ActivityEntryUserItem[];
}

export type ActivityEntryUserItem = {
    user: UserItem;
}

const fetchActivityEntry = async (token: string, registrationId: string | string[]) => {
    const res = await fetch(`/api/activity-entry/${registrationId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const parsed = await res.json();

    return parsed as ActivityEntryItem;
}

const useActivityEntry = (token: string, registrationId: string | string[]) => {
    return useQuery({
        queryKey: ['activityEntry'],
        queryFn: () => fetchActivityEntry(token, registrationId),
    })
}

export { useActivityEntry, fetchActivityEntry };