import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { ArrowRight } from 'lucide-react-native';
//import { useNavigation } from '@react-navigation/native';


import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

export default function ResourcesScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#FADCD9','#F9F1F0']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
          <Image
            source={require('../assets/favicon.png')}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Upload Books</Text>
            <Text style={styles.cardSubtitle}>Add textbooks, reference guides, and more to share with your peers.</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('UploadBooks')}
            >
              <ArrowRight color="white" size={20} />
              <Text style={styles.cardButtonText}>Upload Book</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.card}>
          <Image
            source={require('../assets/favicon.png')}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Upload Notes</Text>
            <Text style={styles.cardSubtitle}>Upload handwritten or digital notes, solved papers, and study guides.</Text>
            <TouchableOpacity
              style={[styles.cardButton, { backgroundColor: '#10B981' }]}
              onPress={() => navigation.navigate('UploadNotes')}
            >
              <ArrowRight color="white" size={20} />
              <Text style={styles.cardButtonText}>Upload Notes</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  cardImage: {
    width: 70,
    height: 70,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  cardButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
