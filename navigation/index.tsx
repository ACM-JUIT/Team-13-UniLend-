import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import Modal from '../screens/modal';
import DrawerNavigator from './drawer-navigator';
import UploadBooks from '../screens/add_items_books';



export type RootStackParamList = {
  DrawerNavigator: undefined;
  TabNavigator: undefined;
  UploadBooks: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="DrawerNavigator">
        
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
   
        <Stack.Screen
          name = "UploadBooks"
          component={UploadBooks}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
