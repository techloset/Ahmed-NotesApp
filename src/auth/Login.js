import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {ContextAuth} from './AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  // const {login} = useContext(AuthContext)

  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({
    email: null,
    password: null,
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [googleLogin, setGoogleLogin] = useState(null);
  // console.log("id=====",googleLogin.user.id);
 
     


  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleInputChange = (fieldName, text) => {
    setFormData({...formData, [fieldName]: text});
  };

  const handleFieldFocus = fieldName => {
    // Clear the error message when a field is focused
    setFieldErrors({...fieldErrors, [fieldName]: null});
  };

  const handleLogin = async () => {
    try {
      // Validate the form data against the schema
      await validationSchema.validate(formData, {abortEarly: false});

      // If validation succeeds,
      handleSubmit();
    } catch (errors) {
      const errorMessages = {};
      errors.inner.forEach(error => {
        errorMessages[error.path] = error.message;
      });
      setFieldErrors(errorMessages);
    }
  };

  const handleSubmit = async () => {
    try {
      setloading(true);
      // const token = await AsyncStorage.getItem('Token');
      // console.log('token in login ', token);

      const response = await fetch('http:/192.168.50.64:3000/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setloading(false);
        const usersData = await response.json();
        const userAuthData = usersData.existingUserByEmail
        const token = usersData.token
   
        try {
         await AsyncStorage.setItem("Token", token);
         await AsyncStorage.setItem('UserData', JSON.stringify(userAuthData));
            // console.log("Token Saved", token);
        console.log("userAuthData Saved==",userAuthData);

        } catch (error) {
          console.log(error);
        }
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.log('errorrr', error);
      setloading(false);
    } finally {
      setloading(false);
    }
  };
  // const {AuthData} = useContext(ContextAuth);

  // useEffect(() => {
  //   if (userData) {
  //     AuthData(userData);
  //   }
  // }, [userData]);

  useEffect(() => {
    GoogleSignin.configure({webClientId: process.env.WEB_CLIENT_ID});
  }, []);

  const navigation = useNavigation();

  const LoginBTN = () => {
    navigation.navigate('Register');
  };

  // Google Login Function
  const signInGoogle = async () => {
    console.log('Login Start');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("id-==========", userInfo.user.id)
       const googlid =  await AsyncStorage.setItem("GoogleId",userInfo.user.id)
      console.log("idsaved==");
      setGoogleLogin(userInfo);
      navigation.navigate('HomeScreen');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('some other error happened', error);
      }
    }
  };

  const {AuthData} = useContext(ContextAuth);

  useEffect(() => {
    if (googleLogin) {
      AuthData(googleLogin);
    }
  }, [googleLogin]);
  useEffect(() => {
    if (userData) {
      AuthData(userData);
    }
  }, [userData]);

  //Sign in with Facebook

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('User Login with Facebooks', result);
    navigation.navigate('Settings');

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  const forgotPassword = ()=>{
    navigation.navigate('ForgotPassword')
  }

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
        />
        <View>
          <Text style={styles.login}>Let's Login</Text>
          <Text style={styles.notesIdea}>And notes your idea</Text>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Email Address</Text>
            <TextInput
              onFocus={() => handleFieldFocus('email')}
              onChangeText={text => handleInputChange('email', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="Example: johndoe@gmail.com"
            />
          </View>
          {fieldErrors.email && (
            <Text style={{color: 'red', fontSize: 10}}>
              {fieldErrors.email}
            </Text>
          )}
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Password</Text>
            <TextInput
              onFocus={() => handleFieldFocus('password')}
              onChangeText={text => handleInputChange('password', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="********"
            />
          </View>
          {fieldErrors.password && (
            <Text style={{color: 'red', fontSize: 10}}>
              {fieldErrors.password}
            </Text>
          )}
          <TouchableOpacity onPress={forgotPassword}>
          <Text style={styles.forgot}>Forgot Password</Text>
          </TouchableOpacity>
          <View style={{marginTop: 25}}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={[styles.btn, loading && styles.btndisable]}>
              <Text style={styles.text}>
                {loading ? <>Loading...</> : 'Login'}
              </Text>
              <Icon
                style={styles.icon}
                name={'arrow-right'}
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
          </View>

          {/* <Button title='Login' color={'red'} onPress={login()}/> */}
          <View style={styles.parentLine}>
            <View style={styles.left}></View>
            <Text style={styles.Or}>Or</Text>
            <View style={styles.right}></View>
          </View>
          <View>
            <View style={styles.iconsMain}>
              <TouchableOpacity
                onPress={() => signInGoogle()}
                style={styles.iconParent}>
                <Image source={require('../assects/images/google.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onFacebookButtonPress()}
                style={styles.iconParent}>
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

            <Text style={styles.registerHere}>
              Don’t have any account?{' '}
              <Text onPress={LoginBTN}>Register here</Text>{' '}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  login: {
    fontSize: 32,
    color: '#180E25',
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 38.4,
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
    color: '#180E25',
    width: 328,
    borderColor: '#C8C5CB',
    borderRadius: 8,
    height: 54,
  },

  lable: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    lineHeight: 22.4,
  },
  inputParent: {
    marginTop: 20,
  },

  forgot: {
    color: '#6A3EA1',
    fontSize: 16,
    marginVertical: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  Or: {
    textAlign: 'center',
    color: '#827D89',
    fontSize: 12,
    fontWeight: '500',
  },
  left: {
    backgroundColor: '#EFEEF0',
    padding: 1,
    height: 1,
    width: 130,
    marginTop: 10,
  },
  right: {
    backgroundColor: '#EFEEF0',
    padding: 1,
    height: 1,
    width: 130,
    marginTop: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 320,
    borderColor: '#C8C5CB',
    borderWidth: 1,
  },
  text: {
    color: '#6A3EA1',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 15,
  },
  registerHere: {
    color: '#6A3EA1',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 22.4,
    fontWeight: '500',
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
    shadowOffset: {width: 120, height: 20},
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
    justifyContent: 'center',
  },
  btndisable: {
    backgroundColor: 'gray',
  },
  btn: {
    backgroundColor: '#6A3EA1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    width: 328,
    height: 54,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 115,
    lineHeight: 22.4,
    fontFamily: 'Inter',
  },
  icon: {
    fontSize: 20,
    textAlign: 'right',
    paddingLeft: 40,
  },
});
