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
    IconButton
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useAuthenticatedUser} from "@/hooks/useUser";
import {AddIcon} from "@chakra-ui/icons";

type ActivityRegistrationForm = {
    teamName: string;
    captainCode: string;
    userCode: string;
}

export const ActivityRegistration = () => {
    const router = useRouter();
    const { id } = router.query;
    const { token } = useAuth(true);
    const { data: activityEntry, isPending: isActivityEntryPending } = useActivityEntry(token!, id);
    const { data: activityRegistration, isPending: isActivityRegistrationPending } = useActivityRegistration(id, !activityEntry, token!);
    const { data: authenticatedUser, isPending: isAuthenticatedUserPending} = useAuthenticatedUser(token!);

    const [formData, setFormData] = useState<ActivityRegistrationForm>({
        teamName: '',
        captainCode: '',
        userCode: ''
    });
    const [errorMessage, setErrorMessage]  = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [selfCaptainChecked, setSelfCaptainChecked] = useState(false);

    if(isActivityEntryPending || isActivityRegistrationPending || isAuthenticatedUserPending) return <PendingSpinner />

    if(!activityEntry || !activityRegistration)
        return <SystemInformation>Nie udało się wczytać formularza</SystemInformation>

    const registration = !activityEntry ? activityRegistration : activityEntry.activityRegistration;

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        if(!termsAccepted) {
            setErrorMessage('Musisz zaakceptować regulamin');
            return;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const signSelfAsCaptain = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            captainCode: checked ? authenticatedUser.code : '',
        }));
        setSelfCaptainChecked(checked);
    }

    return (
        <Flex
            paddingX={2}
            fontSize={'large'}
            fontWeight={'bold'}
            gap={5}
            flexDirection="column"
        >
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Text
                        fontSize={20}
                        color="#1F3565"
                    >
                        Informacje o drużynie
                    </Text>
                    <Box padding={3}>
                        <Text fontSize={15} color="#1F3565">Nazwa drużyny</Text>
                        <Input
                            border={0}
                            bgColor="#EDEDED"
                            placeholder='Nazwa drużyny'
                            type={'text'}
                            value={formData.teamName}
                            name='teamName'
                            onChange={handleChange}
                        />
                    </Box>
                    <Box padding={3}>
                        <Text fontSize={15} color="#1F3565">Kapitan drużyny</Text>
                        <HStack>
                            <Checkbox onChange={signSelfAsCaptain}/>
                            <Text fontSize={15} color="#1F3565">Jestem kapitanem</Text>
                        </HStack>
                        <Input
                            border={0}
                            bgColor="#EDEDED"
                            placeholder='Kod uczestnika'
                            type={'text'}
                            isDisabled={selfCaptainChecked}
                            value={formData.captainCode}
                            name='captainCode'
                            onChange={handleChange}
                        />
                    </Box>
                </FormControl>
                <FormControl isInvalid={!!errorMessage}>
                    <Text
                        fontSize={20}
                        color="#1F3565"
                    >
                        Skład drużyny ({activityEntry ? activityEntry.users.length : 0}/{registration.teamSizeLimit})
                    </Text>
                    { (!activityEntry || (activityEntry && activityEntry.users.length < registration.teamSizeLimit)) && <HStack>
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
                            aria-label={'dodaj użytkownika'}
                            icon={<AddIcon />}
                            onClick={() => {}}
                        />
                    </HStack> }
                    <FormErrorMessage>
                        {errorMessage}
                    </FormErrorMessage>
                </FormControl>
                <Flex
                    paddingY={4}
                    paddingLeft={3}
                    gap={2}
                    flexDirection="column"
                >
                    { activityEntry && activityEntry.users.map((user, index) => (
                        <Text
                            key={user.user.code}
                            color="#1F3565"
                        >
                            {index + 1}. {user.user.firstName} {user.user.lastName}
                        </Text>
                    ))}
                </Flex>
                <FormControl isInvalid={!!errorMessage}>
                    <Flex flexDirection="row">
                        <HStack
                            gap={0}
                        >
                            <Checkbox
                                defaultChecked={termsAccepted}
                                onChange={(e) => setTermsAccepted((oldValue) => !oldValue)}
                            />
                            <Text fontSize={13} marginLeft={2}>Akceptuję <Link fontSize={13} href={registration.termsAndRulesUrl} color="red" isExternal>regulamin</Link></Text>

                        </HStack>
                    </Flex>
                    <FormErrorMessage>
                        {errorMessage}
                    </FormErrorMessage>
                </FormControl>
                <Center
                    marginTop={2}
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
                    >
                        Wyślij formularz
                    </button>
                </Center>
            </form>
        </Flex>
    );
}