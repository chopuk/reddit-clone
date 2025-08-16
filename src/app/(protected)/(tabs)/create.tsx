import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const create = () => {

  // const [title, setTitle] = useState<string>("")
  // const [bodyText, setBodyText] = useState<string>("")
  const [title, setTitle] = useState<string>('fffffffffffffffffffgggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhh'
+ 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
  const [bodyText, setBodyText] = useState<string>('fghdfgdvbdfhfghjnjfjghjghjghjghjghdjgdjgdhjgdjdgjdgjgdjgjdg' + 
    'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq' +
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww' + 
    'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' +
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr' +
    'ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt' +
    'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy' +
     'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq' +
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww' + 
    'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' +
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr' +
    'ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt' +
    'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <AntDesign name='close' size={30} color='black' onPress={()=>router.back()} />
        <Pressable onPress={() => console.error('PRESSED')} style={{ marginLeft: 'auto'}}>
          <Text style={styles.postButton}>Post</Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.communityContainer}>
            <Text style={styles.rText}>r/</Text>
            <Text style={{ fontWeight: 600 }}>Select a community</Text>
          </View>
        
          <TextInput 
            placeholder='Title'
            style= {{ fontSize: 20, paddingVertical: 20 }}
            value={title}
            onChangeText={setTitle}
            multiline
          />

          <TextInput 
            placeholder='Body Text (optional)'
            style= {{ fontSize: 20, paddingVertical: 20 }}
            value={bodyText}
            onChangeText={setBodyText}
            multiline
          />
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default create

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white', 
    flex: 1,
    padding: 10
  },
  postButton: {
    color: 'white',
    backgroundColor: '#115BCA',
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10
  },
  rText: {
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  communityContainer: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    padding: 10,
    borderRadius: 20,
    gap: 5,
    alignSelf: 'flex-start',
    marginVertical: 10
  }
})