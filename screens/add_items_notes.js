
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, Icon, Image } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { firebase } from '../config';

const db = firebase.firestore();


export default class UploadNotes extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      subject: '',
      semester: '',
      description: '',
      format: '',
      price: '',
      file_url: '',
      uploaded_by: firebase.auth().currentUser.email,
      note_status: 1,
      created_at: firebase.firestore.Timestamp.now(),
      dropdownOpen: false,
      formatOptions: [
        { label: 'PDF', value: 'PDF' },
        { label: 'Physical', value: 'Physical' },
      ],
      loading: false,
      fadeAnim: new Animated.Value(0),
      borrowed_by: '',
      
    };
  }
  
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }


  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }

  uploadData = () => {
    const {title, subject, semester, description, format, price, file_url, uploaded_by, note_status } = this.state;

    if (!subject || !semester || !description || !format || !price) {
      alert('⚠️ All fields except file URL are required!');
      return;
    }

    this.setState({ loading: true });


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


    db.collection('notes')
      .add({
        title,
        subject,
        semester,
        description,
        format,
        price,
        file_url,
        uploaded_by,
        note_status,
        created_at: firebase.firestore.Timestamp.now(),
        author: username,
        borrowed_by: '',
        note_id: this.createUniqueId(),
      })
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate('DrawerNavigator');
        alert('✅ Notes uploaded successfully!');
      })
      .catch((error) => {
        console.error('Upload Error:', error);
        this.setState({ loading: false });
        alert('⚠️ Error uploading notes. Try again.');
      });
  };

  render() {
    const isDark = Appearance.getColorScheme() === 'dark';
    const {
      fadeAnim,
      dropdownOpen,
      formatOptions,
      format,
      loading,
    } = this.state;

    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={100}>

          <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff' }}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />

            <Header
              backgroundColor="#009387"
              leftComponent={<Icon name="arrow-back" color="#fff" onPress={() => this.props.navigation.goBack()} />}
              centerComponent={{
                text: 'Upload Notes',
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
              <Text style={[styles.sectionTitle, { color: isDark ? '#ddd' : '#009387' }]}>📝 Note Details</Text>


              <TextInput style={styles.input} 
              placeholder="Title *" 
              onChangeText={(text) => this.setState({ title: text })} />

              <TextInput style={styles.input} placeholder="Subject *" onChangeText={(text) => this.setState({ subject: text })} />
              <TextInput style={styles.input} placeholder="Semester *" onChangeText={(text) => this.setState({ semester: text })} />
              <TextInput style={styles.input} placeholder="Price *" keyboardType="numeric" onChangeText={(text) => this.setState({ price: text })} />
              <TextInput style={styles.input} placeholder="File URL (optional)" onChangeText={(text) => this.setState({ file_url: text })} />

              <DropDownPicker
                open={dropdownOpen}
                value={format}
                items={formatOptions}
                setOpen={(open) => this.setState({ dropdownOpen: open })}
                setValue={(cb) => this.setState({ format: cb(format) })}
                setItems={(items) => this.setState({ formatOptions: items })}
                placeholder="Select Format *"
                style={styles.dropdown}
                dropDownContainerStyle={{ backgroundColor: '#f1f1f1' }}
                zIndex={5000}
              />

              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Description *"
                multiline
                numberOfLines={4}
                onChangeText={(text) => this.setState({ description: text })}
              />

              <TouchableOpacity style={styles.button} onPress={this.uploadData} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>📤 Upload Notes</Text>
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
