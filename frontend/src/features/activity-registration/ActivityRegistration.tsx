import {useRouter} from "next/router";
import {useAuth} from "@/features/context/AuthProvider";
import {useActivityEntry} from "@/hooks/useActivityEntry";
import {useActivityRegistration, useActivityRegistrations} from "@/hooks";
import {PendingSpinner, SystemInformation} from "@/components";
import {
    Center,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    Text,
    HStack,
    Link,
    Input,
    Box,
    IconButton, Spacer, useToast
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useAuthenticatedUser, UserItem} from "@/hooks/useUser";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";
import axios from "axios";

type ActivityRegistrationForm = {
    teamName: string;
    captainCode: string;
    userCode: string;
    users: UserItem[];
}

type FormError = {
    code: string;
    message: string;
}

export const ActivityRegistration = ({id} : {id:string | string[]}) => {
    const { token } = useAuth(true);
    const router = useRouter();

    const { data: activityEntry, isPending: isActivityEntryPending } = useActivityEntry(token!, id);
    const { data: activityRegistration, isPending: isActivityRegistrationPending } = useActivityRegistration(id, true, token!);
    const { data: authenticatedUser, isPending: isAuthenticatedUserPending} = useAuthenticatedUser(token!);
    const toast = useToast();

    const [formData, setFormData] = useState<ActivityRegistrationForm>({
        teamName: activityEntry ? activityEntry.teamName : '',
        captainCode: (activityEntry && activityEntry.teamCaptain) ? activityEntry.teamCaptain.code : '',
        userCode: '',
        users: (activityEntry && activityEntry.users) ? activityEntry.users.map(u => u.user) : []
    });
    const [errorMessage, setErrorMessage]  = useState<FormError>({
        code: '',
        message: ''
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [selfCaptainChecked, setSelfCaptainChecked] = useState(false);
    const [isSending, setIsSending] = useState(false);

    if(isActivityEntryPending || isActivityRegistrationPending || isAuthenticatedUserPending) return <PendingSpinner />

    if(!activityEntry && !activityRegistration)
        return <SystemInformation>Nie udało się wczytać formularza</SystemInformation>

    const registration = activityRegistration;

    if(!registration)
        return <SystemInformation>Nie udało się wczytać formularza</SystemInformation>

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage({code: '', message: ''});
        if(!termsAccepted) {
            setErrorMessage({code: 'terms_accept', message: 'Musisz zaakceptować regulamin'});
            return;
        }
        if(registration.requireFullTeam && (formData.users.length < registration.teamSizeLimit - 1)) {
            toast({
                title: 'Drużyna musi być pełna',
                position: 'top-left',
                status: 'error',
                isClosable: true
            });
            return;
        }
        if(formData.teamName === '') {
            setErrorMessage({code: 'empty_team_name', message: 'Nazwa drużyny nie może być pusta'});
            return;
        }
        if(formData.captainCode === '' && !selfCaptainChecked) {
            setErrorMessage({code: 'empty_team_captain', message: 'Drużyna musi mieć kapitana'});
            return;
        }
        if(!(await checkCaptain())) {
            return;
        }

        try {
            setIsSending(true);
            const response = await axios.post(`/api/activity-registration/${registration.id}/register-entry`, {
                teamName: formData.teamName,
                teamCaptain: { code: formData.captainCode },
                users: formData.users.map(user => ({
                    user: {
                        id: user.id
                    }
                }))
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setIsSending(false);
            await router.push('/activity/registration');
        } catch (error: any) {
            toast({
                title: error.response.data.message,
                position: 'top-left',
                status: 'error',
                isClosable: true
            });
            setIsSending(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const checkCaptain = async (): Promise<boolean> => {
        try {
            const response = await axios.post(`/api/activity-registration/${registration.id}/validate-entry/${formData.captainCode.toUpperCase()}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const user = response.data as UserItem;
            if(formData.users.some(u => u.code === user.code)) {
                setErrorMessage({code: 'invalid_captain_code', message: 'Użytkownik jest już zapisany'});
                return false;
            }
            clearErrorMessage();
            setFormData(prevState => ({...prevState, userCode: ''}));
            return true;
        } catch (error: any) {
            setErrorMessage({code: 'invalid_captain_code', message: error.response.data.message});
            return false;
        }
    }

    const signSelfAsCaptain = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        clearErrorMessage();
        setFormData(prevState => ({
            ...prevState,
            captainCode: (checked && authenticatedUser) ? authenticatedUser.code : '',
        }));
        setSelfCaptainChecked(checked);
    }

    const removeUser = (id: string) => {
        console.log(formData.users);
        setFormData(prevData => ({
                ...prevData,
                users: prevData.users.filter(user => user.id !== id)
        }));
    }

    const addUser = async () => {
        try {
            setIsSending(true);
            const response = await axios.post(`/api/activity-registration/${registration.id}/validate-entry/${formData.userCode.toUpperCase()}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const user = response.data as UserItem;
            if(formData.users.some(u => u.code === user.code)) {
                setErrorMessage({code: 'invalid_user_code', message: 'Użytkownik jest już zapisany'});
                return;
            }
            setFormData(prevData => ({
                ...prevData,
                users: [...prevData.users, user]
            }));
            clearErrorMessage();
            setIsSending(false);
            setFormData(prevState => ({...prevState, userCode: ''}))
        } catch (error: any) {
            setIsSending(false);
            setErrorMessage({code: 'invalid_user_code', message: error.response.data.message});
        }
    }

    const clearErrorMessage = () => {
        setErrorMessage({code: '', message: ''});
    }

    let userIndex = 0;
    return (
        <Flex
            paddingX={2}
            fontSize={'large'}
            fontWeight={'bold'}
            gap={5}
            flexDirection="column"
        >
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={errorMessage.code === 'empty_team_name'}>
                    <Box marginBottom={5} padding={0}>
                        <Text fontSize={15} color="#1F3565">Nazwa drużyny</Text>
                        <Input
                            borderRadius={30}
                            isDisabled={!!activityEntry}
                            border={0}
                            bgColor="#EDEDED"
                            placeholder='Nazwa drużyny'
                            type={'text'}
                            value={!activityEntry ? formData.teamName : activityEntry.teamName}
                            name='teamName'
                            onChange={handleChange}
                        />
                        <FormErrorMessage>
                            {errorMessage.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <Box paddingBottom={0} marginBottom={10}>
                    <Text fontSize={15} color="#1F3565">Kapitan drużyny</Text>
                    {!activityEntry && <HStack>
                        <Checkbox onChange={signSelfAsCaptain}/>
                        <Text fontSize={15} color="#1F3565" fontWeight={'normal'}>Jestem kapitanem</Text>
                    </HStack>}
                    <FormControl isInvalid={errorMessage.code === 'invalid_captain_code'}>
                        <Input
                            borderRadius={30}
                            border={0}
                            bgColor="#EDEDED"
                            placeholder='Kod uczestnika'
                            type={'text'}
                            isDisabled={!!activityEntry || selfCaptainChecked}
                            value={activityEntry ? activityEntry.teamCaptain.firstName + " " +activityEntry.teamCaptain.lastName : formData.captainCode}
                            name='captainCode'
                            onChange={handleChange}
                        />
                        <FormErrorMessage>
                            {errorMessage.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>

                <FormControl isInvalid={errorMessage.code === 'invalid_user_code'}>
                    <Text
                        fontSize={20}
                        color="#1F3565"
                    >
                        Skład drużyny ({activityEntry ? activityEntry.users.length - 1 : formData.users.length}/{registration.teamSizeLimit - 1}) + kapitan
                    </Text>
                    { (!activityEntry && (formData.users.length < registration.teamSizeLimit - 1)) && <HStack>
                        <Input
                            type='text'
                            onChange={handleChange}
                            placeholder='Kod użytkownika'
                            name='userCode'
                            value={formData.userCode}
                            paddingLeft={0}
                        />
                        <IconButton
                            bgColor="#E4E9F4"
                            isDisabled={isSending}
                            aria-label={'dodaj użytkownika'}
                            icon={<AddIcon />}
                            onClick={addUser}
                        />
                    </HStack> }
                    <FormErrorMessage>
                        {errorMessage.message}
                    </FormErrorMessage>
                </FormControl>
                <Flex
                    paddingY={4}
                    paddingLeft={3}
                    gap={2}
                    flexDirection="column"
                >
                    { (activityEntry ? activityEntry.users.map(u => u.user) : formData.users).map((user) => {
                        if(activityEntry && user.code === activityEntry.teamCaptain.code) {
                            return (<></>);
                        }
                        userIndex = userIndex + 1;
                        return (
                        <HStack
                            minH="40px"
                            key={user.id}
                            width="100%"
                        >
                            {/*<Text>{activityEntry ? index : index + 1}. {user.firstName} {user.lastName}</Text>*/}
                            <Text>{userIndex}. {user.firstName} {user.lastName}</Text>
                            <Spacer />
                            {!activityEntry && <IconButton
                                aria-label={'usuń uzytkownika'}
                                icon={<CloseIcon />}
                                bgColor="#E4E9F4"
                                onClick={() => removeUser(user.id)}
                            />}
                        </HStack>
                    )})}
                </Flex>
                {!activityEntry && <FormControl isInvalid={errorMessage.code === 'terms_accept'}>
                    <Flex flexDirection="row" marginTop={10}>
                        <HStack
                            gap={0}
                            fontWeight={'normal'}
                        >
                            <Checkbox
                                defaultChecked={termsAccepted}
                                onChange={(e) => setTermsAccepted((oldValue) => !oldValue)}
                            />
                            <Text fontSize={13} marginLeft={2}>Akceptuję <Link fontSize={13} fontWeight={'bold'} href={registration.termsAndRulesUrl} textDecoration="underline" color="#1F3565" isExternal>regulamin</Link></Text>

                        </HStack>
                    </Flex>
                    <FormErrorMessage>
                        {errorMessage.message}
                    </FormErrorMessage>
                </FormControl>}
                {!activityEntry && <Center
                    marginTop={4}
                    padding={1}
                    bgColor="#1F3565"
                    borderRadius={100}
                    boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                >
                    <button
                        style={{
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            width: "100%",
                            fontSize: "13px",
                            padding: "3px",
                        }}
                        type="submit"
                        disabled={isSending}
                    >
                        Wyślij formularz
                    </button>
                </Center>}
            </form>
        </Flex>
    );
}