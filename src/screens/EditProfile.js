import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { DeviceEventEmitter } from 'react-native'
import { ScrollView } from 'react-native';
import HeaderBack from '../components/HeaderBack';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [updatedname, setname] = useState('');
  const [updatedemail, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const storedData = await AsyncStorage.getItem('UserData');
        const userData = JSON.parse(storedData);
        console.log('Data==', userData);
        setUserData(userData);

        if (userData && userData.name) {
          setname(userData.name);
        }

        if (userData && userData.email) {
          setEmail(userData.email);
        }
      } catch (error) {
        console.error('Error checking login status: ', error);
      }
    }

    checkLoginStatus();
  }, []);


   const navigation = useNavigation()
  const handleSaveChanges =async () => {
    setLoading(true)
    try {
      
      const response = await fetch('http:/192.168.50.64:3000/api/user/editProfile',{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
       body :JSON.stringify({name:updatedname , email:updatedemail, oldemail:userData.email })
      })
      if(response.ok){
        setLoading(false)
        console.log(updatedname, updatedemail);
        const updatedUserData = { ...userData, name: updatedname, email: updatedemail};
        await AsyncStorage.setItem('UserData', JSON.stringify(updatedUserData));
        
        // Update the state
        setUserData(updatedUserData);
        navigation.navigate('Login')
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }finally{
      setLoading(false)
    }

    // Add code here to save user data
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery to select an image.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickImage();
      } else {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = () => {
    setLoading(true); // Set loading to true when fetching new image
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, async (response) => {
      setLoading(false); // Set loading to false when image fetch is done
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        console.log('Selected Image URI: ', uri);
        await AsyncStorage.setItem('Profile', uri);
        setProfileImage(uri);
        DeviceEventEmitter.emit('profileImageChanged', uri);
      }
    });
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const uri = await AsyncStorage.getItem('Profile');
        setProfileImage(uri);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  const defaultProfileImage = require('../assects/images/user.png');
  return (
    <View style={styles.main}>
      <ScrollView>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
        />
        <View style={{ display: 'flex', flexDirection: 'row', gap: 80 }}>
          <HeaderBack title="Settings" />
          <Text style={styles.newNotes}>Edit Profile</Text>
        </View>
        <View style={styles.line}></View>
        <Text>EditProfile</Text>

        <View style={styles.Profilepic}>
          <View key={profileImage || 'defaultImage'}>
          
              <Image
                source={profileImage ? { uri: profileImage } : defaultProfileImage}
                style={{ width: 120, height: 120, borderRadius: 100 }}
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
          <TouchableOpacity style={styles.editBtn} onPress={requestGalleryPermission}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Icon
                name="edit"
                size={16}
                color={'#6A3EA1'}
                style={{ marginEnd: 5, marginTop: 3 }}
              />
              <Text style={styles.textbtn}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.line, styles.line2]}></View>

        <View style={styles.container}>
          <View style={styles.inputParent}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#180E25'}
              placeholder="Michael Antonio"
              value={updatedname}
              onChangeText={setname}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#180E25'}
              placeholder="anto_michael@gmail.com"
              value={updatedemail}
              onChangeText={setEmail}
            />
            <Text style={styles.passwordValidation}>
              Changing email address information means you need to re-login to
              the app.
            </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity style={styles.btn} onPress={handleSaveChanges}>
              <Text style={styles.text}>{loading?"Loading...": "Save Changes"}</Text>
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
  label: {
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
