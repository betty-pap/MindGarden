import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors'
import { FontAwesome6 } from "@expo/vector-icons";
import Quote from "../today/Quote";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background2,}}>

      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notification}>
          <FontAwesome6 name='bell' color={Colors.primary1} size={32}/>
        </View>
        <Text style={styles.header}>Hi, Betty!</Text>
        <View style={styles.illustration}>
          <Image source={require('../../assets/blob3.png')} style={styles.blob} />
          <Image source={require('../../assets/head-transparent.png')} style={styles.img} resizeMode="contain"/>
        </View>

        <Quote />

      </ScrollView>
    </SafeAreaView>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center'
  },
  notification: {
    borderBlockColor: Colors.primary1,
    borderRadius: '50%',
    height: 40,
    width: 40,
    alignSelf: 'flex-end'
  },
  header: {
    fontSize: 28,
    color: Colors.primary1,
  },
  illustration: {
    width: 420,
    height: 485,
    top: -32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  blob: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ rotate: '45deg' }],
  },
  img: {
    width: '70%',
    height: '70%',
  }
})
