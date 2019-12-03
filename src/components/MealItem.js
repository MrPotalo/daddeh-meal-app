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

    mealItemModified({ ...data, name: mealItemName }, index);
    doneEditing();
  };

  render() {
    const { data, adding } = this.props;
    const { checked, mealItemName } = this.state;
    return (
      <View style={styles.mealItemContainer}>
        <View
          style={{
            ...styles.mealItemColor,
            backgroundColor: data.color,
          }}
        >
          {checked && <MaterialIcons name="cancel" size={ICON_SIZE} />}
        </View>
        <View style={styles.mealItemInfo}>
          {adding ? (
            <TextInput
              style={styles.text}
              value={mealItemName}
              onChangeText={text => this.setState({ mealItemName: text })}
              onSubmitEditing={this.setItemName}
              ref={ref => ref && ref.focus()}
            />
          ) : (
            <TouchableOpacity
              style={styles.mealItemBar}
              onPress={() =>
                this.setState(prevState => {
                  return { checked: !prevState.checked };
                })
              }
            >
              <Text style={styles.text}>{data.name}</Text>
            </TouchableOpacity>
          )}
        </View>
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
  },
  mealItemInfo: {
    flex: 1,
    borderLeftWidth: 1,
  },
  mealItemBar: {
    height: '100%',
  },
  text: {
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
});

export default MealItem;
