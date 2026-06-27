import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'

// Local palette for this card — deep moss green body, warm brown outline
const palette = {
  body: '#2F3B2C',
  bodyDeep: '#27311F',
  outline: '#7A5A3A',
  text: '#F1E6C9',
  textFaded: '#C9C2A4',
  accent: '#C9A24B',
}

// Small fallback pool in case the network call fails or is offline —
const FALLBACK_QUOTES = [
  { q: 'The only way out is through.', a: 'Robert Frost' },
  { q: 'You don\u2019t have to see the whole staircase, just take the first step.', a: 'Martin Luther King Jr.' },
  { q: 'Small steps every day.', a: 'Unknown' },
  { q: 'This too shall pass.', a: 'Persian proverb' },
]

type Quote = { q: string; a: string }

const getRandomFallback = (): Quote =>
  FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]

const Quote = () => {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchQuote = async () => {
      try {
        const res = await fetch('https://zenquotes.io/api/today')
        const data = await res.json()
        if (!isMounted) return

        if (Array.isArray(data) && data[0]?.q) {
          setQuote({ q: data[0].q, a: data[0].a })
        } else {
          throw new Error('Unexpected response shape')
        }
      } catch (err) {
        // Covers offline devices, rate limiting, and the web/Expo-web case where
        // ZenQuotes' free tier doesn't return CORS headers.
        if (!isMounted) return
        setQuote(getRandomFallback())
        setUsingFallback(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchQuote()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <View style={styles.card}>
      <View style={styles.quoteMarkWrap}>
        <FontAwesome6 name="quote-left" size={18} color={palette.accent} />
      </View>

      {loading ? (
        <ActivityIndicator color={palette.accent} style={{ marginVertical: 12 }} />
      ) : (
        <>
          <Text style={styles.quoteText}>{quote?.q}</Text>
          <Text style={styles.authorText}>— {quote?.a}</Text>
        </>
      )}

      {/* Required attribution for ZenQuotes' free tier */}
      <Text style={styles.attribution}>
        {usingFallback ? 'Quote of the day' : 'via ZenQuotes.io'}
      </Text>
    </View>
  )
}

export default Quote

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.body,
    borderRadius: 24,
    borderWidth: 1.5,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    //marginTop: 20,
    shadowColor: palette.bodyDeep,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  quoteMarkWrap: {
    marginBottom: 6,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: palette.text,
    fontStyle: 'italic',
  },
  authorText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '500',
    color: palette.accent,
    textAlign: 'right',
  },
  attribution: {
    marginTop: 14,
    fontSize: 10,
    color: palette.textFaded,
    textAlign: 'right',
    opacity: 0.7,
  },
})