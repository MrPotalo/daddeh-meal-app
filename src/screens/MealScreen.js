import React, { Component } from 'react';
import _ from 'lodash';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import MealList from '../components/MealList';
import MealListControlBar from './../components/MealListControlBar';
import { dayStringFromDate } from './../utils/dateUtils';
import { MEAL_EDIT } from '../constants/editModes';
import { MEAL_ADD, MEAL_ITEM_ADD } from './../constants/editModes';

class MealScreen extends Component {
  constructor(props) {
    super(props);

    const date = new Date();

    this.state = {
      date,
      ...this.resetState,
    };
  }

  resetState = {
    editMode: null,
    mealIndex: -1,
    modifyingIndex: -1,
    mealName: '',
    mealItemName: '',
  };

  componentWillMount() {
    this._retrieveData();
  }

  componentDidUpdate() {
    if (this.state.items === null) {
      this._retrieveData();
    } else if (
      this.state.items !== null &&
      !_.isEqual(this._lastItemData, this.state.items)
    ) {
      this._storeData();
    }
  }

  _retrieveData = async () => {
    const { date } = this.state;
    const day = dayStringFromDate(date);
    try {
      const value = await AsyncStorage.getItem(`meals_${day}`);
      if (value) {
        this._lastItemData = JSON.parse(value);
      } else {
        this._lastItemData = [];
      }
      this.setState({ items: _.cloneDeep(this._lastItemData) });
    } catch (e) {
      console.log('error retrieving data');
    }
  };

  _storeData = async () => {
    const { date } = this.state;
    const day = dayStringFromDate(date);
    try {
      AsyncStorage.setItem(
        `meals_${day}`,
        JSON.stringify(this.state.items || [])
      );
      this._lastItemData = _.cloneDeep(this.state.items);
    } catch (e) {
      console.log('error saving');
    }
  };

  mealNameChanged = mealName => {
    this.setState({ mealName });
  };

  onAddButtonPress = () => {
    const { editMode, mealName } = this.state;
    const adding = editMode === MEAL_ADD;
    if (adding && mealName !== '') {
      this.addMeal(mealName);
    }
    this.setState({
      editMode: MEAL_ADD,
    });
  };

  addMeal = () => {
    this.setState(prevState => {
      if (prevState.mealName === '') {
        return {};
      }
      return {
        items: [...prevState.items, { name: prevState.mealName, items: [] }],
        ...this.resetState,
      };
    });
  };

  startEdit = (name, i) => {
    this.setState({
      editMode: MEAL_EDIT,
      mealName: name,
      modifyingIndex: i,
    });
  };

  editMeal = () => {
    this.setState(prevState => {
      const items = prevState.items.slice();
      items[prevState.modifyingIndex].name = prevState.mealName;
      return {
        items,
        ...this.resetState,
      };
    });
  };

  deleteMeal = i => {
    this.setState(prevState => {
      const items = prevState.items.slice();
      items.splice(i, 1);
      return {
        items,
      };
    });
  };

  cancelEdit = () => {
    this.setState({
      ...this.resetState,
    });
  };

  addMealItem = i => {
    this.setState({
      editMode: MEAL_ITEM_ADD,
      modifyingIndex: i,
      mealItemName: '',
    });
  };

  mealItemNameChanged = mealItemName => {
    this.setState({ mealItemName });
  };

  addMealItemName = () => {
    this.setState(prevState => {
      const items = [...prevState.items];
      items[prevState.modifyingIndex].items.push({
        name: prevState.mealItemName,
        color: '#fff',
      });
      return {
        items,
        ...this.resetState,
      };
    });
  };

  changeDate = date => {
    // setting items to null will retrieve data when the component updates
    this.setState({ date, items: null });
  };

  render() {
    const { style } = this.props;
    const { items, date } = this.state;
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={style}>
        <MealListControlBar
          onAdd={this.onAddButtonPress}
          onDateChange={this.changeDate}
          currentDate={date}
        />
        {items && (
          <MealList
            {...this.state}
            addMeal={this.addMeal}
            mealNameChanged={this.mealNameChanged}
            startEdit={this.startEdit}
            cancelEdit={this.cancelEdit}
            editMeal={this.editMeal}
            deleteMeal={this.deleteMeal}
            onAddMealItemPress={this.addMealItem}
            mealItemNameChanged={this.mealItemNameChanged}
            addMealItemName={this.addMealItemName}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default MealScreen;
