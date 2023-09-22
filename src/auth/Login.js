import { Image, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState , useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import PurpleBtn from '../components/PurpleBtn';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { ContextAuth } from './AuthContext';



const Login = () => {

  const [googleLogin, setGoogleLogin] = useState(null)

  useEffect(() => {
    GoogleSignin.configure({ webClientId: process.env.WEB_CLIENT_ID });
  }, [])


  const navigation = useNavigation()

  const LoginBTN = () => {
    navigation.navigate('Register')
  }



  // Google Login Function
  const signIn = async () => {
    console.log('Login Start');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoogleLogin(userInfo);
      navigation.navigate('Settings')
      // console.log('User login', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already') 
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
       
        console.log('play services not available or outdated') 

      } else {
        console.log('some other error happened', error);
      }
    }
  };




  const {AuthData} = useContext(ContextAuth)
  
  useEffect(() => {
    if (googleLogin) {
       AuthData(googleLogin)
     }
     }, [googleLogin])
   

  
     //Sign in with Facebook

     async function onFacebookButtonPress() {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    console.log('User Login with Facebooks', result);
    navigation.navigate('Settings')

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
    
      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();
    
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
    
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    
      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    }







  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
        <View>
          <Text style={styles.login}>Let's Login
          {/* {googleLogin && googleLogin.user.name}
          {googleLogin && googleLogin.user.email}
          {<Image source={googleLogin && {uri:googleLogin.user.photo}}style={{width:100, height:100}}/>} */}
         
          
          
          </Text>
          <Text style={styles.notesIdea}>And notes your idea</Text>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Email Address</Text>
            <TextInput style={styles.input} placeholderTextColor={'#C8C5CB'} placeholder='Example: johndoe@gmail.com' />
          </View>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Password</Text>
            <TextInput style={styles.input} placeholderTextColor={'#C8C5CB'} placeholder='********' />
          </View>
          <Text style={styles.forgot}>Forgot Password</Text>
          <View style={{ marginTop: 25 }}>
            <PurpleBtn style={styles.btn} title='Login' icon="arrow-right" func={LoginBTN} />
          </View>

          <View style={styles.parentLine}>
            <View style={styles.left}></View>
            <Text style={styles.Or}>Or</Text>
            <View style={styles.right}></View>
          </View>
          <View>

            <View style={styles.iconsMain}>
              <TouchableOpacity onPress={()=>signIn()} style={styles.iconParent}>
                <Image source={require('../assects/images/google.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onFacebookButtonPress()} style={styles.iconParent}>
                <Image source={require('../assects/images/facebook.png')} />
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.iconParent}>
            <Image source={require('../../assets/apple.png')} />
          </TouchableOpacity> */}
            </View>

            {/* <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Image source={require('../assects/images/google.png')} />
              <Text style={styles.text}>Login with Google</Text>
            </TouchableOpacity> */}

            <Text style={styles.registerHere}>Don’t have any account? <Text onPress={LoginBTN}>Register here</Text> </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 80,

  },
  login: {
    fontSize: 32,
    color: '#180E25',
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 38.4
  },
  notesIdea: {
    color: '#827D89',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Inter',
  },
  input: {
    borderWidth: 1,
    padding: 16,
    color: "#180E25",
    width: 328,
    borderColor: '#C8C5CB',
    borderRadius: 8,
    height: 54,

  },

  lable: {
    color: "black",
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    lineHeight: 22.4
  },
  inputParent: {
    marginTop: 20
  },

  forgot: {
    color: "#6A3EA1",
    fontSize: 16,
    marginVertical: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  Or: {
    textAlign: 'center',
    color: '#827D89',
    fontSize: 12,
    fontWeight: "500"

  },
  left: {
    backgroundColor: "#EFEEF0",
    padding: 1,
    height: 1,
    width: 130,
    marginTop: 10
  },
  right: {
    backgroundColor: "#EFEEF0",
    padding: 1,
    height: 1,
    width: 130,
    marginTop: 10
  },
  parentLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  btn: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 100,
    width: 320,
    borderColor: "#C8C5CB",
    borderWidth: 1,
  },
  text: {
    color: '#6A3EA1',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 15
  },
  registerHere: {
    color: '#6A3EA1',
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
    lineHeight: 22.4,
    fontWeight: '500'

  },
  iconParent: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 120, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 7,
  },

  iconsMain: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 15,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
})