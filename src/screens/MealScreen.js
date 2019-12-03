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
    editPath: [],
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

  modifyMeal = (item, i) => {
    this.setState(prevState => {
      const items = prevState.items.slice();
      if (!items[i]) {
        items.push(item);
      } else if (!item && items[i]) {
        items.splice(i, 1);
      } else {
        items[i] = item;
      }
      return { items };
    });
  };

  setEditPath = editPath => {
    this.setState({ editPath });
  };

  resetEditState = () => {
    this.setState({ ...this.resetState });
  };

  onAddButtonPress = () => {
    const { items } = this.state;
    /* const adding = editMode === MEAL_ADD;
    if (adding && mealName !== '') {
      this.addMeal(mealName);
    } */
    this.setState({
      editPath: [items.length],
    });
  };

  changeDate = date => {
    // setting items to null will retrieve data when the component updates
    this.setState({ date, items: null });
  };

  render() {
    const { style } = this.props;
    const { items, date, editPath } = this.state;
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={style}>
        <MealListControlBar
          onAdd={this.onAddButtonPress}
          onDateChange={this.changeDate}
          currentDate={date}
        />
        {items && (
          <MealList
            items={items}
            date={date}
            editPath={editPath}
            modifyMeal={this.modifyMeal}
            setEditPath={this.setEditPath}
            doneEditing={this.resetEditState}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default MealScreen;
