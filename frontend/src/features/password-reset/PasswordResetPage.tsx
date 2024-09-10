import React, {useEffect, useState} from "react";
import {
    VStack,
    Text,
    FormControl,
    Input,
    HStack,
    Image,
    Center, IconButton, FormErrorMessage, Link, Flex, Button
} from "@chakra-ui/react";
import axios from "axios";
import {useAuth} from "@/features/context/AuthProvider";
import {useRouter} from "next/router";

interface PasswordResetState {
    password: string,
    passwordRepeat: string
}

export const PasswordResetPage = () => {
    const router = useRouter();
    const { setToken } = useAuth();
    const [isShowPassword, setShowPassword] = useState(false);
    const [isShowPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [isError, setIsError] = useState(false);
    const [passwordToken, setPasswordToken] = useState<string | string[] | undefined | null>(null);
    const [formData, setFormData] = useState<PasswordResetState>({
        password: '',
        passwordRepeat: ''
    });
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
        const passwordMatch = formData.password === formData.passwordRepeat;
        setIsError(!passwordMatch);
        if(!passwordMatch) {
            return;
        }

        try {
            const response = await axios.post('/api/user/password-reset', {
                token: passwordToken,
                newPassword: formData.password
            });

            await router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowPassword = () => {
        setShowPassword((oldShowPassword) => !oldShowPassword);
    };

    const handleShowPasswordRepeat = () => {
        setShowPasswordRepeat((oldShowPasswordRepeat) => !oldShowPasswordRepeat);
    };

    return (
        <Flex
            width="100%"
            minH="78vh"
            direction="column"
            justifyContent="space-between"
            padding={2}
        >
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={isError}>
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
                                    src="/images/eye-outline-icon.png"
                                    alt="padlock"
                                />}
                                onClick={() => handleShowPassword()}
                            />
                        </Center>
                    </HStack>
                    <FormErrorMessage>

                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={isError}>
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
                                    src="/images/eye-outline-icon.png"
                                    alt="padlock"
                                />}
                                onClick={() => handleShowPasswordRepeat()}
                            />
                        </Center>
                    </HStack>
                    <FormErrorMessage>
                        Hasła muszą być takie same
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
                >
                    Napisz do nas
                </Link>
            </Center>
            <VStack gap={0} marginTop="auto">
                <Text fontSize={10}>Stworzone przez</Text>
                <Text fontWeight={'bold'} color="#1F3565">Samorząd WITa</Text>
            </VStack>
        </Flex>
    );
};