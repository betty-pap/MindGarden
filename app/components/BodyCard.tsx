import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';
import { FontAwesome6 } from '@expo/vector-icons';

const BodyCard = () => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/reflect/BodyCheckIn')}>
      <View style={styles.card}>
        <FontAwesome6 name='child-reaching' size={64} />
        <Text style={styles.text}>Body Check In</Text>
      </View>
    </Pressable>
)
}

export default BodyCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary1,
    borderRadius: 25,
    height: 168,
    width: 168,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    // justifyContent: 'center',
    // alignContent: 'center',
  }
})