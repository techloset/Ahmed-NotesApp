import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const EditProfile = () => {
  return (
    <View style={styles.main}>
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="white"
        />
        <View style={{display: 'flex', flexDirection: 'row', gap: 80}}>
          <HeaderBack title="Settings" />
          <Text style={styles.newNotes}>Edit Profile</Text>
        </View>
        <View style={styles.line}></View>
        <Text>EditProfile</Text>

        <View style={styles.Profilepic}>
          <View>
            <Image
              style={{width: 120, height: 120}}
              source={require('../assects/images/Profile.png')}
            />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 16,
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.editBtn}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Icon
                name="edit"
                size={16}
                color={'#6A3EA1'}
                style={{marginEnd: 5, marginTop: 3}}
              />
              <Text style={styles.textbtn}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.line, styles.line2]}></View>

        <View style={styles.container}>
          <View style={styles.inputParent}>
            <Text style={styles.lable}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#180E25'}
              placeholder="Michael Antonio"
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.lable}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#180E25'}
              placeholder="anto_michael@gmail.com"
            />
            <Text style={styles.passwordValidation}>
              Changing email address information means you need to re-login to
              the apps.
            </Text>
          </View>
          <View style={{marginTop: 130}}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.text}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
    marginLeft: -10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EFEEF0',
    marginTop: 20,
  },
  Profilepic: {
    alignItems: 'center',
  },
  editBtn: {
    width: 171,
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 8,
    borderColor: '#6A3EA1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbtn: {
    color: '#6A3EA1',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 16,
    marginTop: -20,
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
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#6A3EA1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 328,
    height: 54,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
    fontFamily: 'Inter',
  },
});
