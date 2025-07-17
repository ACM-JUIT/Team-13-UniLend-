import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { firebase } from '../config';
import { Searchbar } from 'react-native-paper';

const db = firebase.firestore();
// const currentUserEmail = firebase.auth().currentUser.email;
import { useNavigation } from '@react-navigation/native';


import AnimatedCard from '../components/animatedCard';


const tagsList = ['maths', 'physics', 'ece', 'dsa', 'mechanics'];
const placeholderOptions = ['books', 'physics', 'ece', 'maths', 'notes'];

const BrowseScreen = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('Search books & notes...');
  const [activeTag, setActiveTag] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      const random = placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
      setPlaceholder(`Search ${random}...`);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const bookSnapshot = await db.collection('books').get();
      const noteSnapshot = await db.collection('notes').get();

      const books = bookSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'book' }));
      const notes = noteSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'note' }));
      const currentUserEmail = firebase.auth().currentUser.email;

      const combined = [...books, ...notes].filter(
        (item) => item.uploaded_by.toLowerCase() !== currentUserEmail.toLowerCase()
      );

      // Normalize tags to lowercase
      const cleaned = combined.map((item) => ({
        ...item,
        tags: (item.tags || []).map((t) => t.toLowerCase()),
      }));

      setAllItems(cleaned);
      setFilteredItems(cleaned);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = allItems.filter((item) =>
      item.tags?.some((tag) => tag.startsWith(text.toLowerCase()))
    );
    setFilteredItems(filtered);
    setActiveTag(null);
  };

  const handleQuickTag = (tag) => {
    if (activeTag === tag) {
      setFilteredItems(allItems);
      setActiveTag(null);
    } else {
      const filtered = allItems.filter((item) => item.tags?.includes(tag.toLowerCase()));
      setFilteredItems(filtered);
      setActiveTag(tag);
      setSearch('');
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.itemsList}>
    
      <AnimatedCard >
        <TouchableOpacity style={styles.itemCard}
          onPress={() => navigation.navigate('ProductDetail', { item })}>
      
          <View style={styles.itemImageContainer}>
            <Image source={{ uri: item.cover_image_url }} style={styles.itemImage} />

          
          </View>
      

          <View style={styles.itemDetails}>

            <View style={styles.itemHeader}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                        {item.title}
                </Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
            </View>     


            <Text style={styles.itemAuthor}>Author: {item.author}</Text>

            <Text
              style={{
                color: item.book_status === 1 ? 'green' : 'red',
                fontWeight: 'bold',
                marginVertical: 5,
              }}>
              {item.book_status === 1 ? 'Available' : 'Not Available'}
            </Text>


            <View style={styles.itemFooter}>
                <View style={styles.conditionContainer}>
                    <View style={[styles.conditionDot, { backgroundColor: '#FFFD86' }]} />
                      <Text style={styles.item_condition}>{item.condition}</Text>
                </View>
                <Text style={styles.owner}>by {item.uploaded_by}</Text>
            </View>
            
                
          </View>

          </TouchableOpacity>
       </AnimatedCard>
    </View>
  );



  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <Searchbar
                placeholder={placeholder}
                onChangeText={handleSearch}
                value={search}
                style={styles.searchBar}
                inputStyle={{ fontSize: 16 }}
                iconColor="#009387"
        />


   
    <ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickPanel}>
        {tagsList.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[styles.quickButton, activeTag === tag && styles.activeButton]}
            onPress={() => handleQuickTag(tag)}>
            <Text style={[styles.quickText, activeTag === tag && styles.activeText]}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  searchBox: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  quickPanel: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 30,
  },
  quickButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#009387',
  },
  quickText: {
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },

   searchBar: {
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 15,
    //backgroundColor: '#f1f1f1',
  },


  //details code style below:- 

  itemsList: {
    paddingHorizontal: 10,
    gap: 10,
  },

  itemImageContainer: {
    position: 'relative',
    width: 140,
    height: 180,
  },

   itemImage: {
    width: '100%',
    height: '100%',
  },

  itemDetails: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginRight: 10,
    lineHeight: 24,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6366F1',
  },
  itemAuthor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 1,
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  conditionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  item_condition: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  owner: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
    margin: 12,
  },


});

export default BrowseScreen;
