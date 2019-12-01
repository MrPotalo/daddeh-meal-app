import React, { Component } from 'react';
import { ScrollView, View, TextInput, StyleSheet } from 'react-native';

import Meal from './Meal';
import HorizontalSeperator from './HorizontalSeperator';
import { MEAL_HEIGHT } from './../constants/styleConstants';

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
    } = this.props;
    const editing = editMode && modifyingIndex > -1;
    const adding = editMode && !editing;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        style={styles.container}
        ref={scrollView => {
          adding && scrollView && scrollView.scrollToEnd({ animated: true });
        }}
      >
        {items.map((meal, i) => {
          return [
            <Meal
              key={0}
              style={styles.meal}
              data={meal}
              editing={editing && i === modifyingIndex}
              onTitleChange={mealNameChanged}
              onSubmitEditing={editMeal}
              mealName={mealName}
              startEdit={name => startEdit(name, i)}
            />,
            <HorizontalSeperator key={1} />,
          ];
        })}
        {adding && [
          <Meal
            key={0}
            style={styles.meal}
            data={{ name: '', items: [] }}
            editing={true}
            onTitleChange={mealNameChanged}
            onSubmitEditing={addMeal}
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
