import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import posts from '../../../../assets/data/posts.json'
import comments from '../../../../assets/data/comments.json'
import PostListItem from '../../../components/PostListItem'
import CommentListItem from '../../../components/CommentListItem'

const  postDetail = () => {

  const inputRef = useRef<TextInput | null>(null)
  const [comment, setComment] = useState<string>('')
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)

  const { id } = useLocalSearchParams()
  const detailedPost = posts.find((post) => post.id === id)
  if (!detailedPost) {
    return <Text>I Oops.. that post was not found...</Text>
  }

  const postComments = comments.filter((comment) => comment.post_id === detailedPost.id)

  // useCallback with memo inside CommentListItem prevents re-renders when replying to a comment
  const handleReplyPress = useCallback((commentId: string) => {
    console.log(commentId)
    inputRef.current?.focus();
  }, [])

  return (
    <View style={{height: '94%'}}>
      <FlatList
        data={postComments}
        renderItem={({item}) => <CommentListItem comment={item}/> }
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
      />
      <View style={styles.commentView}>
        <TextInput
          placeholder="Join the conversation"
          ref={inputRef}
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={{ backgroundColor: '#E4E4E4', padding: 5, borderRadius: 5 }}
          multiline
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {isInputFocused &&
          <Pressable 
            disabled={!comment} 
            onPress={() => console.error('Pressed')} 
            style={[styles.buttonReply, { backgroundColor: !comment ? "lightgrey" : '#0d469b',  }]}>
              <Text style={styles.buttonText}>Reply</Text>
          </Pressable>
        }
      </View>
    </View>
  )
}

export default postDetail

const styles = StyleSheet.create({
  buttonReply: {
    borderRadius: 15, 
    marginLeft: 'auto', 
    marginTop: 15
  },
  buttonText: {
    color: 'white', 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  commentView: {
    paddingBottom: 2, 
    borderBottomWidth: 1, 
    borderBottomColor: 'lightgrey', 
    padding: 10, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4
  }
})