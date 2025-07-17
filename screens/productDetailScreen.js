import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductDetail = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const images = item?.cover_image_url
    ? Array.isArray(item.cover_image_url)
      ? item.cover_image_url
      : [item.cover_image_url]
    : [];

  return (
    <View style={styles.container}>
    
      <Animated.View style={styles.headerWrapper}>
        <View style={styles.gradientHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📚 Book Details</Text>
        </View>
      </Animated.View>

      
      <ScrollView showsVerticalScrollIndicator={false}>
       
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        />

     
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>₹{item.price}</Text>

          <Text
            style={[
              styles.status,
              { color: item.book_status === 1 ? 'green' : 'red' },
            ]}
          >
            {item.book_status === 1 ? 'Available' : 'Not Available'}
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.sectionHeader}>Description</Text>
            <Text style={styles.description}>
              {item.description || 'No description provided.'}
            </Text>

            <Text style={styles.sectionHeader}>Author</Text>
            <Text style={styles.meta}>{item.author || 'Unknown'}</Text>

            <Text style={styles.sectionHeader}>Condition</Text>
            <Text style={styles.meta}>{item.condition || 'Not specified'}</Text>

            <Text style={styles.sectionHeader}>Uploaded By</Text>
            <Text style={styles.meta}>{item.uploaded_by}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerWrapper: {
    backgroundColor: 'transparent',
    paddingTop: 50,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  gradientHeader: {
    backgroundColor: '#6366F1',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  image: {
    width: width,
    height: 280,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  card: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 6,
  },
  infoBox: {
    marginTop: 12,
  },
  sectionHeader: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
    lineHeight: 20,
  },
  meta: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default ProductDetail;