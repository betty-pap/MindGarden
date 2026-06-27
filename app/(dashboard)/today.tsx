import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import Quote from '../today/Quote'
import WinTheDay from '../today/WinTheDay'
import BreathingCard from '../components/BreathingCard'


const Today = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.arrow}>
          <FontAwesome6 name='arrow-left' size={32} color={Colors.primary1}/>
        </Pressable>
        <Text style={styles.header}>Today</Text>

        <Quote />
        <WinTheDay />
        <BreathingCard />
      </View>
    </SafeAreaView>
  )
}

export default Today

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: Colors.background2,
    padding: 16,
  },
  container: {
    flex: 1,
    //padding: 16,
    alignItems: 'center'
  },
  arrow: {
    alignSelf: 'flex-start',
    position: 'absolute'
  },
  header: {
    fontSize: 28,
    color: Colors.primary1,
    marginBottom: 24,
  },
})