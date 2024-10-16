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
import {useAuthentication} from "@/hooks/useAuthentication";
import {PendingSpinner} from "@/components";

interface LoginFormState {
    email: string,
    password: string
}

export const LoginPage = () => {
    const router = useRouter();
    const { setToken } = useAuth();
    const [isShowPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const  { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        if(formData.password === '' || formData.email === '') {
            setErrorMessage('Pola nie mogą być puste');
            return;
        }
        try {
            const response = await axios.post('/api/authentication', {
                email: formData.email.toLowerCase(),
                password: formData.password
            })
            const token = response.data.token;
            setToken(token);

            await router.push('/profile');
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }
    };

    const handleShowPassword = () => {
        setShowPassword((oldShowPassword) => !oldShowPassword);
    };

    return (
      <Flex
        width="100%"
        minH="78vh"
        direction="column"
        justifyContent="space-between"
        padding={2}
      >
          <Center>
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
                            width="40px"
                            src="/images/padlock-icon.png"
                            alt="padlock"
                        />
                    </Center>
                    <Input
                        border={0}
                        placeholder='Hasło'
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
                        fontSize: "15px",
                        padding: "3px"
                    }}
                    type="submit"
                >
                    Zaloguj się
                </button>
            </Center>
          </form>
          <Center fontSize="10px" marginTop={4}>
              <Text marginRight={2}>
                  Nie pamiętasz hasła?
              </Text>
              <Link
                  color="#1F3565"
                  fontWeight={'bold'}
                  onClick={() => router.push('/user/password-reset-init')}
              >
                  Zresetuj hasło
              </Link>
          </Center>
          <VStack gap={0} marginTop="auto">
              <Text fontSize={10}>Stworzone przez</Text>
              <Text fontWeight={'bold'} color="#1F3565"><Link isExternal href="https://www.facebook.com/samorzad.wita">Samorząd WITa</Link></Text>
          </VStack>
      </Flex>
    );
};