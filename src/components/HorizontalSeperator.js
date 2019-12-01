import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class HorizontalSeperator extends Component {
  render() {
    return <View style={styles.seperator}></View>;
  }
}

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#000',
  },
});

export default HorizontalSeperator;
