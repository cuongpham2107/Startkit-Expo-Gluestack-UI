
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SafeAreaView } from "react-native"
import { useState } from "react";
import { Image } from "@/components/ui/image";
import LoadingComponent from "@/components/ui-custom/Loading";

const LoginScreen = () => {
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        if (password?.length < 6) {
            setIsInvalidPassword(true);
        } else {
            setIsInvalidPassword(false);
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
                    <FormControl className="w-full">
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
                                Cần ít nhất 6 ký tự.
                            </FormControlErrorText>
                        </FormControlError>
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
            {isLoading  && <LoadingComponent title={"Đang tải"}/> }
        </SafeAreaView>
        
    );
}

export default LoginScreen;