import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, Icon } from 'react-native-elements';
import { firebase } from '../config';
import { cloudinaryUpload } from '../cloudinary';

const db = firebase.firestore();

export default class UploadBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      edition: '',
      price: '',
      description: '',
      tags: '',
      condition: '',
      image: null,
      imageUploaded: false,
      book_status: 1,
      borrowed_by: '',
      created_at: firebase.firestore.Timestamp.now(),
      uploaded_by: firebase.auth().currentUser.email,
      dropdownOpen: false,
      conditionOptions: [
        { label: 'Excellent', value: 'Excellent' },
        { label: 'Good', value: 'Good' },
        { label: 'Average', value: 'Average' },
      ],
      loading: false,
    };
  }

  createUniqueId = () => Math.random().toString(36).substring(2, 10);

  pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert('Permission denied to access media library');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.cancelled) {
      this.setState({ image: result.assets[0].uri, imageUploaded: false });
    }
  };

  uploadData = async () => {
    const {
      title, author, edition, price, description,
      tags, condition, uploaded_by, image
    } = this.state;

    if (!title || !author || !description) {
      return Alert.alert('Title, Author, and Description are required');
    }

    const book_id = this.createUniqueId();
    this.setState({ loading: true });

    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await cloudinaryUpload(image, book_id);
        this.setState({ imageUploaded: true });
      } catch (error) {
        this.setState({ loading: false });
        return Alert.alert('Image upload failed');
      }
    }

    //getting username for users collection in database:- 
  const username = "";
  db.collection('users')
  .where('email_id', '==', firebase.auth().currentUser.email)
  .limit(1)
  .get()
  .then((querySnapshot) => {
    if (!querySnapshot.empty) {
      username = querySnapshot.docs[0].data().first_name;
      console.log("Username:", username);
    } else {
      console.log("No user found.");
    }
  })
  .catch((error) => {
    console.error("Error getting user:", error);
  });



    db.collection('books')
      .add({
        title, author, edition, price,
        description,
        tags: tags.trim().split(' '),
        condition,
        uploaded_by,
        book_status: 1,
        borrowed_by: '',
        created_at: firebase.firestore.Timestamp.now(),
        uploader_username: username,
        book_id,
        cover_image_url: imageUrl || null,
      })
      .then(() => {
        this.setState({ loading: false });
        Alert.alert('Book uploaded successfully!');
        this.props.navigation.navigate('DrawerNavigator');
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Failed to upload book.');
        this.setState({ loading: false });
      });
  };

  render() {
    const {
      title, author, edition, price, description, tags, condition,
      image, imageUploaded, loading, dropdownOpen, conditionOptions
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <Header
          backgroundColor="#009387"
          leftComponent={
            <Icon name="arrow-back" color="#fff" onPress={() => this.props.navigation.goBack()} />
          }
          centerComponent={{
            text: 'Upload Book',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          containerStyle={{ borderBottomWidth: 0 }}
        />

        <TextInput style={styles.input} placeholder="Title *" value={title} onChangeText={text => this.setState({ title: text })} />
        <TextInput style={styles.input} placeholder="Author *" value={author} onChangeText={text => this.setState({ author: text })} />
        <TextInput style={styles.input} placeholder="Edition" value={edition} onChangeText={text => this.setState({ edition: text })} />
        <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={price} onChangeText={text => this.setState({ price: text })} />

        <DropDownPicker
          open={dropdownOpen}
          value={condition}
          items={conditionOptions}
          setOpen={(open) => this.setState({ dropdownOpen: open })}
          setValue={(callback) => this.setState({ condition: callback(condition) })}
          setItems={(items) => this.setState({ conditionOptions: items })}
          placeholder="Select Condition"
          style={styles.dropdown}
          dropDownContainerStyle={{ backgroundColor: '#f9f9f9' }}
        />

        <TextInput style={styles.input} placeholder="Tags (space separated)" value={tags} onChangeText={text => this.setState({ tags: text })} />
        <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} multiline numberOfLines={4} placeholder="Description *" value={description} onChangeText={text => this.setState({ description: text })} />

        <TouchableOpacity style={styles.uploadBtn} onPress={this.pickImage}>
          <Text style={styles.uploadText}>📷 Upload Photo</Text>
          {imageUploaded && <Text style={styles.tick}>✔️</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.uploadData} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>📤 Upload Book</Text>}
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#009387',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#009387',
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 16,
    color: '#009387',
    fontWeight: '600',
  },
  tick: {
    fontSize: 20,
    marginLeft: 10,
    color: 'green',
  },
});
