import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../constants/Colors'
import MoodCard from '../components/MoodCard'
import BodyCard from '../components/BodyCard'
import WorryCard from '../components/WorryCard'
import GratitudeCard from '../components/GratitudeCard'
import { FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'


const reflect = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => router.back()} style={styles.arrow}>
          <FontAwesome6 name='arrow-left' size={32} color={Colors.primary1}/>
        </Pressable>
        <Text style={styles.header}>Reflect</Text>
        <View style={styles.list}>
          <MoodCard />
          <BodyCard />
          <WorryCard />
          <GratitudeCard />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default reflect

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: Colors.background2,
    padding: 16,
  },
   scrollContent: {
    flexGrow: 1,
    alignItems: 'center'
  },
  arrow: {
    alignSelf: 'flex-start',
    position: 'absolute'
  },
  header: {
    fontSize: 28,
    color: Colors.primary1,
    paddingBottom: 32,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
})