import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { Platform } from 'react-native';
import {  Home, Search, Plus, MessageCircle, User } from 'lucide-react-native';

import { RootStackParamList } from '.';
import HomeHeader from '../components/home_header';
import ResourcesHeader from '../components/resources_header';

import HomeScreen from '../screens/home';
import BrowseScreen from '../screens/browse';
import ResourcesScreen from '../screens/add_item';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
     screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 0,
          height: Platform.OS === 'ios' ? 90 : 90,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
      }}>

      <Tab.Screen
        name = "Home"
        component = {HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ size , color }) => (
            <Home size={size} color={color} />
          ),
          headerShown: true,
          header: () => <HomeHeader />

      }}/>

      <Tab.Screen
        name = "BrowseScreen"
        component = {BrowseScreen}
        options={{
          title: 'Browse',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
          headerShown: false

      }}/>

      <Tab.Screen
        name = "ResourcesScreen"
        component = {ResourcesScreen}
        options={{
          title: 'Add\n Resources',
          tabBarIcon: ({ size, color }) => (
            <Plus size={size} color={color} />
          ),
          headerShown: false,
          header: () => <ResourcesHeader />
      }}/>


      
    </Tab.Navigator>
  );
}
