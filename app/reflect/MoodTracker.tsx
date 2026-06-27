import { StyleSheet, Text, View, Image, Pressable, Dimensions, FlatList } from 'react-native'
import { Colors } from '@/constants/Colors'
import { FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const moods = [
  {
    label: 'Sunny',
    description: 'Bright & energised',
    image: require('../../assets/sun-t.png'),
    bgColor: '#FFF6DC',
    textColor: '#B8860B',
    imageScale: 1.2,
  },
  {
    label: 'Rainy',
    description: 'A bit heavy-hearted',
    image: require('../../assets/rain-t.png'),
    bgColor: '#DCEBF7',
    textColor: '#2E6CA4',
    imageScale: 1.3,
  },
  {
    label: 'Stormy',
    description: 'Intense & turbulent',
    image: require('../../assets/storm-t.png'),
    bgColor: '#D9D9D6',
    textColor: '#4A4A45',
    imageScale: 1.35, 
  },
  {
    label: 'Foggy',
    description: 'Numb, hard to think',
    image: require('../../assets/fog-t.png'),
    bgColor: '#E6E6E1',
    textColor: '#7A7A72',
    imageScale: 1.2,
  },
  {
    label: 'Rainbow',
    description: 'Mixed but hopeful',
    image: require('../../assets/rainbow-t.png'),
    bgColor: '#FBEFFB',
    textColor: '#8C4FA8',
    imageScale: 1.2,
  },
];

const MoodTracker = () => {
  const router = useRouter();

  const handleChoose = (mood) => {
    console.log('Chosen mood:', mood.label);
    // TODO: save mood, then maybe navigate back
    // router.back();
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={moods}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bgColor }]}>
            <Image
              source={require('../../assets/clouds-bg.jpg')}
              style={styles.clouds}
              resizeMode="cover"
            />

            {/* Header */}
            <View style={styles.header}>
              <Pressable onPress={() => router.back()} style={styles.arrow}>
                <FontAwesome6 name="arrow-left" size={32} color={item.textColor} />
              </Pressable>
              <Text style={[styles.headerTitle, { color: item.textColor }]}>
                How's the weather{'\n'}inside you?
              </Text>
            </View>

            <View style={styles.illustrationWrap}>
              <Pressable onPress={() => handleChoose(item)}>
                <Image 
                source={item.image} 
                style={[
                  styles.illustration,
                  {
                    width: SCREEN_WIDTH * (item.imageScale ?? 0.78),
                    height: SCREEN_WIDTH * (item.imageScale ?? 0.78),
                  },
                ]}
                resizeMode="contain" />
              </Pressable>
            </View>
 
            <Text style={[styles.moodLabel, { color: item.textColor }]}>
              {item.label}
            </Text>
            <Text style={[styles.moodDesc, { color: item.textColor }]}>
              {item.description}
            </Text>
 
            <Pressable 
            style={[styles.chooseButton, { backgroundColor: item.textColor }]} onPress={() => handleChoose(item)}>
              <Text style={styles.chooseButtonText}>
                Choose {item.label}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
    
  )
}

export default MoodTracker

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clouds: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  arrow: {
    width: 40,
    height: 40,
  },
  header: {
    paddingTop: 16,
    alignSelf:'flex-start',
    paddingLeft: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '500',
    color: Colors.secondary,
    textAlign: 'left',
    lineHeight: 36,
    paddingTop: 16,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  illustrationWrap: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
  },
  moodLabel: {
    fontSize: 26,
    fontWeight: '500',
    color: Colors.primary1,
    textAlign: 'center',
  },
  moodDesc: {
    fontSize: 15,
    color: Colors.button,
    marginTop: 6,
    textAlign: 'center',
  },
  chooseButton: {
    backgroundColor: Colors.primary1,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 24,
  },
  chooseButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
})