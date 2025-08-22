import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import groups from '../../../assets/data/groups.json'
import { selectedGroup } from '../../atoms'
import { useSetAtom } from 'jotai'
import { Group } from '../../types'

const groupSelector = () => {

  const [ searchValue, setSearchValue ] = useState<string>('')
  const setGroup = useSetAtom(selectedGroup)

  const filteredGroups = 
    groups.filter (( group) => group.name.toLowerCase().includes(searchValue.toLowerCase()))

  const onGroupSelected = ( group: Group ) => {
    setGroup(group)
    router.back()
  }

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.headerLine}>
        <AntDesign name='close' size={30} color='black' onPress={()=>router.back()} />
        <Text style={styles.headerText}>Post to</Text>
      </View>

      <View style={styles.searchBar}>
        <AntDesign name='search1' size={16} color='grey' onPress={()=>router.back()} />
        <TextInput 
          placeholder='Search for a community'
          placeholderTextColor={'grey'}
          style={styles.searchText}
          value={searchValue}
          onChangeText={setSearchValue}
        />
        { searchValue && (
          <AntDesign name='closecircle' size={15} color='#e4e4e4' onPress={() => setSearchValue('')} />
        )}
      </View>

      <FlatList 
        data={filteredGroups}
        renderItem={({item}) => (
          <Pressable 
            style={styles.renderedItem}
            onPress={() => onGroupSelected(item)}
          >
            <Image source={{ uri: item.image}} style={styles.imageStyle}/>
            <Text style={{ fontWeight: '600'}}>{item.name}</Text>
          </Pressable>
        )}
      />

    </SafeAreaView>
  )
}

export default groupSelector

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white', 
    flex: 1,
    padding: 10,
    marginHorizontal: 10
  },
  headerLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 16,
    fontWeight  : 'bold',
    textAlign: 'center',
    flex: 1,
    paddingRight: 30
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    gap: 5,
    marginVertical : 10,
    paddingHorizontal: 10
  },
  searchText: {
    paddingVertical: 10,
    flex: 1
  },
  renderedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20
  },
  imageStyle: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 50
  }
})