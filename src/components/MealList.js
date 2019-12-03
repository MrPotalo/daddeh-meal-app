import React, { Component } from 'react';
import { ScrollView, View, TextInput, StyleSheet } from 'react-native';

import Meal from './Meal';
import HorizontalSeperator from './HorizontalSeperator';
import { MEAL_HEIGHT } from './../constants/styleConstants';
import { MEAL_EDIT, MEAL_ITEM_EDIT } from '../constants/editModes';
import { MEAL_ADD, MEAL_ITEM_ADD } from './../constants/editModes';

class MealList extends Component {
  render() {
    const {
      items,
      editPath,
      modifyMeal,
      doneEditing,
      setEditPath,
    } = this.props;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        style={styles.container}
      >
        {items.map((meal, i) => {
          return [
            <Meal
              key={0}
              index={i}
              style={styles.meal}
              data={meal}
              editing={editPath[0] === i && !(editPath[1] > -1)}
              editPath={editPath}
              modifyMeal={modifyMeal}
              doneEditing={doneEditing}
              setEditPath={setEditPath}
            />,
            <HorizontalSeperator key={1} />,
          ];
        })}
        {editPath[0] === items.length &&
          !(editPath[1] > -1) && [
            <Meal
              key={0}
              index={items.length}
              style={styles.meal}
              data={{ name: '', items: [] }}
              editing={true}
              modifyMeal={modifyMeal}
              doneEditing={doneEditing}
            />,
            <HorizontalSeperator key={1} />,
          ]}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  meal: {
    flex: 1,
  },
  addingMeal: {
    height: MEAL_HEIGHT,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: 'center',
  },
});

export default MealList;
