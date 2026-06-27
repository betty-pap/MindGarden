import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';

const WorryCard = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/reflect/WorryBox')} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Worry Notes</Text>
      </View>
    </Pressable>
  )
}

export default WorryCard

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    backgroundColor: '#e6edf3dc',
    borderRadius: 24,
    height: 168,
    //alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
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