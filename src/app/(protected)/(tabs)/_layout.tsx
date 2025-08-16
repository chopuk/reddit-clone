import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome, FontAwesome6, Feather } from '@expo/vector-icons'
import { useAuth } from '@clerk/clerk-expo'

const TabsLayout = () => {

  const { signOut } = useAuth()

  return (
    <>
      <Tabs  
        screenOptions={{
            headerStyle: {
              backgroundColor: '#6393a6'
            },
            headerTitleAlign: 'center',
            headerRight: () =>
              <Feather 
                name='log-out'
                size={22}
                color='black'
                style={{ paddingRight: 10}}
                onPress={()=> signOut()}
              />,
            tabBarStyle: {
              backgroundColor: 'black',
              paddingTop: 5,
              paddingBottom:5,
              marginBottom: 45,
              height:57
            },
            //tabBarShowLabel: false,
            tabBarLabelStyle: {
              fontSize: 10
            },
          }}
          >
          <Tabs.Screen
              name="index"
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name='home' size={20} color={focused ? "blue" : "gray"} />
                ),
                title: 'Reddit'
              }}
          />
          <Tabs.Screen
            name="communities"
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesome6 name='users' size={20} color={focused ? "blue" : "gray"} />
              ),
              title: 'Communities'
            }}
          />
          <Tabs.Screen
              name="create"
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name='plus' size={20} color={focused ? "blue" : "gray"} />
                ),
                title: 'Create',
                headerShown: false,
                tabBarStyle: { display: 'none'}
              }}
          />
          <Tabs.Screen
              name="chat"
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name='comments' size={20} color={focused ? "blue" : "gray"} />
                ),
                title: 'Chat'
              }}
          />
          <Tabs.Screen
              name="inbox"
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name='inbox' size={20} color={focused ? "blue" : "gray"} />
                ),
                title: 'Inbox'
              }}
          />
      </Tabs>
      <StatusBar />
    </>
  )
    
}

export default TabsLayout