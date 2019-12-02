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
      editMode,
      modifyingIndex,
      addMeal,
      mealName,
      mealNameChanged,
      editMeal,
      startEdit,
      deleteMeal,
      cancelEdit,
      onAddMealItemPress,
      mealItemName,
      mealItemNameChanged,
      addMealItemName,
    } = this.props;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        style={styles.container}
        ref={scrollView => {
          editMode === MEAL_ADD &&
            scrollView &&
            scrollView.scrollToEnd({ animated: true });
        }}
      >
        {items.map((meal, i) => {
          return [
            <Meal
              key={0}
              style={styles.meal}
              data={meal}
              editing={editMode === MEAL_EDIT && i === modifyingIndex}
              editingItem={
                (i === modifyingIndex && (editMode === MEAL_ITEM_EDIT ||
                editMode === MEAL_ITEM_ADD))
              }
              onTitleChange={mealNameChanged}
              onSubmitEditing={editMeal}
              onCancelEditing={cancelEdit}
              mealName={mealName}
              startEdit={name => startEdit(name, i)}
              deleteMeal={() => deleteMeal(i)}
              onAddMealItemPress={() => onAddMealItemPress(i)}
              mealItemNameChanged={mealItemNameChanged}
              mealItemName={mealItemName}
              addMealItemName={addMealItemName}
            />,
            <HorizontalSeperator key={1} />,
          ];
        })}
        {editMode === MEAL_ADD && [
          <Meal
            key={0}
            style={styles.meal}
            data={{ name: '', items: [] }}
            editing={true}
            onTitleChange={mealNameChanged}
            onSubmitEditing={addMeal}
            onCancelEditing={cancelEdit}
            mealName={mealName}
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
