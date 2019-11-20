import {
  View, StyleSheet, CheckBox,
} from 'react-native';
import { Text } from 'native-base';
import React, { Component } from 'react';

export default class SettingsTagCheckbox extends Component {
  render() {
    const { tag, tagsChanged, checked } = this.props;
    return (
      <View
        style={styles.container}
      >
        <CheckBox
          value={checked}
          onValueChange={() => {
            tagsChanged(tag);
          }}
        />
        <Text>
          {tag}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
