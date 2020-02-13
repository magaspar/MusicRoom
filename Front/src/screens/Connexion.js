import React from 'react';
import {
  StyleSheet, KeyboardAvoidingView, Platform, View, ScrollView, Alert,
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { SERVER, WEBSOCKET_PORT } from 'react-native-dotenv';
import SignInForm from '../containers/SignInForm';
import { login } from '../../API/BackApi';
import Components from '../components';

class Connexion extends React.Component {
  componentDidMount(): void {
    // passer dans redux les globales comme ca on esquive l'async sur CDM
    const {
      navigation, userChanged, admin, setSocket, tmpLogUser, logPassLogin,
    } = this.props;
    if (tmpLogUser !== null) {
      const { pass, loging } = tmpLogUser;
      login(loging, pass)
        .then(async (user) => {
          userChanged(user);
          if (user.isAdmin) {
            admin(true);
          }
          setSocket(SocketIOClient(`${SERVER}:${WEBSOCKET_PORT}`));
          /* await AsyncStorage.setItem('log', '');
            await AsyncStorage.setItem('pass', '');
            await AsyncStorage.setItem('login', ''); */
          logPassLogin(null);
          navigation.navigate('app');
        })
        .catch((error) => {
          // console.log(error);
          if (error.status === 401) {
            Alert.alert('Erreur d\'authentification', 'Mauvais identifiant ou mot de passe.');
          } else if (error.status === 403) {
            Alert.alert(
              'Erreur d\'authentification',
              'Votre adresse email n\'a pas été vérifiée.',
            );
          }
        });
    }
  }

  render() {
    const {
      navigation, userChanged, setSocket, admin, logPassLogin,
    } = this.props;
    const type = 'Sign In';
    console.log('OUI');
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Components.Logo />
            <SignInForm navigation={navigation} />
            <Components.SocialLogin
              type={type}
              navigation={navigation}
              userChanged={userChanged}
              setSocket={setSocket}
              admin={admin}
              logPassLogin={logPassLogin}
            />
            <Components.DeezerLogin
              type={type}
              navigation={navigation}
              userChanged={userChanged}
              setSocket={setSocket}
              admin={admin}
            />
            <Components.LoginContext
              type={type}
              navigation={navigation}
              style={styles.loginContext}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  scrollView: {
    width: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginContext: {
    alignItems: 'flex-end',
  },
});

export default Connexion;
