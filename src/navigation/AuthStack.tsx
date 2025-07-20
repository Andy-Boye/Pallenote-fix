import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auth/LoginScreen"
import SignupScreen from "../screens/auth/SignupScreen"
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen"
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen"

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
  ForgotPassword: undefined
  ResetPassword: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
)

export default AuthStack
