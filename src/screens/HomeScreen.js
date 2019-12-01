import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import MealScreen from './MealScreen';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.statusBarRemover} />
          <View style={styles.titleBar}>
            <Text style={styles.title}>Main Menu</Text>
          </View>
        </View>
        <MealScreen style={styles.screen} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 40 + StatusBar.currentHeight,
    backgroundColor: '#5555ff',
  },
  statusBarRemover: {
    height: StatusBar.currentHeight,
    backgroundColor: '#000',
  },
  screen: {
    flex: 1,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 25,
  },
});

export default HomeScreen;
