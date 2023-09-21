import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import { Image } from 'react-native'
const FinishedScreen = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6A3EA1" />
        <View style={styles.main}>
          <View style={styles.headerTop}>
            <View style={styles.header}>
              <Text style={styles.journey}>Amazing Journey!</Text>
              <Text style={styles.textheader}>You have successfully
                finished 5 notes</Text>
            </View>
            <View>
              <Image style={{ marginBottom: -20 }} source={require('../assects/images/finishHeader.png')} />
            </View>
          </View>
        </View>


        <View style={styles.body}>
          <View>
            <View style={styles.card1}>
              <Text style={styles.titlecard}> 💡 New Product Idea Design</Text>
              <Text style={styles.para}>
                Create a mobile app UI Kit that provide a basic notes functionality but with some improvement.
              </Text>
              <Text style={styles.para}>
                There will be a choice to select what kind of notes that user needed, so the experience while taking notes can be unique based on the needs.
              </Text>
              <View style={styles.cardFooter}>
                <Text style={{ color: '#827D89', fontSize: 10, }}>Interesting Idea</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={[styles.card1, styles.card2]}>
              <Text style={styles.titlecard}> 💡 New Product Idea Design</Text>
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assects/images/laptop.png')} style={{ width: 123, height: 80, borderRadius: 8 }} />
              </View>
              <Text style={styles.para}>
                Create a mobile app UI Kit that provide a basic notes functionality but with some improvement.
              </Text>

              <View style={[styles.cardFooter, styles.footer2]}>
                <Text style={{ color: 'white', fontSize: 10, }}>Interesting Idea</Text>
              </View>
            </View>
          </View>
        </View>




        <View style={styles.body}>
          <View>
            <View style={[styles.card1, styles.listCard]}>
              <Text style={styles.titlecard}> 🛒 Monthly Buy List</Text>
               
              <View style={{ marginLeft: 10 }} >
          <View style={styles.checkBoxParent}>
            <CheckBox
              // tintColors={
              //   true ? "blue" : ""
              // }
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)} />
            <Text style={styles.text}>&nbsp; item 1</Text>
          </View>
          <View style={styles.checkBoxParent}>
            <CheckBox
              // tintColors={
              //   true ? "white" : ""
              // }
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)} />
            <Text style={styles.text}>&nbsp; item 2</Text>
          </View>
          <View style={styles.checkBoxParent}>
            <CheckBox
              // tintColors={
              //   true ? "white" : ""
              // }
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)} />
            <Text style={styles.text}>&nbsp; item 2</Text>
          </View>
        </View>
             
              <View style={[styles.cardFooter, styles.listCardFooter]}>
                <Text style={{ color: 'black', fontSize: 10, }}>Interesting Idea</Text>
              </View>
            </View>
          </View>
          <View>
         
          </View>
        </View>

      </ScrollView>
    </GestureHandlerRootView>
  )
}
export default FinishedScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  journey: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: 'white'
  },
  headerTop: {
    backgroundColor: '#6A3EA1',
    width: 360,
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: 'center'
  },
  textheader: {
    fontSize: 12,
    fontWeight: '400',
    color: '#EFE9F7',
    width: 129
  },
  body: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
  },
  card1: {
    backgroundColor: 'white',
    width: 160,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  titlecard: {
    color: 'black',
    fontSize: 16,
    fontWeight: "500",
    padding: 16
  },
  para: {
    color: 'black',
    fontSize: 10,
    marginTop: 10,
    paddingHorizontal: 16

  },
  cardFooter: {
    backgroundColor: '#EFEEF0',
    padding: 10,
    marginTop: 20,
  },
  card2: {
    backgroundColor: '#EFE9F7'
  },
  footer2: {
    backgroundColor: '#6A3EA1',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  listCard:{
    backgroundColor:'#FDEBAB',
    marginBottom: 16
  },
  listCardFooter:{
    backgroundColor:"#DEDC52"
  },
  checkBoxParent: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#180E25',
    lineHeight: 22.4,
  }
})