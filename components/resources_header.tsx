import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Menu, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const { width } = Dimensions.get('window');

const ResourcesHeader = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <LinearGradient
colors={['#F9F1F0', '#FADCD9']}     
 start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <Animatable.View animation="fadeInDown" delay={100} style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
          <LinearGradient colors={['#FADCD9', '#F8AFA6']} style={styles.menuGlow}>
            <Menu size={26} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <Animatable.View animation="fadeInLeft" delay={200} style={styles.textContainer}>
          <Text style={styles.greeting}>Hey Learner!</Text>
          <Text style={styles.subText}>Let’s upload something valuable 🚀</Text>
        </Animatable.View>

       
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    width:'100%',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    elevation: 10,
    shadowColor: '#000',
    backgroundColor:"#E0EAFC"
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FBE7C6',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuGlow: {
    padding: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#fff',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00',
    letterSpacing: 0.5,
  },
  subText: {
    fontSize: 13,
    color: '#AA1945',
    opacity: 0.85,
    marginTop: 2,
  },
//   searchChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     elevation: 5,
//     shadowColor: '#000',
//   },
//   searchText: {
//     marginLeft: 6,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#4F46E5',
//   },
});

export default ResourcesHeader;
