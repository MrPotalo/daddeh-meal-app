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

class MealScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /* items: [
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
      ], */
      editMode: false,
      modifyingIndex: -1,
      mealName: '',
    };
  }

  componentWillMount() {
    this._retrieveData();
  }

  componentDidUpdate() {
    if (!_.isEqual(this._lastItemData, this.state.items)) {
      this._storeData();
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('meals');
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
    try {
      AsyncStorage.setItem('meals', JSON.stringify(this.state.items || []));
      this._lastItemData = _.cloneDeep(this.state.items);
    } catch (e) {
      console.log('error saving');
    }
  };

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
        items,
        editMode: false,
        modifyingIndex: -1,
        mealName: '',
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
      modifyingIndex: -1,
      editMode: false,
      mealName: '',
    });
  };

  render() {
    const { style } = this.props;
    const { items } = this.state;
    return items ? (
      <KeyboardAvoidingView enabled behavior="padding" style={style}>
        <MealListControlBar onAdd={this.onAddButtonPress} />
        <MealList
          {...this.state}
          addMeal={this.addMeal}
          mealNameChanged={this.mealNameChanged}
          startEdit={this.startEdit}
          cancelEdit={this.cancelEdit}
          editMeal={this.editMeal}
          deleteMeal={this.deleteMeal}
        />
      </KeyboardAvoidingView>
    ) : null;
  }
}

export default MealScreen;
