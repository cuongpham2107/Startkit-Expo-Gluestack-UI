import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SafeAreaView } from "react-native"
import { useState } from "react";
import { Image } from "@/components/ui/image";
import LoadingComponent from "@/components/ui-custom/Loading";
import useAuthStore from "@/libs/stores/auth/auth.store";
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { router } from "expo-router";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

const LoginScreen = () => {
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [textErrorEmail, setTextErrorEmail] = useState([]);
    const [textErrorPassword, setTextErrorPassword] = useState([]);
    const [isError, setIsError] = useState('');
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("password");
    const [isChecking, setIsChecking] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const login = useAuthStore(state => state.loginUser);
    const handleLogin = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const result = await login(email, password, isChecking);
            if (result.errors) {
                if (result.errors.email) {
                    setIsInvalidEmail(true);
                    setTextErrorEmail(result.errors.email);
                }
                if (result.errors.password) {
                    setIsInvalidPassword(true);
                    setTextErrorPassword(result.errors.password);
                }
            }
            else if (result.user) {
                setIsInvalidEmail(false);
                setIsInvalidPassword(false);
                setTextErrorEmail([]);
                setTextErrorPassword([]);
                router.push("/(tabs)");
            }
            else if (result.message) {
                setIsError(result.message);
                setIsInvalidEmail(false);
                setIsInvalidPassword(false);
            }
            else {
                setIsError('Đã có lỗi xảy ra');
            }
        }
        catch (error) {
            setIsInvalidEmail(true);
            setIsInvalidPassword(true);

        }
        setIsLoading(false);
    };

    return (

        <SafeAreaView
            className="flex-1 bg-background-0"
        >
            <Center className="flex-1">
                <Center className="w-full">
                    <Image
                        size="2xl"
                        alt="Logo"
                        source={require("@/assets/images/logo.png")}
                    />
                </Center>
                <Center className="p-6 w-full">
                    <FormControl isInvalid={isInvalidEmail} className="w-full">
                        <FormControlLabel>
                            <FormControlLabelText size="md">
                                Tài khoản
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input
                            size="xl"
                        >
                            <InputField
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Nhập email hoặc số điện thoại"
                                className="text-md"
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText size="xs">
                                {textErrorEmail}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <FormControl isInvalid={isInvalidPassword} className="mt-6 w-full">
                        <FormControlLabel>
                            <FormControlLabelText size="md">
                                Mật khẩu
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Input
                            size="xl"
                        >
                            <InputField
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholder="********"
                                className="text-md"
                            />
                            <InputSlot
                                onPress={() => setShowPassword(!showPassword)}
                                className="mr-3"
                            >
                                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                            </InputSlot>
                        </Input>

                        <FormControlHelper>
                            <FormControlHelperText size="xs">
                                Phải có ít nhất 6 ký tự.
                            </FormControlHelperText>
                        </FormControlHelper>

                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText size="xs">
                                {textErrorPassword}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl className="mt-6 w-full items-end">
                        <Checkbox
                            isChecked={isChecking}
                            onChange={() => setIsChecking(!isChecking)} value={""}                        >
                            <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>
                                <FormControlLabelText size="sm">
                                    Ghi nhớ đăng nhập
                                </FormControlLabelText>
                            </CheckboxLabel>
                        </Checkbox>
                    </FormControl>
                    <Button
                        className="mt-8 w-full"
                        size="lg"
                        onPress={handleLogin}
                    >
                        <ButtonText>Đăng nhập</ButtonText>
                    </Button>
                </Center>
            </Center>
            <AlertDialog isOpen={isError !== '' ? true : false} onClose={() => setIsError('')} size="md">
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading className="text-typography-950 font-semibold" size="md">
                            Đã có lỗi xảy ra
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text size="sm">
                            {isError}
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => setIsError('')}
                            size="sm"
                        >
                            <ButtonText>Đóng</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {isLoading && <LoadingComponent title={"Đang tải"} />}
        </SafeAreaView>

    );
}

export default LoginScreen;