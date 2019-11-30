import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default HomeScreen;
