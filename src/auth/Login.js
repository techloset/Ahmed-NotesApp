import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
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
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '../constants/responsive';

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
  const navigation = useNavigation();

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
    setFieldErrors({...fieldErrors, [fieldName]: null});
  };

  const handleLogin = async () => {
    try {
      await validationSchema.validate(formData, {abortEarly: false});

      handleSubmit();
    } catch (errors) {
      Toast.error("Something Went Wrong");
      const errorMessages = {};
      errors.inner.forEach(error => {
        errorMessages[error.path] = error.message;
      });
      setFieldErrors(errorMessages);
      Toast.error("Something Went Wrong");
    }
  };

  const handleSubmit = async () => {
    try {
      setloading(true);
      const response = await fetch('https://notesapp-backend-omega.vercel.app/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setloading(false);
        const usersData = await response.json();
        const userAuthData = usersData.existingUserByEmail;
        const token = usersData.token;
        Toast.success("Login Successfully");

        try {
          await AsyncStorage.setItem('Token', token);
          await AsyncStorage.setItem('UserData', JSON.stringify(userAuthData));
          console.log('userAuthData Saved==', userAuthData);
        } catch (error) {
          console.log(error);
          Toast.error("Something Went Wrong");
        }
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.log('errorrr', error);
      Toast.error("Something Went Wrong");
      setloading(false);
    } finally {
      setloading(false);
    }
  };

 
  const LoginBTN = () => {
    navigation.navigate('Register');
  };

  const signInGoogle = async () => {
    console.log('Login Start');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userinfo.user-==========', userInfo.user);
      const googlid = await AsyncStorage.setItem('GoogleId', userInfo.user.id);
      const googleUserData = await AsyncStorage.setItem(
        'GoogleUserData',
        JSON.stringify(userInfo.user),
      );
      console.log('idsaved==');
      console.log('googleUserData Saved==');
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
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('User Login with Facebooks', result);
    navigation.navigate('Settings');

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);
  }

  const forgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

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

            </View>

       
            

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
    marginTop: pixelSizeHorizontal(80),
  },
  login: {
    fontSize: fontPixel(32),
    color: '#180E25',
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 38.4,
  },
  notesIdea: {
    color: '#827D89',
    fontSize: fontPixel(16),
    marginTop: pixelSizeHorizontal(20),
    fontFamily: 'Inter',
  },
  input: {
    borderWidth: 1,
    padding: pixelSizeHorizontal(16),
    color: '#180E25',
    width: widthPixel(328),
    borderColor: '#C8C5CB',
    borderRadius: 8,
    height: heightPixel(54),
  },

  lable: {
    color: 'black',
    fontSize: fontPixel(16),
    fontWeight: '500',
    marginVertical: pixelSizeVertical(10),
    lineHeight: 22.4,
  },
  inputParent: {
    marginTop: pixelSizeHorizontal(20),
  },

  forgot: {
    color: '#6A3EA1',
    fontSize: fontPixel(16),
    marginVertical: pixelSizeVertical(15),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  Or: {
    textAlign: 'center',
    color: '#827D89',
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  left: {
    backgroundColor: '#EFEEF0',
    padding: pixelSizeHorizontal(1),
    height: heightPixel(1),
    width: widthPixel(130),
    marginTop: pixelSizeHorizontal(10),
  },
  right: {
    backgroundColor: '#EFEEF0',
    padding: pixelSizeHorizontal(1),
    height: heightPixel(1),
    width: widthPixel(130),
    marginTop: pixelSizeHorizontal(10),
  },
  parentLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: pixelSizeVertical(20),
  },
  btn: {
    backgroundColor: 'transparent',
    paddingVertical: pixelSizeVertical(15),
    paddingHorizontal: pixelSizeHorizontal(20),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: widthPixel(320),
    borderColor: '#C8C5CB',
    borderWidth: 1,
  },
  text: {
    color: '#6A3EA1',
    fontSize: fontPixel(16),
    fontWeight: '500',
    paddingLeft: pixelSizeVertical(16),
  },
  registerHere: {
    color: '#6A3EA1',
    fontSize: fontPixel(16),
    textAlign: 'center',
    marginTop: pixelSizeHorizontal(30),
    lineHeight: 22.4,
    fontWeight: '500',
  },
  iconParent: {
    width: widthPixel(45),
    height: heightPixel(45),
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
    paddingTop: pixelSizeHorizontal(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btndisable: {
    backgroundColor: 'gray',
  },
  btn: {
    backgroundColor: '#6A3EA1',
    paddingVertical: pixelSizeVertical(15),
    paddingHorizontal: pixelSizeHorizontal(20),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    width: widthPixel(328),
    height: heightPixel(54),
  },
  text: {
    color: 'white',
    fontSize: fontPixel(16),
    fontWeight: '500',
    paddingLeft: pixelSizeVertical(115),
    lineHeight: 22.4,
    fontFamily: 'Inter',
  },
  icon: {
    fontSize: fontPixel(20),
    textAlign: 'right',
    paddingLeft: pixelSizeVertical(40),
  },
});
