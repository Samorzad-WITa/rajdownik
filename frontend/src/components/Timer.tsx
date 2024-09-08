import {useEffect, useState} from "react";
import {Box, Progress} from "@chakra-ui/react";

export const Timer = ({
    initialTime,
    timeoutCallback,
    refreshKey
} : {
    initialTime: number;
    timeoutCallback: () => void;
    refreshKey: number;
}) => {
    const [seconds, setSeconds] = useState(initialTime);
    const [active, setActive] = useState(true);

    useEffect(() => {
        setSeconds(initialTime);
    }, [refreshKey]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if(active && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if(seconds <= 0) {
            clearInterval(interval);
            timeoutCallback();
        } else if(!active && seconds !== 0) {
            clearInterval(interval);
        }

        return () => {
            if(interval) clearInterval(interval);
        }
    }, [active, seconds]);

    return (
        <Progress
            value={(seconds / initialTime) * 100}
            borderRadius="sm"
            bgColor='#1F3565'
            height={1.5}
        />
    );
}