import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../auth/Login';
import OnboardingScreen from '../screens/OnboardingScreen';
import Register from '../auth/Register';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ForgotPassword from '../auth/ForgotPassword';
import CreateNewPassword from '../auth/CreateNewPassword';
import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CreateNewNotes from '../screens/CreateNewNotes';
import BuyingSomeThing from '../screens/BuyingSomeThing';
import InterestingIdea from '../screens/InterestingIdea';
import Guidance from '../screens/Guidance';
import Goals from '../screens/Goals';
import RoutineTasks from '../screens/RoutineTasks';
import SearchBar from '../screens/SearchBar';
import FinishedScreen from '../screens/FinishedScreen';
import Settings from '../screens/Settings';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='OnboardingScreen'>
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false, }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, tabBarVisible: false, }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CreateNewNotes" component={CreateNewNotes} options={{ headerShown: false, }} />
        <Stack.Screen name="BuyingSomeThing" component={BuyingSomeThing} options={{ headerShown: false }} />
        <Stack.Screen name="InterestingIdea" component={InterestingIdea} options={{ headerShown: false }} />
        <Stack.Screen name="Guidance" component={Guidance} options={{ headerShown: false }} />
        <Stack.Screen name="Goals" component={Goals} options={{ headerShown: false }} />
        <Stack.Screen name="RoutineTasks" component={RoutineTasks} options={{ headerShown: false }} />
        <Stack.Screen name="SearchBar" component={SearchBar} options={{ headerShown: false }} />
        <Stack.Screen name="FinishedScreen" component={FinishedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false, tabBarStyle:{display:'none'} }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

