import { Contact } from '@/features';
import { fetchContact } from '@/hooks';
import { chakra } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";
import {ActivityRegistration} from "@/features/activity-registration";
import {useRouter} from "next/router";
import {PendingSpinner} from "@/components";

export default function Page() {
    const { setProps } = useAppContext();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        setProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Formularz zapisowy',
            shouldRenderNavbar: true,
            shouldRenderFooter: true,
            shouldRenderBackButton: true,
            backButtonPath: '/activity/registration'
        }));
    }, [setProps]);

    if(!id) {
        return (
            <chakra.main>
                <PendingSpinner />
            </chakra.main>
        )
    }

    return (
        <>
            <Head>
                <title>Formularz zapisowy na atrakcje</title>
                <meta name="description" content="Formularz zapisowy na atrakcje" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <ActivityRegistration id={id}/>
            </chakra.main>
        </>
    );
}
