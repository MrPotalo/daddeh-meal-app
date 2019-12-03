import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Easing,
} from 'react-native';

import MealItem from './MealItem';
import HorizontalSeperator from './HorizontalSeperator';
import { MEAL_HEIGHT, ICON_SIZE } from './../constants/styleConstants';
import { MaterialIcons } from '@expo/vector-icons';

class Meal extends Component {
  constructor(props) {
    super(props);

    this.animateHeight = new Animated.Value(0);

    this.state = {
      expanded: false,
      mealName: this.props.data.name,
    };
  }

  mealItemModified = (item, i) => {
    const { data, modifyMeal, index } = this.props;
    const items = data.items.slice();
    if (!items[i]) {
      items[i] = item;
    } else if (!item && items[i]) {
      items.splice(i, 1);
    } else {
      items[i] = item;
    }
    modifyMeal({ ...data, items }, index);
  };

  setMealName = () => {
    const { data, index, modifyMeal, doneEditing } = this.props;
    const { mealName } = this.state;

    modifyMeal({ ...data, name: mealName }, index);
    doneEditing();
  };

  startEdit = () => {
    const { index, setEditPath } = this.props;

    setEditPath([index]);
  };

  deleteMeal = () => {
    const { index, modifyMeal, doneEditing } = this.props;

    modifyMeal(null, index);
    doneEditing();
  };

  addMealItemPress = () => {
    const { index, data, setEditPath } = this.props;

    setEditPath([index, data.items.length]);
  };

  expandClicked = () => {
    const { expanded } = this.state;

    !expanded && this.setState({ expanded: !expanded });
    Animated.timing(this.animateHeight, {
      toValue: expanded ? 0 : 1,
      duration: 150,
    }).start(() => expanded && this.setState({ expanded: !expanded }));
  };

  render() {
    const {
      style,
      data,
      index,
      editing,
      editPath,
      doneEditing,
      setEditPath,
    } = this.props;
    const { expanded, mealName } = this.state;

    const animatedStyle = {
      overflow: 'hidden',
      flex: 1,
      height: this.animateHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 50 * (data.items.length + 1)],
        extrapolateLeft: 'clamp'
      })
    }

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
              onChangeText={mealName => this.setState({ mealName })}
              onSubmitEditing={this.setMealName}
            />
            <TouchableOpacity style={styles.button} onPress={this.setMealName}>
              <MaterialIcons name="check" size={ICON_SIZE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={doneEditing}>
              <MaterialIcons name="clear" size={ICON_SIZE} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.mealContainer}
            onPress={this.expandClicked}
          >
            <Text style={styles.text}>{data.name}</Text>
            <TouchableOpacity style={styles.button} onPress={this.startEdit}>
              <MaterialIcons name="edit" size={ICON_SIZE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.deleteMeal}>
              <MaterialIcons name="delete" size={ICON_SIZE} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        {expanded && (
          <Animated.View
            style={animatedStyle}
          >
            {[
              ...data.items.map((mealItem, i) => {
                // show each individual meal item
                return [
                  <HorizontalSeperator key={0} />,
                  <MealItem
                    key={1}
                    index={i}
                    data={mealItem}
                    doneEditing={doneEditing}
                    setEditPath={setEditPath}
                  />,
                ];
              }),
              editPath[0] === index && editPath[1] === data.items.length ? (
                [
                  <HorizontalSeperator key={'addSeperator'} />,
                  <MealItem
                    key={'add'}
                    index={data.items.length}
                    data={{ name: '', color: '#fff' }}
                    mealItemModified={this.mealItemModified}
                    doneEditing={doneEditing}
                    adding={true}
                  />,
                ]
              ) : (
                <TouchableOpacity
                  key={'add'}
                  style={styles.addItem}
                  onPress={this.addMealItemPress}
                >
                  <MaterialIcons
                    style={styles.addButton}
                    name="add"
                    size={ICON_SIZE}
                  />
                </TouchableOpacity>
              ),
            ]}
          </Animated.View>
        )}
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
