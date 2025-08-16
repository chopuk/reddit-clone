import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import posts from '../../../../assets/data/posts.json'
import PostListItem from '../../../components/PostListItem'

const  postDetail = () => {

  const { id } = useLocalSearchParams()
  const detailedPost = posts.find((post) => post.id === id)
  if (!detailedPost) {
    return <Text>I Oops.. that post was not found...</Text>
  }

  return (
    <View>
      <PostListItem post={detailedPost}  isDetailedPost />
    </View>
  )
}

export default postDetail

const styles = StyleSheet.create({})