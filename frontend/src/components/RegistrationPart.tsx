import {Button, Center, Flex, HStack, IconButton, Input, Spacer, Text, useToast, VStack} from "@chakra-ui/react";
import {AddIcon, CloseIcon, EditIcon, LockIcon} from "@chakra-ui/icons";
import {RegistrationPartItem, useRegistrationPart } from "@/hooks/useRegistrationPart";
import React, {useEffect, useState} from "react";
import {PendingSpinner} from "@/components/PendingSpinner";
import {CrossIcon} from "lucide-react";
import {useAuth} from "@/features/context/AuthProvider";
import axios from "axios";
import {Timer} from "@/components/Timer";
import {RegistrationItem} from "@/hooks/useRegistration";

export const RegistrationPart = ({ part, registration, refetchRegistrationMethod } : { part: RegistrationPartItem, registration: RegistrationItem, refetchRegistrationMethod: (partId:string) => void }) => {
    const [unfolded, setUnfolded] = useState(part.ownsLock);
    const [userCode, setUserCode] = useState('');
    const { token } = useAuth();
    const toast = useToast();
    const [timerKey, setTimerKey] = useState(0);

    const isLocked = part.locked;
    const lockDuration = 15;

    const timeout = () => {
        setUnfolded(false);
        console.log("Timeout");
    }

    const refreshLock = () => {
        setTimerKey(prevKey => prevKey + 1);
    }

    const unfold = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await axios.post(`/api/registration/lock-part/${part.id}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            refreshLock();
            setUnfolded(true);
            refetchRegistrationMethod(part.id);
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data,
                position: 'top-left',
                status: 'error',
                isClosable: true
            });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCode(e.target.value);
    }

    const handleRemoveEntry = async (entryId: string) => {
        try {
            await axios.delete(`/api/registration/remove-entry/${entryId}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            toast({
                title: 'Użytkownik wypisany!',
                position: 'top-left',
                status: 'success',
                isClosable: true
            })
            refreshLock();
            refetchRegistrationMethod(part.id);
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data,
                position: 'top-left',
                status: 'error',
                isClosable: true
            });
        }
    }

    const handleSavePart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await axios.post(`/api/registration/release-part/${part.id}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setUnfolded(false);
            refetchRegistrationMethod(part.id);
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data,
                position: 'top-left',
                status: 'error',
                isClosable: true
            });
        }
    }

    const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await axios.post(`/api/registration/register-entry/${part.id}`, {
                userCode: userCode.toUpperCase()
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setUserCode('');
            toast({
                title: 'Użytkownik wpisany!',
                position: 'top-left',
                status: 'success',
                isClosable: true
            });
            refreshLock();
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data,
                position: 'top-left',
                status: 'error',
                isClosable: true
            });
        }
    }

    return (
        <VStack
            gap={0}
            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
        >
            <VStack
                gap={0}
                bgColor="#1F3565"
                width="100%"
                color="#FFFFFF"
                borderTopRadius={15}
                fontWeight={'bold'}
                paddingY={0.5}
            >
                <Text>{part.title}</Text>
                <Text fontSize={'small'}>{part.entryAmount}/{part.entryLimit}</Text>
            </VStack>
            { !unfolded ? (
                    <Center paddingTop={1} bgColor="#E4E9F4" width="100%">
                        <Button bgColor="#E4E9F4" isDisabled={isLocked} width="100%" onClick={unfold}>
                            { isLocked ? (<LockIcon />) : (<EditIcon />) }
                            <Text marginLeft={2} fontSize={15}> { isLocked ? 'Zablokowane' : 'Edytuj' } </Text>
                        </Button>
                    </Center>
                ) : (
                    <Flex
                        width="100%"
                        flexDirection="column"
                        bgColor="#E4E9F4"
                        paddingLeft={2}
                        paddingTop={1}
                        paddingRight={2}
                    >
                        <Timer initialTime={lockDuration} timeoutCallback={timeout} refreshKey={timerKey}/>
                        { (part.entryAmount < part.entryLimit) && <HStack>
                            <Input
                                type='text'
                                onChange={handleChange}
                                placeholder='Kod użytkownika'
                                value={userCode}
                                paddingLeft={0}
                            />
                            <IconButton
                                bgColor="#E4E9F4"
                                aria-label={'dodaj użytkownika'}
                                icon={<AddIcon />}
                                onClick={handleAddUser}
                            />
                        </HStack>}
                        { part.entries.map((entry) => (
                            <HStack
                                minH="40px"
                                key={entry.firstName + entry.lastName}
                                width="100%"
                            >
                                <Text>{entry.firstName} {entry.lastName}</Text>
                                <Spacer />
                                {entry.canDelete && <IconButton
                                    aria-label={'usuń uzytkownika'}
                                    icon={<CloseIcon />}
                                    bgColor="#E4E9F4"
                                    onClick={() => handleRemoveEntry(entry.id)}
                                />}
                            </HStack>
                        )) }
                        <Button onClick={handleSavePart}>Zapisz</Button>
                    </Flex>
                )
            }

        </VStack>
    );
}