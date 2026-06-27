import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';

const MoodCard = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/reflect/MoodTracker')}>
      <View style={styles.card}>
        <Image source={require('../../assets/storm-t.png')} style={styles.img}
        resizeMode="contain"/>
        <Text style={styles.text}>Mood</Text>
      </View>
    </Pressable>
  )
}

export default MoodCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e6edf3dc',
    borderRadius: 24,
    height: 168,
    width: 168,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  img: {
    width: 250,
    height: 160,
  },
  text: {
    position: 'absolute', 
    bottom: 10,
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A45',
  },
})