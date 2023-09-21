import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
const WhiteButton = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.func} style={styles.btn}>
        <Text style={styles.text}>{props.title}</Text>
        <Icon style={styles.icon} name={props.icon} size={30} color={props.color} />
      </TouchableOpacity>
    </View>
  )
}

export default WhiteButton

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
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
    color: '#6A3EA1',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 70
  },
  icon: {
    fontSize: 20,
    textAlign: 'right',
    paddingLeft: 40,
  }
})