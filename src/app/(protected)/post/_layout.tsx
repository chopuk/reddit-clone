
import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack, router } from 'expo-router'
import { View } from 'react-native'
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons'

const PostLayout = () => {

  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href={'/SignIn'} />
  }

  return (
    <Stack>
      <Stack.Screen 
        name='[id]' 
        options={{
          headerStyle: {
            backgroundColor: '#7fd1a4ff'
          },
          headerTitleAlign: 'center',
          headerTitle: 'Post Detail',
          headerLeft: () => <AntDesign name="close" size={24} onPress={() => router.back()} />,
          headerRight: () =>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <AntDesign name="search1" size={22} />
              <MaterialIcons name="sort" size={25} />
              <Entypo name="dots-three-horizontal" size={22} />
            </View>
        }}
      />
    </Stack>
  )
    
}

export default PostLayout


