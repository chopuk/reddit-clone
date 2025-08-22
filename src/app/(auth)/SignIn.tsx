import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Keyboard, Alert } from 'react-native';
import { useCallback, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [dynamicMargin, setDynamicMargin] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputFocusDetected = () => {
    setDynamicMargin(150)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setDynamicMargin(0)
    })
  })

  // Handle the submission of the sign-in form
  const onSignInPress = useCallback(async () => {
    Keyboard.dismiss()
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      var errors = ''
      err.errors.forEach((error: any) => {
        errors = errors + error.message + '\n'
      })
      Alert.alert('Sign In Failure', errors)
    }
  }, [isLoaded, emailAddress, password])

  return (
    <View style={[styles.container, { marginBottom: dynamicMargin }]}>
      <LinearGradient 
          colors={['#6148d1ff','#49a35fff','#c02b3fff']}
          style={StyleSheet.absoluteFill}
      />
      
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        autoCapitalize='none'
        value={emailAddress}
        placeholder='Enter email'
        placeholderTextColor='#aaa'
        onChangeText={setEmailAddress}
        onFocus={()=>inputFocusDetected()}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={password}
          placeholder='Enter password'
          placeholderTextColor='#aaa'
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          onFocus={()=>inputFocusDetected()}
        />
        <TouchableOpacity 
          onPress={togglePasswordVisibility}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={26}
            color="#e73636"
          />
        </TouchableOpacity>
      </View>
      <Button title='Sign In' onPress={onSignInPress} />
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don't have an account?</Text>
        <Link href='/SignUp'asChild>
          <TouchableOpacity>
            <Text style={styles.signUpText}>   Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: 'yellow',
  },
  signUpText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    position: 'relative'
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -20
  }
})
