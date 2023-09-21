import { StyleSheet, Text, View , TouchableOpacity, ScrollView, StatusBar, TextInput} from 'react-native'
import React from 'react'
// import Icon from 'react-native-vector-icons/Feather';
import HeaderBack from '../components/HeaderBack';
import WhiteButton from '../components/WhiteButton';
import Icon from 'react-native-vector-icons/FontAwesome6';

const ChangePassword = () => {
  return (
    <View style={styles.main}>
    <ScrollView>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
      />
      <View style={{display: 'flex', flexDirection: 'row', gap: 80}}>
        <HeaderBack title="Settings" />
        <Text style={styles.newNotes}>Change Password</Text>
      </View>
      <View style={styles.line}></View>
      <Text>EditProfile</Text>

      <View style={[styles.inputParent, styles.container]}>
         <Text style={styles.currentPassword}>Please input your current password first</Text>
          <Text style={styles.lable}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#180E25'}
            placeholder="***********"
          />
        </View>
     

      <View style={[styles.line, styles.line2]}></View>

      <View style={styles.container}>
        <View style={styles.inputParent}>
      <Text style={styles.currentPassword}>Now, create your new password</Text>
          <Text style={styles.lable}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#180E25'}
            placeholder="************"
          />
             <Text style={styles.passwordValidation}>
             Password should contain a-z, A-Z, 0-9
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.lable}>Retype New Password</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#180E25'}
            placeholder="************"
          />
       
        </View>
        <View style={{marginTop: 130}}>
        <View>
      <TouchableOpacity  style={styles.btn}>
        <Text style={styles.text}>Submit New Password</Text>
        <Icon style={styles.icon} name='arrow-right' size={30} color={'white'} />
      </TouchableOpacity>
    </View>
        </View>
      </View>
    </ScrollView>
  </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: 'white',
    },
    newNotes: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000000',
      textAlign: 'center',
      marginTop: 15,
      lineHeight: 22.4,
      marginLeft: -30,
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: '#EFEEF0',
      marginTop: 20,
    },
 
  
    container: {
      flex: 1,
      justifyContent: 'center',
      left: 16,
      marginTop: 10,
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
      marginTop: 30,
    },
    passwordValidation: {
      color: '#C8C5CB',
      fontSize: 12,
      lineHeight: 14.52,
      top: 5,
      width: 280,
    },
    line2: {
      marginHorizontal: 2,
      width: '90%',
      marginStart: 16,
      marginTop: 24,
    },
 
    currentPassword:{
        fontSize:12,
        fontWeight:'500',
        color:'#6A3EA1',
        marginBottom:12
    },
    btn: {
        backgroundColor: '#6A3EA1',
        paddingVertical: 15,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:'center',
        borderRadius: 50,
        width: 320
      },
      text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 60
      },
      icon: {
        fontSize: 20,
        textAlign: 'right',
        paddingLeft: 40,
      }
  });