import React, {useEffect, useState} from "react";
import {
    VStack,
    Text,
    FormControl,
    Input,
    HStack,
    Image,
    Center, IconButton, FormErrorMessage, Link, Flex, Button, Circle
} from "@chakra-ui/react";
import axios from "axios";
import {useAuth} from "@/features/context/AuthProvider";
import {useRouter} from "next/router";
import {CheckIcon, EmailIcon} from "@chakra-ui/icons";

interface PasswordResetState {
    password: string,
    passwordRepeat: string
}

export const PasswordResetPage = () => {
    const router = useRouter();
    const [isShowPassword, setShowPassword] = useState(false);
    const [isShowPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [passwordToken, setPasswordToken] = useState<string | string[] | undefined | null>(null);
    const [formData, setFormData] = useState<PasswordResetState>({
        password: '',
        passwordRepeat: ''
    });
    const [reseted, setReseted] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = router.query;
    useEffect(() => {
        setPasswordToken(token);
    }, [token]);

    if(!passwordToken) {
        return (
            <Text color="#1F3565" fontWeight={'bold'} fontSize="20px" width="100%" align="center">
                Nieprawidłowy token
            </Text>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const  { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        const passwordMatch = formData.password === formData.passwordRepeat;
        if(!passwordMatch) {
            setErrorMessage('Hasła muszą być takie same');
            return;
        }

        try {
            setButtonEnabled(false);
            const response = await axios.post('/api/user/password-reset', {
                token: passwordToken,
                newPassword: formData.password
            });

            setReseted(true);
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            setButtonEnabled(true);
        }
    };

    const handleShowPassword = () => {
        setShowPassword((oldShowPassword) => !oldShowPassword);
    };

    const handleShowPasswordRepeat = () => {
        setShowPasswordRepeat((oldShowPasswordRepeat) => !oldShowPasswordRepeat);
    };

    if(reseted) {
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
                        <CheckIcon
                            color="#1F3565"
                            boxSize={70}
                        />
                    </Circle>
                </Center>
                <Text fontWeight={'bold'} color="#1F3565" fontSize="16px">
                    Hasło zresetowane!
                </Text>
                <Text fontSize="11px" color="#1F3565">
                    Hasło do twojego konta zostało zresetowane.
                </Text>
                <VStack gap={0} marginTop="auto">
                    <Text fontSize={10}>Stworzone przez</Text>
                    <Text fontWeight={'bold'} color="#1F3565"><Link isExternal href="https://www.facebook.com/samorzad.wita">Samorząd WITa</Link></Text>
                </VStack>
            </Flex>
        )
    } else {
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
                                    src="/images/padlock-icon.png"
                                    alt="padlock"
                                />
                            </Center>
                            <Input
                                border={0}
                                placeholder='Nowe hasło'
                                bgColor="#EDEDED"
                                type={isShowPassword ? 'text' : 'password'}
                                value={formData.password}
                                name='password'
                                onChange={handleChange}
                            />
                            <Center>
                                <IconButton
                                    bgColor="#EDEDED"
                                    aria-label='Pokaż hasło'
                                    icon={<Image
                                        width="25px"
                                        src={isShowPassword ? "/images/eye-outline-icon.png" : "/images/eye-icon.png"}
                                        alt="padlock"
                                    />}
                                    onClick={() => handleShowPassword()}
                                />
                            </Center>
                        </HStack>
                        <FormErrorMessage>

                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errorMessage}>
                        <HStack
                            width="100%"
                            bgColor="#EDEDED"
                            borderRadius={20}
                            padding={2}
                            paddingX={4}
                            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                        >
                            <Center>
                                <Image
                                    width="30px"
                                    src="/images/padlock-icon.png"
                                    alt="padlock"
                                />
                            </Center>
                            <Input
                                border={0}
                                placeholder='Powtórz nowe hasło'
                                bgColor="#EDEDED"
                                type={isShowPasswordRepeat ? 'text' : 'password'}
                                value={formData.passwordRepeat}
                                name='passwordRepeat'
                                onChange={handleChange}
                            />
                            <Center>
                                <IconButton
                                    bgColor="#EDEDED"
                                    aria-label='Pokaż hasło'
                                    icon={<Image
                                        width="25px"
                                        src={isShowPasswordRepeat ? "/images/eye-outline-icon.png" : "/images/eye-icon.png"}
                                        alt="padlock"
                                    />}
                                    onClick={() => handleShowPasswordRepeat()}
                                />
                            </Center>
                        </HStack>
                        <FormErrorMessage>
                            { errorMessage }
                        </FormErrorMessage>
                    </FormControl>
                    <Center
                        marginTop={50}
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
                                padding: "3px"
                            }}
                            type="submit"
                            disabled={!buttonEnabled}
                        >
                            Zmień hasło
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
};