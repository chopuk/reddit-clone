import { useEffect, useState } from 'react'
import { Text, TextInput, Button, View, StyleSheet, Keyboard, ScrollView, Dimensions, ViewStyle, Alert, TouchableOpacity } from 'react-native'
import { useSignUp, useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [pendingVerification, setPendingVerification] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')

  type JustifyContentType =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'

  type JustifyContentT = NonNullable<ViewStyle['justifyContent']>

  const [dynamicPosition, setDynamicPosition] = useState<JustifyContentT>('center')
  const [isCentered, setIsCentered] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    //Keyboard.dismiss()
    setShowPassword(!showPassword)
  }
  
  const justifyContent = isCentered ? 'center' : 'flex-start'

  const inputFocusDetected = () => {
    setDynamicPosition('flex-start')
    setIsCentered(false)
  }

  const isEmailValid = (value: string) => {
    const regx = /^[^@]+@[^@]+\.[^@]+$/
    return regx.test(value)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setDynamicPosition('center')
      setIsCentered(true)
    })
  })
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    Keyboard.dismiss()
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        username,
        password
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      var errors = ''
      err.errors.forEach((error: any) => {
        errors = errors + error.message + '\n'
      })
      Alert.alert('Sign Up Failure', errors)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
              
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      
    }
  }

  if (pendingVerification) {
    return (
      <View style={[styles.pendingContainer, { marginBottom: 40 }]}>
        <LinearGradient
            colors={['#6148d1ff','#49a35fff','#c02b3fff']}
            style={StyleSheet.absoluteFill}
        />
        <Text style={styles.title}>Verify Your Email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder='Enter your verification code'
          placeholderTextColor='#aaa'
          onChangeText={setCode}
          onFocus={()=>inputFocusDetected()}
        />
        <Button title='Verify' onPress={onVerifyPress} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { justifyContent: justifyContent }]}>
      <LinearGradient
          colors={['#6148d1ff','#49a35fff','#c02b3fff']}
          style={StyleSheet.absoluteFill}
      />
      <View style={styles.scrollView}>
        <ScrollView 
          style={styles.scroll}
          contentContainerStyle={styles.contentStyle}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            value={emailAddress}
            placeholder='Enter email'
            placeholderTextColor='#aaa'
            onChangeText={setEmailAddress}
            onFocus={()=>inputFocusDetected()}
          />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            value={username}
            placeholder='Username'
            placeholderTextColor='#aaa'
            onChangeText={setUsername}
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
          <Button title='Continue' onPress={onSignUpPress} />
        </ScrollView>
      </View>
    </View>
  )
}

export default SignUp

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    height: screenHeight * 0.36, // 50% of screen height
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll: {
    width: screenWidth,
    padding: 20,
  },
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  pendingContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  }
})