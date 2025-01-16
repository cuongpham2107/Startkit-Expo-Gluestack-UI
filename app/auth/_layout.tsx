import { Stack } from "expo-router"
export const unstable_settings = {
    initialRouteName: 'auth',
};
const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }}/>
            {/* <Stack.Screen name="register" /> */}
        </Stack>
    )
}

export default AuthLayout