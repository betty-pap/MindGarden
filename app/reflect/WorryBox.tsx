import { useRef, useState, useEffect } from 'react';
import {StyleSheet, Text, View, TextInput, Pressable, Animated, Keyboard, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Diary palette — aged leather cover & candle-lit parchment
const diary = {
  leather: '#1A1410',
  leatherEdge: '#2B2118',
  parchment: '#F1E6C9',
  parchmentDim: '#E4D6AE',
  ink: '#2A2118',
  inkFaded: '#6B5D45',
  gold: '#C9A24B',
};

type Phase = 'idle' | 'writing' | 'sinking' | 'responding';

const RESPONSE_TEXT = 'Yes, and?';

const WorryBox = () => {
  const router = useRouter();
  const [draft, setDraft] = useState('');
  const [entryText, setEntryText] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');

  const entryOpacity = useRef(new Animated.Value(0)).current;
  const entryRise = useRef(new Animated.Value(10)).current;
  const responseOpacity = useRef(new Animated.Value(0)).current;
  const inputLift = useRef(new Animated.Value(0)).current;

  // Track the keyboard ourselves — only the input row moves, the book stays put
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(inputLift, {
        toValue: -e.endCoordinates.height + 12, // small overlap so there's no gap
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(inputLift, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = () => {
    const text = draft.trim();
    if (!text || phase !== 'idle') return;

    Keyboard.dismiss();
    setEntryText(text);
    setDraft('');
    setPhase('writing');

    entryOpacity.setValue(0);
    entryRise.setValue(10);
    responseOpacity.setValue(0);

    // the ink settles onto the page
    Animated.parallel([
      Animated.timing(entryOpacity, { toValue: 1, duration: 550, useNativeDriver: true }),
      Animated.timing(entryRise, { toValue: 0, duration: 550, useNativeDriver: true }),
    ]).start(() => {
      // hold for a beat, then let the page swallow what was written
      setTimeout(() => {
        setPhase('sinking');
        Animated.timing(entryOpacity, { toValue: 0, duration: 1000, useNativeDriver: true }).start(() => {
          setPhase('responding');
          Animated.sequence([
            Animated.timing(responseOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.delay(2400),
            Animated.timing(responseOpacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
          ]).start(() => {
            setPhase('idle');
            setEntryText('');
          });
        });
      }, 1500);
    });
  };


  const isBusy = phase !== 'idle';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body} >
        {/* The diary spread fills most of the screen */}
        <View style={styles.book}>
          <Image
            source={require('../../assets/diary-bg.png')}
            style={[
              styles.pageBgImage,
              {
                transform: [
                  { scale: 1.2 },
                  { translateX: -10 },
                  { translateY: 25 },
                ],
              },
            ]}
              resizeMode="contain"
          />
            {/* Header — same pattern as the other journal screens */}
            <View style={styles.header}>
              <Pressable onPress={() => router.back()} style={styles.arrow}>
                <FontAwesome6 name="arrow-left" size={32} color={Colors.white} />
              </Pressable>
            </View>

            <View style={{height: 100, width: SCREEN_WIDTH}}/>

            <View style={styles.lines}>
              {entryText ? (
                <Animated.Text
                  style={[
                    styles.entryText,
                    { opacity: entryOpacity, transform: [{ translateY: entryRise }] },
                  ]}
                >
                  {entryText}
                </Animated.Text>
              ) : null}

              {phase === 'responding' && (
                <Animated.Text style={[styles.responseText, { opacity: responseOpacity }]}>
                  {RESPONSE_TEXT}
                </Animated.Text>
              )}
            </View>
        </View>

        {/* Input pinned near the bottom — lifts above the keyboard on its own */}
        <Animated.View style={[styles.inputRow, { transform: [{ translateY: inputLift }] }]}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Tell the page what's weighing on you…"
            placeholderTextColor={diary.inkFaded}
            style={styles.input}
            multiline
            editable={!isBusy}
          />
          <Pressable
            onPress={handleSend}
            disabled={!draft.trim() || isBusy}
            style={[styles.sendButton, (!draft.trim() || isBusy) && styles.sendButtonDisabled]}
          >
            <FontAwesome6 name="feather-pointed" size={18} color={diary.parchment} />
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default WorryBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  arrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  book: {
    flex: 1,
    width: SCREEN_WIDTH,

  },
  page: {
    //flex: 1,
    //justifyContent: 'center',
  },
  pageBgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  lines: {
    minHeight: SCREEN_HEIGHT * 0.18,
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
  },
  entryText: {
    fontSize: 16,
    color: diary.ink,
    fontStyle: 'italic',
    lineHeight: 30,
    textAlign: 'left',
    width: '70%'
  },
  responseText: {
    fontSize: 18,
    color: diary.gold,
    fontWeight: '600',
    fontStyle: 'italic',
    marginTop: 18,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 16,
    gap: 10,
    //paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    backgroundColor: diary.leather,
    color: diary.parchment,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    maxHeight: 110,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: diary.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.8,
  },
});