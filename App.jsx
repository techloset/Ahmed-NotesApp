import React, { useEffect } from 'react'
import StackNavigator from './src/navigation/StackNavigator'
import AuthContext from './src/auth/AuthContext'
import Toast from 'react-native-toast-message';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const App = () => {


   global.Toast = {
    error: (title, description, ...rest) =>
      Toast.show({type: 'error', text1: title, text2: description, ...rest[0]}),
    info: (title, description, ...rest) =>
      Toast.show({type: 'info', text1: title, text2: description, ...rest[0]}),
    success: (title, description, ...rest) =>
      Toast.show({
        type: 'success',
        text1: title,
        text2: description,
        ...rest[0],
      }),
  }


  useEffect(() => {
    GoogleSignin.configure({webClientId: process.env.WEB_CLIENT_ID});
  }, []);


  return (
    <>
    <AuthContext>
       <StackNavigator/>
    </AuthContext>
    <Toast />
    </>
  )
}

export default App
