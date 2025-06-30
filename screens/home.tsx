import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BookOpen,
  FileText,
  Calculator,
  Beaker,
  TrendingUp,
  Heart,
} from 'lucide-react-native';

const quickStats = [
  { label: 'Items Available', value: '1,240', icon: BookOpen },
  { label: 'Active Users', value: '850', icon: TrendingUp },
  { label: 'Successful Exchanges', value: '2,100', icon: Heart },
];

const categories = [
  { id: 1, name: 'Books', icon: BookOpen, color: '#3B82F6' },
  { id: 2, name: 'Notes', icon: FileText, color: '#10B981' },
  { id: 3, name: 'Math', icon: Calculator, color: '#F59E0B' },
  { id: 4, name: 'Science', icon: Beaker, color: '#8B5CF6' },
];

const { width } = Dimensions.get('window');



export default function HomeScreen() {
  const [branch, setBranch] = React.useState('');
  const [userId, setUserId] = React.useState('');

  // Add book form fields
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [edition, setEdition] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [uploadedBy, setUploadedBy] = React.useState('');

  const handleUpdate = async () => {
    
  };

  const handleAddBook = async () => {
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <stat.icon size={24} color="#3B82F6" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <View style={styles.categoriesGrid}>
              {categories.map(category => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                    <category.icon size={28} color={category.color} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Update Branch */}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heading: {
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    margin: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
});


