import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_SIZE } from '../constants/styleConstants';

class MealListControlBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { onAdd } = this.props;
    return (
      <View style={styles.bar}>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.addButton }}
          onPress={onAdd}
        >
          <MaterialIcons name="add" size={ICON_SIZE}></MaterialIcons>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    height: 40,
    backgroundColor: '#44ff88',
  },
  button: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    alignSelf: 'flex-end',
  },
});

export default MealListControlBar;
