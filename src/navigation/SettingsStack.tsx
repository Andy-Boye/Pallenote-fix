import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SettingsScreen from "../settings/SettingsScreen"
import FAQScreen from "../settings/FAQScreen"
import AboutUsScreen from "../settings/AboutUsScreen"
import LanguageScreen from "../settings/languageScreen"
import PaymentPlanScreen from "../settings/PaymentPlanScreen"
import AccountInfoScreen from "../settings/AccountInfoScreen"
import CommunityScreen from "../settings/CommunityScreen"
import PrivacyPolicyScreen from "../settings/PrivacyPolicyScreen"

const Stack = createNativeStackNavigator()

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
    <Stack.Screen name="Language" component={LanguageScreen} />
    <Stack.Screen name="PaymentPlan" component={PaymentPlanScreen} />
    <Stack.Screen name="Community" component={CommunityScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    <Stack.Screen name="FAQ" component={FAQScreen} />
  </Stack.Navigator>
)

export default SettingsStack
