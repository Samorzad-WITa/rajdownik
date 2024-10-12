import { UserProfile } from '@/features/profile';
import { chakra } from '@chakra-ui/react';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Page() {
    const { setProps } = useAppContext();
    useEffect(() => {
        setProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Profil użytkownika',
            shouldRenderNavbar: true,
            shouldRenderFooter: true,
            shouldRenderBackButton: false,
        }));
    }, [setProps]);

    return (
        <>
            <Head>
                <title>Profil użytkownika</title>
                <meta name="description" content="Profil użytkownika" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <UserProfile />
            </chakra.main>
        </>
    );
}