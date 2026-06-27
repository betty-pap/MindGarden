import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';

const BreathingCard = () => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/today/Breathing')} style={{width: '100%'}}>
      <View style={styles.card}>
        <Image source={require('../../assets/breath-color.png')} resizeMode='contain' style={styles.img}/>
        <Text style={styles.text}>Lélegezz fel!</Text>
      </View>
    </Pressable>
  )
}

export default BreathingCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  img: {
    width: 200,
    height: 200
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary1,
    alignSelf: 'center',
  },
})