import { Button, StyleSheet, Text, View, TextInput, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import HeaderBack from '../components/HeaderBack'
import PurpleBtn from '../components/PurpleBtn'
import { useNavigation } from '@react-navigation/native'

const CreateNewPassword = () => {

  const navigation = useNavigation()

  const HomeScreen = () => {
    navigation.navigate('HomeScreen')
  }

  return (
    <ScrollView  style={styles.main}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
      
      <View>
        <HeaderBack title='Back to Login' />
      </View>
      <View style={styles.container}>
        <Text style={styles.forgot}>Create a  New</Text>
        <Text style={styles.forgot}>Password</Text>
        <Text style={styles.notesIdea}>Your new password should be different </Text>
        <Text style={styles.notesIdea2}>from the previous password</Text>
        <View style={styles.inputParent}>
          <Text style={styles.lable}>Email Address</Text>
          <TextInput style={styles.input} placeholderTextColor={'#180E25'} placeholder='anto_michael@gmail.com' />
          <Text style={styles.passwordValidation}>min. 8 character, combination of 0-9, A-Z, a-z</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.lable}>Retype New Password</Text>
          <TextInput style={styles.input} placeholderTextColor={'#180E25'} placeholder='********' />
        </View>
        <View style={{ marginTop: 40 }}>
          <PurpleBtn style={styles.btn} title='Send' func={HomeScreen} />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateNewPassword

const styles = StyleSheet.create({
  main:{
   backgroundColor:"white",
   flex:1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 16,
    marginTop: 140
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
  notesIdea2: {
    color: '#827D89',
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 22.4,
    fontWeight: '400',

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
    marginTop: 50
  },
  passwordValidation: {
    color: '#C8C5CB',
    fontSize: 12,
    lineHeight: 14.52,
    top: 5
  }
})