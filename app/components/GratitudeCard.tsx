import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const GratitudeCard = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/reflect/GratitudeJar')} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Gratitude Jar</Text>
      </View>
    </Pressable>
  )
}

export default GratitudeCard

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