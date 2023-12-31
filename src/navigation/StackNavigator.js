import React,{ useEffect, useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../auth/Login';
import OnboardingScreen from '../screens/OnboardingScreen';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import CreateNewPassword from '../auth/CreateNewPassword';
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
import ChangePassword from '../auth/ChangePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailCode from '../auth/EmailCode';
import LoadingScreen from '../screens/LoadingScreen';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [googleid, setgoogleid] = useState('');
  
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const storedToken = await AsyncStorage.getItem('Token');
        const googleId = await AsyncStorage.getItem('GoogleId');
        setToken(storedToken);
        setgoogleid(googleId)
      } catch (error) {
        console.error('Error checking login status: ', error);
      } finally {
        setLoading(false);
      }
    }

    checkLoginStatus();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token || googleid ?"HomeScreen":"Login"}>
        <Stack.Screen name="CreateNewNotes" component={CreateNewNotes} options={{ headerShown: false, }} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false, }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, tabBarVisible: false, }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator} options={{ headerShown: false }} />
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
        <Stack.Screen name="EmailCode" component={EmailCode} options={{ headerShown: false }} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

