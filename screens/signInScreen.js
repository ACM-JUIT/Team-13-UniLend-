import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import db from '../config';
import {firebase} from '../config';
// const db = firebase.firestore();

export default class SignInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      username: '',
      check_textInputChange: false,
      secureTextEntry: false,
  
   
    };
  }

  userLogin = (emailId, password) => {
   
      firebase.auth().signInWithEmailAndPassword(emailId, password).then(() => {
          this.props.navigation.navigate('DrawerNavigator');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    
  };

  updateSecureTextEntry = () => {
    if (this.state.secureTextEntry === true) {
      this.setState({
        secureTextEntry: false,
      });
    } else {
      this.setState({
        secureTextEntry: true,
      });
    }
  };

  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword');


  checkLengthofEmail = () => {
    if (this.state.emailId.length > 1) {
      this.setState({
        check_textInputChange: 'true',
      });
    } else if (this.state.emailId.length === 0) {
      this.setState({
        check_textInputChange: 'false',
      });
    }
  };

  componentDidMount() {
    this.checkLengthofEmail();
  }



  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <Animatable.View
          animation="bounceInUp"
          duration={500}
          style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={[styles.text_footer, { marginBottom: 2 }]}>
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
             
              size={20}
            />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            {this.state.emailId.length > 1 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
 

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 30,
                marginBottom: 2,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={this.state.secureTextEntry}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.updateSecureTextEntry();
              }}>
              {this.state.secureTextEntry === true ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            onPress={() => {
              this.goToForgotPassword();
            }}>
            <Text style={{ color: '#009387', marginTop: 15 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                this.userLogin(this.state.emailId, this.state.password);
              }}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUpScreen')}
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#009387',
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
    height: '100%',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 3,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },

  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
