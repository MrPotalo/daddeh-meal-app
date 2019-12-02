import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

class MealItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  render() {
    const { data, adding, addMealItemName, mealItemNameChanged } = this.props;
    return (
      <View style={styles.mealItemContainer}>
        <View
          style={{
            ...styles.mealItemColor,
            backgroundColor: data.color,
          }}
        />
        <View style={styles.mealItemInfo}>
          {adding ? (
            <TextInput
              style={styles.text}
              onChangeText={mealItemNameChanged}
              onSubmitEditing={addMealItemName}
              ref={ref => ref && ref.focus()}
            />
          ) : (
            <Text style={styles.text}>{data.name}</Text>
          )}
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
