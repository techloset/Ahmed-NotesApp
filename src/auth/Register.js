import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import PurpleBtn from '../components/PurpleBtn';
import HeaderBack from '../components/HeaderBack';
// import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (fieldName, text) => {
    setFormData({ ...formData, [fieldName]: text });
  };

  const handleRegister = () => {
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
  };

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
               onChangeText={(text) => handleInputChange('name', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="Example: John Doe"
            />
          </View>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Email Address</Text>
            <TextInput
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="Example: johndoe@gmail.com"
            />
          </View>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Password</Text>
            <TextInput
             value={formData.password}
             onChangeText={(text) => handleInputChange('password', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="********"
            />
          </View>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Retype Password</Text>
            <TextInput
              secureTextEntry={true}
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              style={styles.input}
              placeholderTextColor={'#C8C5CB'}
              placeholder="********"
            />
          </View>
          <View style={{marginTop: 25}}>
            <View>
              <TouchableOpacity onPress={handleRegister} style={styles.btn}>
                <Text style={styles.text}>Register</Text>
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
});
