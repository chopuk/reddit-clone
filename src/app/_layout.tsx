import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error (
    'Missing Publishable key...'
  )
}

const RootLayout = () => {

  return (
    <>
      <ClerkProvider tokenCache={tokenCache}>
          <Slot/>
          <StatusBar />
      </ClerkProvider>
    </>
  )
    
}

export default RootLayout

