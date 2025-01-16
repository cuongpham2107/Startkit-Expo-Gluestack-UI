import { Stack } from "expo-router"

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown: false}}/>
            {/* <Stack.Screen name="register" /> */}
        </Stack>
    )
}

export default AuthLayout