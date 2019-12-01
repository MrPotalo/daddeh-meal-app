import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import MealItem from './MealItem';
import HorizontalSeperator from './HorizontalSeperator';
import { MEAL_HEIGHT, ICON_SIZE } from './../constants/styleConstants';
import { MaterialIcons } from '@expo/vector-icons';

class Meal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render() {
    const {
      style,
      data,
      editing,
      onTitleChange,
      onSubmitEditing,
      onCancelEditing,
      mealName,
      startEdit,
      deleteMeal,
    } = this.props;
    const { expanded } = this.state;
    return (
      <View style={style}>
        {editing ? (
          <View style={styles.mealContainer}>
            <TextInput
              style={styles.text}
              value={mealName}
              ref={ref => {
                if (ref) {
                  ref.focus();
                }
              }}
              onChangeText={onTitleChange}
              onSubmitEditing={onSubmitEditing}
            />
            <TouchableOpacity style={styles.button} onPress={onSubmitEditing}>
              <MaterialIcons name="check" size={ICON_SIZE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onCancelEditing}>
              <MaterialIcons name="clear" size={ICON_SIZE} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.mealContainer}
            onPress={() => {
              this.setState(oldState => {
                return {
                  expanded: !oldState.expanded,
                };
              });
            }}
          >
            <Text style={styles.text}>{data.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => startEdit(data.name)}
            >
              <MaterialIcons name="edit" size={ICON_SIZE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={deleteMeal}>
              <MaterialIcons name="delete" size={ICON_SIZE} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        {expanded && [
          ...data.items.map(mealItem => {
            // show each individual meal item
            return [
              <HorizontalSeperator key={0} />,
              <MealItem key={1} data={mealItem} />,
            ];
          }),
          <TouchableOpacity key={'add'} style={styles.addItem}>
            <MaterialIcons
              style={styles.addButton}
              name="add"
              size={ICON_SIZE}
            />
          </TouchableOpacity>,
        ]}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mealContainer: {
    height: MEAL_HEIGHT,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    flex: 1,
    marginLeft: 20,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  addItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#eee',
  },
  addButton: {
    marginRight: 20,
  },
});

export default Meal;
