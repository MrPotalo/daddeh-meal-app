import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_SIZE } from '../constants/styleConstants';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MealItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      mealItemName: props.data.name,
    };
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

  render() {
    const { data, editing, doneEditing, setEditPath } = this.props;
    const { checked, mealItemName } = this.state;

    if (editing) {
      return (
        <View style={styles.mealItemContainer}>
          <View
            style={{ ...styles.mealItemColor, backgroundColor: data.color }}
          />
          <TextInput
            style={[styles.mealItemInfo, styles.text]}
            value={mealItemName}
            onChangeText={text => this.setState({ mealItemName: text })}
            onSubmitEditing={this.setItemName}
            ref={ref => ref && ref.focus()}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={this.setItemName}>
            <MaterialIcons name="check" size={ICON_SIZE} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={doneEditing}>
            <MaterialIcons name="clear" size={ICON_SIZE} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.mealItemContainer}>
        <View
          style={{
            ...styles.mealItemColor,
            backgroundColor: data.color,
          }}
        >
          {checked && <MaterialIcons name="clear" size={50} />}
        </View>
        <View style={styles.mealItemInfo}>
          <Text style={styles.text}>{data.name}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={setEditPath}>
          <MaterialIcons name="edit" size={ICON_SIZE} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.deleteItem}>
          <MaterialIcons name="delete" size={ICON_SIZE} />
        </TouchableOpacity>
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
    borderRightWidth: 1,
  },
  mealItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  text: {
    marginLeft: 5,
  },
});

export default MealItem;
