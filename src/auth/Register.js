import {  StatusBar, StyleSheet, Text, TextInput, View,ScrollView, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import PurpleBtn from '../components/PurpleBtn'
import HeaderBack from '../components/HeaderBack'
// import auth from '@react-native-firebase/auth';
const Register = () => {

  const handleRegister=()=>{
    console.log('register'); 
   
  }

  // const navigation = useNavigation()

  // const ForgotPassword = () => {
    // navigation.navigate('ForgotPassword')
  // }
  return (
    <ScrollView style={styles.main}>
      <View>
        <HeaderBack title='Back to Login'/>
      </View>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
      <View>
        <Text style={styles.reg}>Register</Text>
        <Text style={styles.notesIdea}>And start taking notes</Text>
        <View style={styles.inputParent}>
          <Text style={styles.lable}>Full Name</Text>
          <TextInput style={styles.input} placeholderTextColor={'#C8C5CB'} placeholder='Example: John Doe' />
        </View>
        <View style={styles.inputParent}>
          <Text style={styles.lable}>Email Address</Text>
          <TextInput style={styles.input} placeholderTextColor={'#C8C5CB'} placeholder='Example: johndoe@gmail.com' />
        </View>
        <View style={styles.inputParent}>
          <Text style={styles.lable}>Password</Text>
          <TextInput style={styles.input} placeholderTextColor={'#C8C5CB'} placeholder='********' />
        </View>
        <View style={styles.inputParent}>
          <Text style={styles.lable}>Retype Password</Text>
          <TextInput style={styles.input} placeholderTextColor={'#C8C5CB'} placeholder='********' />
        </View>
        <View style={{ marginTop: 25 }}>
           <Button title='Register' onPress={handleRegister}/> 
          {/* <PurpleBtn onPress={handleRegister} style={styles.btn} title='Register' icon="arrow-right"  /> */}
        </View>

       
      </View>
    </View>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  main:{
  backgroundColor:'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 50
  },
  reg: {
    fontSize: 32,
    color: '#180E25',
    fontWeight: '700',
    fontFamily:'Inter',
    lineHeight: 38.4
  },
  notesIdea: {
    color: '#827D89',
    fontSize: 16,
    marginTop: 20,
    fontFamily:'Inter',
    lineHeight: 22.4
  },
  input: {
    borderWidth: 1,
    padding: 16,
    color: "#180E25",
    width:328,
    borderColor: '#C8C5CB',
    borderRadius: 8,
    height: 54,
    
  },

  lable: {
    color: "black",
    fontSize: 16,
    fontWeight:'500',
    marginVertical: 10,
    lineHeight: 22.4
  },
  inputParent: {
    marginTop: 20
  },

 
})