import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MealItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.mealItemContainer}>
        <View
          style={{
            ...styles.mealItemColor,
            backgroundColor: data.color,
          }}
        />
        <View style={styles.mealItemInfo}>
          <Text style={styles.text}>{data.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mealItemContainer: {
    height: 50,
    flexDirection: 'row',
  },
  mealItemColor: {
    height: '100%',
    aspectRatio: 1,
  },
  mealItemInfo: {
    flex: 1,
    borderLeftWidth: 1,
  },
  text: {
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
});

export default MealItem;