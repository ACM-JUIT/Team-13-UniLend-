// ✅ Enhanced UploadBooks Screen with Full UX Features + KeyboardAvoiding Fix

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Appearance,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, Icon, Image } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { firebase } from '../config';

const db = firebase.firestore();

export default class UploadBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      author: '',
      book_status: 1,
      borrowed_by: '',
      condition: '',
      created_at: firebase.firestore.Timestamp.now(),
      description: '',
      edition: '',
      price: '',
      tags: '',
      title: '',
      uploaded_by: firebase.auth().currentUser.email,
      dropdownOpen: false,
      loading: false,
      fadeAnim: new Animated.Value(0),
      conditionOptions: [
        { label: 'Excellent', value: 'Excellent' },
        { label: 'Good', value: 'Good' },
        { label: 'Average', value: 'Average' },
      ],
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }

  uploadData = () => {
    const { title, author, description, edition, price, tags, condition, uploaded_by } = this.state;

    if (!title || !author || !description) {
      alert('⚠️ Title, Author, and Description are required!');
      return;
    }

    this.setState({ loading: true });

    db.collection('books')
      .add({
        author,
        book_status: 1,
        borrowed_by: '',
        condition,
        created_at: firebase.firestore.Timestamp.now(),
        description,
        edition,
        price,
        tags: tags.trim().split(' '),
        title,
        uploaded_by,
      })
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate('DrawerNavigator');
        alert('✅ Book uploaded successfully!');
      })
      .catch((error) => {
        console.error('Upload Error:', error);
        this.setState({ loading: false });
        alert('⚠️ Error uploading. Try again.');
      });
  };

  render() {
    const isDark = Appearance.getColorScheme() === 'dark';
    const {
      fadeAnim,
      dropdownOpen,
      conditionOptions,
      condition,
      loading,
    } = this.state;

    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff' }}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />

            <Header
              backgroundColor="#009387"
              leftComponent={
                <Icon name="arrow-back" color="#fff" onPress={() => this.props.navigation.goBack()} />
              }
              centerComponent={{
                text: 'Upload Book',
                style: {
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                },
              }}
              rightComponent={<Image source={require('../assets/icon.png')} style={{ width: 35, height: 35 }} />}
              containerStyle={{ borderBottomWidth: 0, elevation: 4 }}
            />

            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#ddd' : '#009387' }]}>📘 Book Details</Text>

              <TextInput style={styles.input} placeholder="Title *" onChangeText={(text) => this.setState({ title: text })} />
              <TextInput style={styles.input} placeholder="Author *" onChangeText={(text) => this.setState({ author: text })} />
              <TextInput style={styles.input} placeholder="Edition" onChangeText={(text) => this.setState({ edition: text })} />
              <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" onChangeText={(text) => this.setState({ price: text })} />

              <DropDownPicker
                open={dropdownOpen}
                value={condition}
                items={conditionOptions}
                setOpen={(open) => this.setState({ dropdownOpen: open })}
                setValue={(cb) => this.setState({ condition: cb(condition) })}
                setItems={(items) => this.setState({ conditionOptions: items })}
                placeholder="Condition"
                style={styles.dropdown}
                dropDownContainerStyle={{ backgroundColor: '#f1f1f1' }}
                zIndex={5000}
              />

              <TextInput style={styles.input} placeholder="Tags (space separated)" onChangeText={(text) => this.setState({ tags: text })} />
              <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
               placeholder="Description *" 
               multiline 
               numberOfLines={4} 
               onChangeText={(text) => this.setState({ description: text })}
                />

              <TouchableOpacity style={styles.button} onPress={this.uploadData} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>📤 Upload Book</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#009387',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
