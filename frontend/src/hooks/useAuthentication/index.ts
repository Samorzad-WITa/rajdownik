import { useQuery } from '@tanstack/react-query';

export type AuthenticationItem = {
    token: string;
    expiresIn: number;
};

const fetchAuthentication = async ({email, password} : {email:string, password:string}) => {
    const res = await fetch('/api/authentication', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    const parsed = await res.json();

    return parsed as AuthenticationItem;
};

const useAuthentication = ({email, password} : {email:string, password:string}) => {
    return useQuery({
        queryKey: ['authentication'],
        queryFn: () => fetchAuthentication({email, password}),
    });
};

export { fetchAuthentication, useAuthentication };
