import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'

const DashboardLayout = () => {
  const tabBarStyle = {
    bar: {
      backgroundColor: Colors.primary1,
      borderRadius: 40,
      height: 68,
      marginBottom: 30,
      marginHorizontal: 20,
      position: 'absolute',
      bottom: 16,
      paddingBottom: 0,       // ← kills the safe area inset React Navigation adds
      paddingTop: 8,
      elevation: 0,           // removes Android shadow bleed outside the pill
      borderTopWidth: 0,      // removes the default top border
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 11, 
    }
  } as const

  return (
    <Tabs screenOptions={{tabBarActiveTintColor: Colors.white, tabBarInactiveTintColor: Colors.button2, tabBarStyle: tabBarStyle.bar, tabBarItemStyle: tabBarStyle.item, tabBarLabelStyle: tabBarStyle.label }}>
      <Tabs.Screen name='index' options={{title: 'Home', headerShown: false, tabBarIcon: ({focused}) => (
        <FontAwesome6 
          name='house-chimney' 
          color={focused ? Colors.white : Colors.button2} 
          size={24}
        />
      )
      }}/>
      <Tabs.Screen name='today' options={{title: 'Today', headerShown: false, tabBarIcon: ({focused}) => (
        <FontAwesome6 
          name='calendar-check' 
          color={focused ? Colors.white : Colors.button2} 
          size={24}
        />
      )}}/>
      <Tabs.Screen name='reflect' options={{title: 'Reflect', headerShown: false, tabBarIcon: ({focused}) => (
        <FontAwesome6 
          name='seedling' 
          color={focused ? Colors.white : Colors.button2} 
          size={24}
        />
      )}}/>
      <Tabs.Screen name='profile' options={{title: 'Profile', headerShown: false, tabBarIcon: ({focused}) => (
        <FontAwesome6 
          name='circle-user'  
          color={focused ? Colors.white : Colors.button2} 
          size={24}
        />
      )}}/>
    </Tabs>
  )
}

export default DashboardLayout

const styles = StyleSheet.create({})