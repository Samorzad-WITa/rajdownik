import {
    Center, Circle, Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    Image,
    Input,
    Link,
    Text,
    VStack
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {EmailIcon} from "@chakra-ui/icons";
import {PendingSpinner} from "@/components";

interface PasswordResetInitForm {
    email: string
}

export const PasswordResetInitPage = () => {
    const router = useRouter();
    const [sent, setSent] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [formData, setFormData] = useState<PasswordResetInitForm>({
        email: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const  { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        if(formData.email === '') {
            setErrorMessage('Adres email nie może być pusty');
            return;
        }
        try {
            setButtonEnabled(false);
            /*const response = await */axios.post('/api/user/password-reset-init', {
                email: formData.email.toLowerCase()
            });

            setSent(true);
        } catch (error: any) {
            setButtonEnabled(true);
            setErrorMessage(error.response.data.message);
        }
    };
    if(!buttonEnabled && !sent) {
        return <PendingSpinner />
    }
    if(sent)
        return (
            <Flex
                width="100%"
                minH="78vh"
                direction="column"
                justifyContent="space-between"
                padding={2}
            >
                <Center marginBottom={50}>
                    <Circle
                        border="2px"
                        borderColor="#1F3565"
                        padding="30px"
                    >
                        <EmailIcon
                            color="#1F3565"
                            boxSize={70}
                        />
                    </Circle>
                </Center>
                <Text fontWeight={'bold'} color="#1F3565" fontSize="16px">
                    Link wysłany!
                </Text>
                <Text fontSize="11px" color="#1F3565">
                    Jeśli e-mail, który podałeś, jest zarejestrowany w naszej bazie danych, wysłaliśmy wiadomość z linkiem do zmiany hasła na podany adres.
                </Text>
                <VStack gap={0} marginTop="auto">
                    <Text fontSize={10}>Stworzone przez</Text>
                    <Text fontWeight={'bold'} color="#1F3565"><Link isExternal href="https://www.facebook.com/samorzad.wita">Samorząd WITa</Link></Text>
                </VStack>
            </Flex>
        );
    else
        return (
            <Flex
                width="100%"
                minH="78vh"
                direction="column"
                justifyContent="space-between"
                padding={2}
            >
                <Center marginBottom={30}>
                    <Image
                        width={600}
                        src="/images/user-frame.png"
                    />
                </Center>
                <Text fontWeight={'bold'} color="#1F3565" fontSize="16px">
                    Wpisz adres mailowy podany podczas zapisów
                </Text>
                <Text fontSize="11px" color="#1F3565">
                    Link do zmiany hasła zostanie wysłany na Twojego maila
                </Text>
                <form onSubmit={handleSubmit}>
                    <FormControl isInvalid={!!errorMessage}>
                        <HStack
                            width="100%"
                            bgColor="#EDEDED"
                            borderRadius={20}
                            padding={2}
                            paddingX={4}
                            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                            marginY={35}
                        >
                            <Center>
                                <Image
                                    width="30px"
                                    src="/images/user-profile-icon.png"
                                    alt="profile"
                                />
                            </Center>
                            <Input
                                border={0}
                                bgColor="#EDEDED"
                                placeholder='Adres email'
                                type={'text'}
                                value={formData.email}
                                name='email'
                                onChange={handleChange}
                            />
                        </HStack>
                        <FormErrorMessage>
                            { errorMessage }
                        </FormErrorMessage>
                    </FormControl>
                    <Center
                        marginTop={50}
                        bgColor={ buttonEnabled ? "#1F3565" : "#EDEDED" }
                        borderRadius={100}
                        boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                    >
                        <button
                            style={{
                                color: "#FFFFFF",
                                fontWeight: "bold",
                                width: "100%",
                                fontSize: "13px",
                                padding: "3px"
                            }}
                            type="submit"
                            disabled={!buttonEnabled}
                        >
                            Wyślij
                        </button>
                    </Center>
                </form>
                <Center fontSize="10px" marginTop={4}>
                    <Text marginRight={2}>
                        Problemy ze zmianą hasła?
                    </Text>
                    <Link
                        color="#1F3565"
                        fontWeight={'bold'}
                        href={`mailto:rajd.jesienny.2024@gmail.com?subject=Aplikacja Rajdownik`}
                    >
                        Napisz do nas
                    </Link>
                </Center>
                <VStack gap={0} marginTop="auto">
                    <Text fontSize={10}>Stworzone przez</Text>
                    <Text fontWeight={'bold'} color="#1F3565"><Link isExternal href="https://www.facebook.com/samorzad.wita">Samorząd WITa</Link></Text>
                </VStack>
            </Flex>
        );
}