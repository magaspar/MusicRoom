import React from 'react';

import {
  Button, Keyboard, View, StyleSheet, TextInput,
} from 'react-native';

import { addUser } from '../../../API/BackApi';

export default class CustomForm extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    name: '',
    familyName: '',
  };

  updateLogin = (text) => {
    this.setState({ userName: text });
  };

  updatePassword = (text) => {
    this.setState({ password: text });
  };

  updateConfirmPassword = (text) => {
    this.setState({ confirmPassword: text });
  };

  updateName = (text) => {
    this.setState({ name: text });
  };

  updateFamilyName = (text) => {
    this.setState({ familyName: text });
  };

  updateEmail = (text) => {
    this.setState({ email: text });
  };

  SignUp = () => {
    const {
      userName, password, name, familyName, email, confirmPassword,
    } = this.state;
    if (!(name.length && familyName.length && email.length && confirmPassword.length
      && userName.length && password.length)) {
      alert('error: empty field.');
      console.log('error, empty field');
    } else if (password !== confirmPassword) {
      alert('error: passwords don\'t match');
      console.log('error, passwords don\'t match');
    } else {
      addUser(userName, password, name, familyName, email);// .then.catch?
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.updateLogin}
          autoCorrect={false}
          autoCapitalize="none"
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Login"
        />
        <TextInput
          onChangeText={this.updatePassword}
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          onChangeText={this.updateConfirmPassword}
          underlineColorAndroid="grey"
          secureTextEntry
          style={styles.inputBox}
          placeholder="Confirm password"
        />
        <TextInput
          onChangeText={this.updateName}
          autoCorrect={false}
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Name"
        />
        <TextInput
          onChangeText={this.updateFamilyName}
          autoCorrect={false}
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Family Name"
        />
        <TextInput
          onChangeText={this.updateEmail}
          autoCorrect={false}
          autoCapitalize="none"
          keyboard-type="email-address"
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Email"
        />
        <View style={styles.submitButton}>
          <Button
            title="Sign Up"
            onPress={() => {
              Keyboard.dismiss();
              this.SignUp();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: 300,
  },
  inputBox: {
    width: 300,
  },
  submitButton: {
    width: 150,
  },
  forgotPass: {
    paddingTop: 10,
  },
});