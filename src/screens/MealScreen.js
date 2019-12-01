import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native';

import MealList from '../components/MealList';
import MealListControlBar from './../components/MealListControlBar';

class MealScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          name: 'Breakfast',
          items: [
            { name: 'bacon', color: 'brown' },
            { name: 'eggs', color: 'yellow' },
            { name: 'cereal', color: 'red' },
          ],
        },
        {
          name: 'Lunch',
          items: [
            { name: 'burger', color: 'orange' },
            { name: 'more burger', color: 'red' },
            { name: 'another burger', color: 'blue' },
          ],
        },
      ],
      editMode: false,
      modifyingIndex: -1,
      mealName: '',
    };
  }

  mealNameChanged = mealName => {
    this.setState({ mealName });
  };

  onAddButtonPress = () => {
    const { editMode, modifyingIndex, mealName } = this.state;
    const editing = editMode && modifyingIndex > -1;
    const adding = editMode && !editing;
    if (adding && mealName !== '') {
      this.addMeal(mealName);
    }
    this.setState({
      editMode: true,
    });
  };

  addMeal = () => {
    this.setState(prevState => {
      if (prevState.mealName === '') {
        return {};
      }
      return {
        items: [...prevState.items, { name: prevState.mealName, items: [] }],
        editMode: false,
        modifyingIndex: -1,
        mealName: '',
      };
    });
  };

  startEdit = (name, i) => {
    this.setState({
      editMode: true,
      mealName: name,
      modifyingIndex: i,
    });
  };

  editMeal = () => {
    this.setState(prevState => {
      const items = prevState.items.slice();
      items[prevState.modifyingIndex].name = prevState.mealName;
      return {
        ...prevState,
        items,
        editMode: false,
        modifyingIndex: -1,
        mealName: '',
      };
    });
  };

  render() {
    const { style } = this.props;
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={style}>
        <MealListControlBar onAdd={this.onAddButtonPress} />
        <MealList
          {...this.state}
          addMeal={this.addMeal}
          mealNameChanged={this.mealNameChanged}
          startEdit={this.startEdit}
          editMeal={this.editMeal}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default MealScreen;
