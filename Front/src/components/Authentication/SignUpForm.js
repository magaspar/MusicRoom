import React from 'react';

import {
  Button, Keyboard, View, StyleSheet, TextInput, Alert,
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

    if (!(name.length && familyName.length && email.length
      && confirmPassword.length && userName.length && password.length)) {
      Alert.alert(
        'Inscription',
        'Veuillez remplir tous les champs.',
      );
    } else if (password !== confirmPassword) {
      Alert.alert(
        'Inscription',
        'Les deux mots de passes ne correspondent pas',
      );
    } else {
      addUser(userName, password, name, familyName, email)
        .then(() => {
          Alert.alert(
            'Bienvenue !',
            'Un email de validation vous a été envoyé.',
          );
        })
        .catch((error) => {
          if (error.status === 400) { // validation error
            Alert.alert(
              'Inscription',
              `Un compte avec ${error.msg === ' login' ? 'ce login' : 'cet email'} existe déjà !`,
            );
          } else {
            console.log(error);
          }
        });
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
          placeholder="Identifiant"
        />
        <TextInput
          onChangeText={this.updatePassword}
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Mot de passe"
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={this.updateConfirmPassword}
          underlineColorAndroid="grey"
          secureTextEntry
          style={styles.inputBox}
          placeholder="Confirmer le mot de passe"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={this.updateName}
          autoCorrect={false}
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Nom"
        />
        <TextInput
          onChangeText={this.updateFamilyName}
          autoCorrect={false}
          underlineColorAndroid="grey"
          style={styles.inputBox}
          placeholder="Nom de famille"
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
