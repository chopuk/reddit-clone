import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import posts from '../../../../assets/data/posts.json'
import PostListItem from '../../../components/PostListItem'

const index = () => {

  return (
    <View>
      <FlatList 
        data={posts}
        renderItem={({item})=> <PostListItem post={item}/>}
        />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
 
})