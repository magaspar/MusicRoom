import React from 'react';
import {
  Text, StyleSheet, View, TouchableOpacity, Alert, BackHandler,
} from 'react-native';
import { Icon } from 'native-base';
import AddFloatingButton from '../containers/AddFloatingButton';
import JoinPrivateRoom from '../containers/JoinPrivateRoom';
import { Colors, Typography } from '../styles';

class Home extends React.Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this._blurListener = navigation.addListener('willBlur', () => {
      this.backHandler.remove();
    });
    this._focusListener = navigation.addListener('didFocus', () => {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    });
  }

  _onPressParty = () => {
    const { navigation } = this.props;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    navigation.navigate('PartysList');
  };

  _onPressRadio = () => {
    const { navigation, loggedUser } = this.props;
    if (loggedUser.premium) {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      navigation.navigate('RadiosList');
    } else {
      Alert.alert('Vous devez posséder un compte Premium pour accéder à cette fonctionnalité.');
    }
  };

  setModalVisible = () => {
    const { modalVisible } = this.state;
    const visible = !modalVisible;
    this.setState({ modalVisible: visible });
  };

  handleBackPress = () => {
    console.log('BP Home');
    const { socket } = this.props;
    socket.disconnect();
    BackHandler.exitApp();
    return true;
  };

  render() {
    const { modalVisible } = this.state;
    const { loggedUser } = this.props;

    return (
      <View style={styles.container}>
        <JoinPrivateRoom
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
          userId={loggedUser._id}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this._onPressParty}
          style={[styles.card, { marginTop: 20, marginBottom: 10 }]}
        >
          <View style={styles.place}>
            <Text style={styles.textCard}>Party</Text>
            <Icon name="musical-notes" style={{ ...Typography.icon }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this._onPressRadio}
          style={[styles.card, { marginTop: 10, marginBottom: 20 }]}
        >
          <View style={styles.place}>
            <Text style={styles.textCard}>Radio</Text>
            <Icon name="radio" style={{ ...Typography.icon }} />
          </View>
        </TouchableOpacity>
        <AddFloatingButton handlePress={() => this.setModalVisible(true)} icon="joinPrivateRoom" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.darkGrey,
    borderTopWidth: 3,
    borderTopLeftRadius: 0,
    borderRightWidth: 3,
    borderBottomRightRadius: 0,
    borderColor: Colors.lightGreen,
  },
  place: {
    alignItems: 'center',
  },
  textCard: {
    ...Typography.sectionHeaderText,
    fontSize: Typography.extraLargeFontSize,
  },
});

export default Home;
