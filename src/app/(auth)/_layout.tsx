
import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'

const AuthLayout = () => {

  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack screenOptions=
        {{
          headerShown: false
        }}>
      <Stack.Screen name='SignIn' options={{ title: 'Sign In' }} />
      <Stack.Screen name='SignUp' options={{ title: 'Sign Up' }} />
    </Stack>
  )
    
}

export default AuthLayout