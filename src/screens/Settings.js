import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { ScrollView } from 'react-native';
import HeaderBack from '../components/HeaderBack';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconF from 'react-native-vector-icons/SimpleLineIcons';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import React, { useState, useContext } from 'react';
import IconA from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import  AuthContext, { ContextAuth } from '../auth/AuthContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleLogout, setModalVisibleLogout] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleLogout = () => {
    setModalVisibleLogout(!isModalVisibleLogout);
  };

  const navigation = useNavigation()



const {userInfo, AuthData} = useContext(ContextAuth)


const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    AuthData( null );
    navigation.navigate('Login') // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
  console.log('Logout');
};



  return (
    <>
      <View style={styles.main}>
        <ScrollView>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="white"
          />
          <View style={{ display: 'flex', flexDirection: 'row', gap: 80 }}>
            <HeaderBack title="Back" />
            <Text style={styles.newNotes}>Settings</Text>
          </View>
          <View style={styles.line}></View>

          <View style={styles.ProfileInfo}>
            <View>
              <Image source={{uri:userInfo && userInfo.user.photo}} style={{width:65, height:65, borderRadius:100}} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.name}>
                {userInfo && userInfo.user.name}</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
                <Icon
                  name="mail"
                  size={12}
                  color={'#827D89'}
                  style={{ marginTop: 3 }}
                />
                <Text style={{ fontSize: 12, color: '#827D89' }}>
                {userInfo && userInfo.user.email}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 16, marginTop: 20 }}>
            <TouchableOpacity style={styles.editBtn}>
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
          <View style={styles.appSetting}>
            <Text style={styles.setting}>APP SETTINGS</Text>
          </View>

          <View style={styles.parentlist}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <IconF
                style={{ marginRight: 8, marginTop: -5 }}
                name="lock"
                size={25}
                color={'black'}
              />
              <Text style={styles.remainder}>Change Password</Text>
            </View>
            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <IconMa
                  style={{ marginRight: 5 }}
                  name="arrow-forward-ios"
                  size={16}
                  color={'#827D89'}
                />
              </View>
            </View>
          </View>

          <View style={styles.parentlist}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ marginRight: 8, marginTop: -1 }}>
                <Image source={require('../assects/images/text-size.png')} />
              </View>
              <Text style={styles.remainder}>Text Size</Text>
            </View>
            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.leftmenu}>Medium</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.parentlist}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Icon
                  style={{ marginRight: 8, marginTop: -3 }}
                  name="bell"
                  size={25}
                  color={'black'}
                />
                <Text style={styles.remainder}>Notifications</Text>
              </View>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.leftmenu}>All active</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.line, styles.line2]}></View>

          <TouchableOpacity onPress={toggleLogout} >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 12,
                marginLeft: 20,
              }}>
              <Iconm
                style={{ marginTop: 2, marginRight: 14 }}
                name="logout"
                size={20}
                color={'#CE3A54'}
              />
              <Text style={styles.delete}>Log Out</Text>
            </View>
          </TouchableOpacity>

          <View style={{ display: 'flex', marginTop: 200 }}>
            <Text style={styles.footer}>Makarya Notes v1.1</Text>
          </View>
        </ScrollView>
      </View>










      <View>
        <Modal style={styles.model} isVisible={isModalVisible}>
          <View style={{ display: 'flex', alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: '#EFEEF0',
                padding: 6,
                borderRadius: 100,
              }}>
              <IconA
                name="close"
                size={14}
                color={'black'}
                onPress={toggleModal}
              />
            </View>
          </View>
          <View style={[styles.parentlist, styles.modelNotify]}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={[styles.remainder, styles.notification]}>
                Email Notifiations
              </Text>
            </View>
            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Switch
                  trackColor={{ false: '#EFE9F7', true: '#EFE9F7' }}
                  thumbColor={isEnabled ? '#6A3EA1' : '#EFE9F7'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>

          <View style={[styles.parentlist, styles.modelnotify2]}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={[styles.remainder, styles.notification]}>
                Email Notifiations
              </Text>
            </View>
            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={styles.container}>
                  <Switch
                    trackColor={{ false: '#EFE9F7', true: '#EFE9F7' }}
                    thumbColor={isEnabled ? '#6A3EA1' : '#EFE9F7'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>











      <View>
        <Modal style={styles.model2} isVisible={isModalVisibleLogout}>
          <View style={styles.modelDiv}>
            <View>
              <Text style={styles.logouttext}>Log Out</Text>
              <View>
                <Text style={styles.para}>Are you sure you want to log out from the application?</Text>
              </View>
              <View style={styles.btnsParent}>
                <TouchableOpacity onPress={toggleLogout} style={styles.cencelbtn}>
                   <Text style={styles.cencelbtntext}>Cencel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signOut} style={[styles.cencelbtn, styles.yesBtn]}>
                   <Text style={[styles.cencelbtntext, styles.yesText]}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>



        </Modal>
      </View>




    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    // paddingLeft:16,
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EFEEF0',
    marginTop: 20,
  },
  newNotes: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: 13,
    lineHeight: 22.4,
  },
  ProfileInfo: {
    marginLeft: 16,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: 'black',
  },
  editBtn: {
    width: '328',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
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
  line2: {
    marginHorizontal: 2,
    width: '90%',
    marginStart: 16,
    marginTop: 20,
  },
  appSetting: {
    padding: 16,
    marginTop: 5,
  },
  setting: {
    fontSize: 12,
    fontWeight: '400',
    color: '#827D89',
  },
  remainder: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
    color: '#180E25',
  },
  parentlist: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  leftmenu: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.52,
    color: '#827D89',
    marginTop: -2,
  },
  delete: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4,
    color: '#CE3A54',
  },
  footer: {
    fontSize: 12,
    fontWeight: '400',
    color: '#C8C5CB',
    textAlign: 'center',
  },
  model: {
    backgroundColor: 'white',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    width: '100%',
    height: 360,
    marginTop: 560,
    marginBottom: -1,
    marginLeft: -1,
    padding: 16,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  notification: {
    marginTop: 5,
  },
  modelNotify: {
    marginBottom: 26,
  },
  modelnotify2: {
    marginTop: -0,
  },
  model2: {
    margin: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modelDiv: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: 280,
    borderRadius: 16

  },
  logouttext: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center'
  },
  para: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22.4,
    color: '#827D89',
    textAlign: 'center',
    marginTop: 12
  },
  cencelbtntext:{
    fontSize:16,
    fontWeight:'500',
    color:'#6A3EA1'
  },
  cencelbtn:{
    width:108,
    // height:38,
    borderWidth: 1,
    borderColor:'#6A3EA1',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
    marginTop:48,
    paddingHorizontal:16,
    paddingVertical:8
  },
  yesBtn:{
    backgroundColor:'#6A3EA1'
  },
  yesText:{
    color:'white'
  },
  btnsParent:{
    display:'flex',
    flexDirection:'row',
    gap:16
  }
});
