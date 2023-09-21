import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import HeaderBack from '../components/HeaderBack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import { BorderOutlined } from '@ant-design/icons';
import BottomMenuBar from '../navigation/BottomMenuBar';


const BuyingSomeThing = () => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <View style={styles.main}>

      <View>
        <HeaderBack title='Back' />
      </View>
      <View style={styles.line}></View>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buyDiv}>
          <Text style={styles.buysome}>
            {/* <Icon name='cart-variant' size={32} color={'black'} style={styles.carte} /> */}
            🛒 Monthly  Needs</Text>
        </View>

        <View style={{ marginTop: 20 }} >
          <View style={styles.checkBoxParent}>
            <CheckBox
              tintColors={
                true ? "blue" : ""
              }
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)} />
            <Text style={styles.text}>&nbsp;A box of instant noodles</Text>
          </View>
          <View style={styles.checkBoxParent}>
            <CheckBox
              tintColors={
                true ? "blue" : ""
              }
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)} />
            <Text style={styles.text}>&nbsp;3 box of coffee</Text>
          </View>
        </View>
       <TouchableOpacity>

        <View style={{display:'flex', flexDirection:"row", alignItems:"center", marginTop:20, padding:8}}>
          <Text style={{color:"#6A3EA1", fontSize:20}}>+ &nbsp;</Text>
          <Text style={styles.addcheck}> Add Checkbox</Text>
        </View>
       </TouchableOpacity>

      <View style={styles.line}></View>
      <View>
        <Text style={styles.reminder}>Reminder set on 15/07/2021, 18:30</Text>
      </View>
      <View style={{display:"flex", flexDirection:"row", gap:10, flexWrap:'wrap'}}>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.btntext}>Important</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.btntext}>Top Priority</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.btntext}>Should Be Important in this week</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.btntext}>Important</Text>
      </TouchableOpacity>
        
      </View>
      </View>
    </ScrollView>
    <BottomMenuBar/>
</View>
  )
}

export default BuyingSomeThing

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex:1
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EFEEF0',
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20

  },
  buysome: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38.4,
    marginTop: 10,
  },
  carte: {
    display: "none",
    transform: [{ rotate: '200deg' }],
  },
  checkBoxParent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#180E25',
    lineHeight: 22.4,
    marginTop: 5
  },
  addcheck:{
    color:"#6A3EA1",
    fontSize:16,
    textDecorationLine:"underline"
  },
  reminder:{
    fontSize:12,
    fontWeight:"400",
    lineHeight:14.52,
    color:"#827D89",
    marginTop:25
  },
  btns:{
    width:'auto',
       borderRadius:100,
    backgroundColor:"#EFEEF0", 
    marginTop:20,
    display:'flex',
    justifyContent:"center",
    alignItems:'center',
    padding:8

  },
  btntext:{
    fontSize:12,
    fontWeight:'400',
    color:"#827D89"
  }
})