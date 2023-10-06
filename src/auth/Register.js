import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderBack from '../components/HeaderBack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import IconF from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextAuth } from './AuthContext';
const Register = () => {
  const navigation = useNavigation();

  const [loading, setloading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [userData, setUserData] =  useState(null)

  const handleInputChange = (fieldName, text) => {
    setFormData({...formData, [fieldName]: text});
  };

  const handleFieldFocus = fieldName => {
    // Clear the error message when a field is focused
    setFieldErrors({...fieldErrors, [fieldName]: null});
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleRegister = async () => {
    try {
      // Validate the form data against the schema
      await validationSchema.validate(formData, {abortEarly: false});

      // If validation succeeds

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
      setloading(true)
      const response = await fetch('http://192.168.50.64:3000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        setloading(false)
        // const usersData = await response.json();
        // console.log("userData========>", usersData);
        // const token = usersData.token; // Correct way to access the token
  
        // try {
        //   // Save user data and token separately
        //   await AsyncStorage.setItem("UserData", JSON.stringify(usersData));
        //   await AsyncStorage.setItem("Token", token);
        //   console.log("User data and token saved:", usersData, token);
        // } catch (error) {
        //   console.error(error);
        // }
        navigation.navigate('Login');
      } else {
        console.error('API Error - Status Code:', response.status);
        const responseText = await response.text();
        console.error('API Error - Response Text:', responseText);
        setloading(false)
      }
    } catch (error) {
      console.log(error);
      setloading(false)
    }

  };


  // const {AuthData} = useContext(ContextAuth);

  // useEffect(() => {
  //   if (userData) {
  //     AuthData(userData);
  //   }
  // }, [userData]);

  return (
    <ScrollView style={styles.main}>
      <View>
        <HeaderBack title="Back to Login" />
      </View>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
        />
        <View>
          <Text style={styles.reg}>Register</Text>
          <Text style={styles.notesIdea}>And start taking notes</Text>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Full Name</Text>
            <TextInput
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="Example: John Doe"
              onFocus={() => handleFieldFocus('name')}
            />
          </View>
          {fieldErrors.name && (
            <Text style={{color: 'red', fontSize: 10}}>{fieldErrors.name}</Text>
          )}
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Email Address</Text>
            <TextInput
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="Example: johndoe@gmail.com"
              onFocus={() => handleFieldFocus('email')}
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
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="********"
              secureTextEntry={!showPassword}
              onFocus={() => handleFieldFocus('password')}
            />

            <View style={styles.iconParent}>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                <IconF
                  name={showPassword ? 'eye' : 'eye-slash'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          {fieldErrors.password && (
            <Text style={{color: 'red', fontSize: 10}}>
              {fieldErrors.password}
            </Text>
          )}
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Retype Password</Text>
            <TextInput
              secureTextEntry={true}
              value={formData.confirmPassword}
              onChangeText={text => handleInputChange('confirmPassword', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="********"
              onFocus={() => handleFieldFocus('confirmPassword')}
            />
          </View>
          {fieldErrors.confirmPassword && (
            <Text style={{color: 'red', fontSize: 10}}>
              {fieldErrors.confirmPassword}
            </Text>
          )}

          <View style={{marginTop: 25}}>
            <View>
              <TouchableOpacity onPress={handleRegister} disabled={loading} style={[styles.btn, loading && styles.btndisable]}>
                <Text style={styles.text}>
                  
                  {loading ? ( <>Loading...</>):'Register'}
                </Text>
                <Icon
                  style={styles.icon}
                  name={'arrow-right'}
                  size={30}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  reg: {
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
    lineHeight: 22.4,
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
  eyeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: -53,
    marginRight: 10,
    textAlign: 'right',
    width: 20,
  },

  iconParent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btndisable:{
    backgroundColor:'gray'
  }
});
