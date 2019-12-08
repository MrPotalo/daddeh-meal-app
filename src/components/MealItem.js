import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ICON_SIZE,
  commonStyles,
  MEAL_ITEM_HEIGHT,
} from '../constants/styleConstants';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MealItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealItemName: props.data.name,
    };
  }

  startEdit = () => {
    const { setEditPath, data } = this.props;

    this.setState({ mealItemName: data.name });
    setEditPath();
  }

  setItemName = () => {
    const { data, index, mealItemModified, doneEditing } = this.props;
    const { mealItemName } = this.state;

    mealItemModified(
      mealItemName === '' ? null : { ...data, name: mealItemName },
      index
    );
    doneEditing();
  };

  deleteItem = () => {
    const { index, mealItemModified } = this.props;

    mealItemModified(null, index);
  };

  mealItemChecked = () => {
    const { data, index, mealItemModified } = this.props;

    mealItemModified({...data, checked: !data.checked }, index);
  }

  render() {
    const { data, editing, doneEditing } = this.props;
    const { mealItemName } = this.state;
    const { checked } = data;

    if (editing) {
      return (
        <View style={styles.mealItemContainer}>
          <View
            style={{ ...styles.mealItemColor, backgroundColor: data.color }}
          />
          <TextInput
            style={[styles.mealItemInfo, styles.text]}
            value={mealItemName}
            onChangeText={(text) => this.setState({ mealItemName: text })}
            onSubmitEditing={this.setItemName}
            ref={(ref) => ref && ref.focus()}
          ></TextInput>
          <TouchableOpacity
            style={commonStyles.button}
            onPress={this.setItemName}
          >
            <MaterialIcons name="check" size={ICON_SIZE} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.button} onPress={doneEditing}>
            <MaterialIcons name="clear" size={ICON_SIZE} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.mealItemContainer}>
        <TouchableOpacity
          onPress={this.mealItemChecked}
          style={{
            ...styles.mealItemColor,
            backgroundColor: data.color,
          }}
        >
          {checked && <MaterialIcons name="clear" size={MEAL_ITEM_HEIGHT} />}
        </TouchableOpacity>
        <View style={styles.mealItemInfo}>
          <Text style={styles.text}>{data.name}</Text>
        </View>
        <TouchableOpacity style={commonStyles.button} onPress={this.startEdit}>
          <MaterialIcons name="edit" size={ICON_SIZE} />
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.button} onPress={this.deleteItem}>
          <MaterialIcons name="delete" size={ICON_SIZE} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mealItemContainer: {
    height: MEAL_ITEM_HEIGHT,
    flexDirection: 'row',
  },
  mealItemColor: {
    height: '100%',
    aspectRatio: 1,
    borderRightWidth: 1,
  },
  mealItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 5,
  },
});

export default MealItem;
