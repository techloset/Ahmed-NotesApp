import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PurpleBtn from '../components/PurpleBtn';
import {useState} from 'react';
import DATA from '../constants/FlatListData'


const Item = () => (
  
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
  
);

const HomeScreen = () => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  // const navigation = useNavigation()

  // const CreateNewNotes = () => {
  //   navigation.navigate('CreateNewNotes')
  // }

  return (
    <>
       <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" />
      <View style={styles.parent}>
        <View style={styles.header}>
          <Text style={styles.pinned}>Pinned Notes</Text>
          <TouchableOpacity>
            <Text style={styles.view}>View all</Text>
          </TouchableOpacity>
        </View>

    </View>
    
    
    
     
    
    
    
    
    
    
     {/* <View style={styles.container}> */}
      {/* <View>
    //       <Image source={require('../assects/images/Home.png')} />
    //     </View>
    //     <Text style={styles.journey}>Start Your Journey</Text>
    //     <Text style={styles.text}>Every big step start  with small step.
    //       Notes your first idea and start
    //       your journey!</Text>
  //     <PurpleBtn title='New Notes'  func={CreateNewNotes}/> */}
      {/* </View> */}

      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
          horizontal
        />
      </SafeAreaView>

        <View style={styles.parent}>
        <View style={styles.header}>
          <Text style={styles.pinned}>Interesting Idea</Text>
          <TouchableOpacity>
            <Text style={styles.view}>View all</Text>
          </TouchableOpacity>
        </View>

    </View>

      <SafeAreaView style={styles.container2}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
          horizontal
        />
      </SafeAreaView>
      
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FAF8FC'
  },
  container: {
    justifyContent: 'center',
    alignItems: "center",


  },
  container2: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop:-3


  },
  journey: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28.8,
    color: '#180E25'
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    color: "#827D89",
    width: 237,
    textAlign: 'center',
    marginTop: 20
  },
  pinned: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19.6,
  },
  parent: {
    padding: 16,
    marginTop:16
  },
  view: {
    color: '#6A3EA1',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card1: {
    backgroundColor: 'white',
    width: 180,
    borderRadius: 8,
    marginHorizontal:16,
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


 
});
