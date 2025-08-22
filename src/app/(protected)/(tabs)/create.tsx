import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { selectedGroup } from '../../../atoms'
import { useAtom } from 'jotai'
import { goBack } from 'expo-router/build/global-state/routing'

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

  const [ group, setGroup] = useAtom(selectedGroup)

  const goBack = () => {
    setGroup(null)
    router.back()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <AntDesign name='close' size={30} color='black' onPress={()=>goBack()} />
        <Pressable onPress={() => console.error('PRESSED')} style={{ marginLeft: 'auto'}}>
          <Text style={styles.postButton}>Post</Text>
        </Pressable>
      </View>
      <View>
        <ScrollView>
          <Link href='groupSelector' asChild>
            <Pressable style={styles.communityContainer}>
              { group ? (
                <>
                  <Image source={{ uri: group.image}} style={styles.communityImage} />
                  <Text style={{ fontWeight: 600 }}>{group.name}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.rText}>r/</Text>
                  <Text style={{ fontWeight: 600 }}>Select a community</Text>
                </>
              )}
              
            </Pressable>
          </Link>
        
          <TextInput 
            placeholder='Title'
            style={styles.title}
            value={title}
            onChangeText={setTitle}
            multiline
            scrollEnabled={false}
          />

          <TextInput 
            placeholder='Body Text (optional)'
            style={styles.bodyText}
            value={bodyText}
            onChangeText={setBodyText}
            multiline
          />
          </ScrollView>
        </View>
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
  },
  title: {
    fontSize: 20,
    paddingVertical: 10, 
    fontWeight: 'bold', 
    height: 144, 
    backgroundColor: '#a3e270ff', 
    borderRadius:10, 
    marginBottom: 10 
  },
  bodyText: {
    fontSize: 20, 
    paddingVertical: 10, 
    height: 500, 
    marginBottom: 100, 
    backgroundColor: '#5481aaff', 
    borderRadius:10 
  },
  communityImage: {
    width: 20,
    height: 20,
    borderRadius: 50
  }
})