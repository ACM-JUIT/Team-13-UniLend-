import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';

import { Header, Icon, Image } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

const UploadBookHeader = () => {

    const navigation = useNavigation();
    return (
        <view>          
          <Header
            backgroundColor="#009387"
            leftComponent={
              <Icon
                name="arrow-back"
                color="#fff"
                onPress={() => navigation.navigate('DrawerNavigator')}
              />
            }
            centerComponent={{
              text: 'Upload Book',
              style: {
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 1,
              },
            }}
            rightComponent={
              <Image
                source={require('../assets/icon.png')} // Replace with your app icon
                style={{ width: 35, height: 35 }}
              />
            }
            containerStyle={{
              borderBottomWidth: 0,
              elevation: 4,
            }}
          />
    </view>

    )
}

export default UploadBookHeader;