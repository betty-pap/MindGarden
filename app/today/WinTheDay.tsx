import { useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Animated, Keyboard, LayoutAnimation, Platform } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true)
// }

// Warm, encouraging palette — distinct from the quote card so it reads as its own moment
const palette = {
  bg: '#FCEFE1',
  bgDone: '#E9F3E3',
  border: '#E8B98C',
  borderDone: '#A9CB9A',
  text: '#7A4A23',
  textDone: '#3D6B36',
  accent: '#D98C3F',
}

type Stage = 'idle' | 'answering' | 'done'

const WinTheDay = () => {
  const [stage, setStage] = useState<Stage>('idle')
  const [draft, setDraft] = useState('')
  const fade = useRef(new Animated.Value(1)).current

  const animateTo = (next: Stage) => {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
    setStage(next)
  }

  const handleOpen = () => {
    if (stage === 'idle') animateTo('answering')
  }

  const handleSend = () => {
    if (!draft.trim()) return
    Keyboard.dismiss()
    setDraft('') // not stored — cleared immediately, never re-read
    fade.setValue(0)
    animateTo('done')
    Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }).start()
  }

  return (
    <Pressable
      onPress={handleOpen}
      disabled={stage !== 'idle'}
      style={[
        styles.card,
        stage === 'done' && { backgroundColor: palette.bgDone, borderColor: palette.borderDone },
      ]}
    >
      {stage === 'idle' && (
        <View style={styles.row}>
          <Text style={styles.question}>How did you win the day?</Text>
          <FontAwesome6 name="chevron-right" size={14} color={palette.accent} />
        </View>
      )}

      {stage === 'answering' && (
        <View>
          <Text style={styles.question}>How did you win the day?</Text>
          <TextInput
            autoFocus
            value={draft}
            onChangeText={setDraft}
            placeholder="One small win is enough…"
            placeholderTextColor={palette.text + '88'}
            style={styles.input}
            multiline
          />
          <Pressable
            onPress={handleSend}
            disabled={!draft.trim()}
            style={[styles.sendButton, !draft.trim() && styles.sendButtonDisabled]}
          >
            <Text style={styles.sendButtonText}>Send</Text>
            <FontAwesome6 name="arrow-right" size={13} color="#fff" />
          </Pressable>
        </View>
      )}

      {stage === 'done' && (
        <Animated.View style={[styles.row, { opacity: fade }]}>
          <FontAwesome6 name="circle-check" size={20} color={palette.textDone} />
          <Text style={[styles.question, styles.doneText]}>
            Great, you won the day!
          </Text>
        </Animated.View>
      )}
    </Pressable>
  )
}

export default WinTheDay

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.bg,
    borderWidth: 1.5,
    borderColor: palette.border,
    borderRadius: 24,
    padding: 20,
    alignSelf: 'stretch',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: palette.text,
    flexShrink: 1,
  },
  doneText: {
    color: palette.textDone,
  },
  input: {
    marginTop: 14,
    backgroundColor: '#FFFFFFAA',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: palette.text,
    minHeight: 48,
    maxHeight: 120,
  },
  sendButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: 8,
    backgroundColor: palette.accent,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginTop: 12,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
})