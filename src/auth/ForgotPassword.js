import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import HeaderBack from '../components/HeaderBack';
import PurpleBtn from '../components/PurpleBtn';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import uuid from "react-native-uuid"
import { ContextAuth } from './AuthContext';
const ForgotPassword = () => {
  const [email, setEmail] = useState({
    email: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: null,
  });

  const [loading, setLoading] = useState(false)

  const validateEmail = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleFieldFocus = fieldName => {
    // Clear the error message when a field is focused
    setFieldErrors({...fieldErrors, [fieldName]: null});
  };


  const code = uuid.v4().slice(0,4)
  // console.log("emailcode", code);



  const navigation = useNavigation()
  const emailCode = async () => {
    setLoading(true)
    try {
      await validateEmail.validate(email, {abortEarly: false});

      // Make a POST request to the Next.js API route when the user submits their email
     const response = await fetch('http:/192.168.50.64:3000/api/user/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:email.email, code:code}), // Replace with user input
      })


      // console.log(email);
      if(response.ok){
        setLoading(false)
        navigation.navigate('EmailCode')
      }
    } catch (error) {
      setLoading(false)
      const errorMessages = {};
      error.inner.forEach(error => {
        console.log(error);
        errorMessages[error.path] = error.message;
      });
      setFieldErrors(errorMessages);
    }finally{
      setLoading(false)
    }
  };

  return (
    <ScrollView style={styles.main}>
      <View>
        <HeaderBack title="Back to Login" />
      </View>
      <View style={styles.container}>
        <Text style={styles.forgot}>Forgot Password</Text>
        <Text style={styles.notesIdea}>
          Insert your email address to receive a code for creating a new
          password
        </Text>
        <View style={styles.inputParent}>
          <Text style={styles.lable}>Email Address</Text>
          <TextInput
            onFocus={() => handleFieldFocus('email')}
            onChangeText={e => setEmail({email: e})}
            style={styles.input}
            placeholderTextColor={'#180E25'}
            placeholder="anto_michael@gmail.com"
          />
          {fieldErrors.email && (
            <Text style={{color: 'red', fontSize: 10}}>
              {fieldErrors.email}
            </Text>
          )}
        </View>
        <View style={{marginTop: 100}}>
          <View>
            <TouchableOpacity onPress={emailCode} style={[ styles.btn ,loading && styles.loadbtn]} disabled={loading}>
              <Text style={styles.text}>{loading?"Loading...":"Submit"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 16,
    marginTop: 250,
  },
  forgot: {
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
    fontWeight: '400',
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
    marginTop: 50,
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
  loadbtn:{
    backgroundColor:"gray"
  }
});
