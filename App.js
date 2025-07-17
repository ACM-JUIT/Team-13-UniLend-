import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/splash_screen';
import SignInScreen from './screens/signInScreen';
import SignUpScreen from './screens/signUpScreen';
import UploadBooks from './screens/add_items_books';

import UploadNotes from './screens/add_items_notes';

// import Modal from './screens/modal';
import DrawerNavigator from './navigation/drawer-navigator';

import TabLayout from './navigation/tab-navigator';

const Stack = createNativeStackNavigator();


import ProductDetail from './screens/productDetailScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen 
        name="SplashScreen" 
        component={SplashScreen}  
        options={{ headerShown: false }}/>

        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />      
        <Stack.Screen
          name="UploadBooks"
          component={UploadBooks}
          options={{ headerShown: false, 
            title: 'Add Book' }}
        />
        <Stack.Screen
            name = "UploadNotes"
            component = {UploadNotes}
            options = {{ headerShown: false,
              title: 'Add Notes',
            }}
        />
        
        <Stack.Screen
          name="TabLayout"
          component={TabLayout}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
  
        

        {/* <Stack.Screen name="SignInScreen" component={SignInScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
