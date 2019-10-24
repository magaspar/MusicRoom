import React from 'react';
import {
  Modal, StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';


export default class DatePickerModal extends React.Component {
  state = {
    date: new Date(),
  };

  render() {
    const {
      setModalVisible,
      DateModalVisible,
      onDateChanged,
    } = this.props;
    const { date } = this.state;
    return (
      <Modal
        style={{ flex: 1 }}
        animationType="fade"
        transparent={false}
        visible={DateModalVisible}
        onRequestClose={() => {
          setModalVisible();
        }}
      >
        <View
          style={styles.Date}
        >
          <DatePicker
            date={date}
            onDateChange={Date => this.setState({ date: Date })}
          />
          <TouchableOpacity
            onPress={() => {
              onDateChanged(date);
              setModalVisible();
            }}
          >
            <Text style={styles.hide}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  Date: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  hide: {
    fontSize: 22,
    marginTop: '5%',
  },
});
