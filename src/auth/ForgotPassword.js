import { Button, StyleSheet, Text, View,TextInput , ScrollView} from 'react-native'
import React from 'react'
import HeaderBack from '../components/HeaderBack'
import PurpleBtn from '../components/PurpleBtn'
import { useNavigation } from '@react-navigation/native'

const ForgotPassword = () => {
  const navigation = useNavigation()
  const  CreateNewPassword = () => {
    navigation.navigate('CreateNewPassword')
  }

  return (
    <ScrollView style={styles.main}>
      <View>
        <HeaderBack title='Back to Login' />
      </View>
      <View style={styles.container}>
        <Text style={styles.forgot}>Forgot Password</Text>
        <Text style={styles.notesIdea}>Insert your email address to receive a code for creating a new password</Text>
      <View style={styles.inputParent}>
        <Text style={styles.lable}>Email Address</Text>
        <TextInput style={styles.input} placeholderTextColor={'#180E25'} placeholder='anto_michael@gmail.com' />
      </View>
      <View style={{ marginTop: 100 }}>
          <PurpleBtn style={styles.btn} title='Send Code' func={CreateNewPassword} />
        </View>
      </View>
    </ScrollView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  main:{
    backgroundColor:'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 16,
    marginTop: 250
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
    marginTop: 50
  }
})