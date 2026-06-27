import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --- Breathing pattern (ms). Classic 4-4-6 — tweak freely. -----------------
const INHALE_MS = 4000;
const HOLD_MS = 1500;
const EXHALE_MS = 6000;

// Size + opacity range for the illustration
const SCALE_SMALL = 0.75;
const SCALE_BIG = 1.05;
const FADE_LOW = 0.45;   // how much it dims on the exhale, not fully gone
const FADE_HIGH = 1;

type Phase = 'inhale' | 'hold' | 'exhale';

const PHASE_LABEL: Record<Phase, string> = {
  inhale: 'Breathe in…',
  hold: 'Hold',
  exhale: 'Breathe out…',
};

const Breathing = () => {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');

  // Drives scale AND the color crossfade together (0 = small/muted, 1 = big/colorful)
  const breath = useRef(new Animated.Value(0)).current;

  const scale = breath.interpolate({
    inputRange: [0, 1],
    outputRange: [SCALE_SMALL, SCALE_BIG],
  });
  const opacity = breath.interpolate({
    inputRange: [0, 1],
    outputRange: [FADE_LOW, FADE_HIGH],
  });
  // Opacity of the COLOR layer only — the grayscale layer sits underneath at all times
  const colorOpacity = breath.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (!running) return;

    let cancelled = false;

    const cycle = () => {
      if (cancelled) return;

      setPhase('inhale');
      Animated.timing(breath, {
        toValue: 1,
        duration: INHALE_MS,
        useNativeDriver: true,
      }).start(() => {
        if (cancelled) return;
        setPhase('hold');
        setTimeout(() => {
          if (cancelled) return;
          setPhase('exhale');
          Animated.timing(breath, {
            toValue: 0,
            duration: EXHALE_MS,
            useNativeDriver: true,
          }).start(() => {
            if (!cancelled) cycle(); // loop
          });
        }, HOLD_MS);
      });
    };

    cycle();

    return () => {
      cancelled = true;
    };
  }, [running]);

  const toggle = () => {
    if (running) {
      breath.stopAnimation();
      Animated.timing(breath, { toValue: 0, duration: 400, useNativeDriver: true }).start();
    }
    setRunning((r) => !r);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.arrow}>
          <FontAwesome6 name="arrow-left" size={20} color={Colors.primary1} />
        </Pressable>
        <Text style={styles.headerTitle}>Take a breath</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.stage}>
        <Animated.View style={[styles.illustrationWrap, { transform: [{ scale }], opacity }]}>
          {/* Base layer: muted / desaturated version, always visible */}
          <Image
            source={require('../../assets/lungs-gray.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
          {/* Top layer: full-color version, crossfades in on inhale */}
          <Animated.Image
            source={require('../../assets/lungs-t.png')}
            style={[styles.illustration, styles.illustrationOverlay, { opacity: colorOpacity }]}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.phaseLabel}>{running ? PHASE_LABEL[phase] : 'Ready when you are'}</Text>

        <Pressable style={styles.startButton} onPress={toggle}>
          <Text style={styles.startButtonText}>{running ? 'Stop' : 'Start breathing'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Breathing;

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
    paddingBottom: 8,
  },
  arrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary1,
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal: 24,
  },
  illustrationWrap: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_WIDTH * 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  illustrationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  phaseLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.primary1,
    marginTop: 40,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: Colors.primary1,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 32,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});