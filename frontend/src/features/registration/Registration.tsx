import {useRegistration} from "@/hooks/useRegistration";
import {PendingSpinner, RegistrationPart} from "@/components";
import {
    Center,
    Flex, HStack, Text, VStack,
} from "@chakra-ui/react";
import {useAuth} from "@/features/context/AuthProvider";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {minutesInDay, secondsInDay} from "date-fns/constants";

export const Registration = () => {
    const router = useRouter();
    const { token } = useAuth(true);
    const [ unfoldedPart, setUnfoldedPart ] = useState<string | null>(null);

    const {data, isPending, refetch } = useRegistration(token!);
    const [time, setTime] = useState<Date>(new Date());
    const [timeDifference, setTimeDifference] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const isActive = !isPending && (time > new Date(data.startTime));

    useEffect(() => {
        if(!isPending && !isActive) {
            const timer = setInterval(() => {
                const currentTime = new Date();
                const dateDiff = Math.abs(new Date(data.startTime) - currentTime);
                setTimeDifference({
                    days: Math.floor(dateDiff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((dateDiff % (1000 * 60)) / (1000))
                });
                setTime(currentTime);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [data]);

    const refetchRegistration = (partId: string) => {
        setUnfoldedPart(partId);
    }

    if(!token || isPending) {
        return <PendingSpinner />
    }

    return (
        <>
            <Text
                fontSize={25}
                fontWeight={'bold'}
                color="#1F3565"
                textAlign={'center'}
                paddingX={3}
                paddingBottom={5}
            >
                { data.title }
            </Text>
        { isActive ? (
                <Flex
                    flexDirection="column"
                    width="100%"
                    paddingX={2}
                    gap={8}
                >
                    {data.parts.map((part) =>
                        <RegistrationPart registration={data} key={part.id} part={part} refetchRegistrationMethod={refetchRegistration}/>
                    )}
                </Flex>
        ) : (
            <>
                <Text
                    width="100%"
                    textAlign={"center"}
                    fontWeight={'bold'}
                    color="#1F3565"
                    fontSize={20}
                    paddingTop={15}
                    paddingBottom={2}
                >
                    Zapisy otwierają się za
                </Text>
                <Center
                    width="100%"
                    bgColor="#1F3565"
                    color="#FFFFFF"
                    fontWeight={'bold'}
                    boxShadow="0px 10px 25px 0px rgba(0, 0, 0, 0.25)"
                    borderRadius={10}
                >
                    <HStack gap={7} paddingBottom={3}>
                        <VStack gap={0}>
                            <Text fontSize={35}>{timeDifference.days}</Text>
                            <Text fontSize="13px">DNI</Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontSize={35}>{timeDifference.hours}</Text>
                            <Text fontSize="13px">GODZIN</Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontSize={35}>{timeDifference.minutes}</Text>
                            <Text fontSize="13px">MINUT</Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontSize={35}>{timeDifference.seconds}</Text>
                            <Text fontSize="13px">SEKUND</Text>
                        </VStack>
                    </HStack>
                </Center>
            </>
        )}
        </>
    );
}