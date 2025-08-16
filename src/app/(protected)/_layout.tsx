
import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack, router } from 'expo-router'

const ProtectedLayout = () => {

  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href={'/SignIn'} />
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{headerShown:  false}}/>
      <Stack.Screen name='post' options={{headerShown:  false}}/>
    </Stack>
  )
    
}

export default ProtectedLayout


