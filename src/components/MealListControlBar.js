import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_SIZE } from '../constants/styleConstants';
import DateTimePicker from 'react-native-modal-datetime-picker';

class MealListControlBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerVisible: false,
    };
  }

  addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  confirmDate = date => {
    this.props.onDateChange(date);
    this.hideDatePicker();
  };

  render() {
    const { onAdd, onDateChange, currentDate } = this.props;
    return (
      <View style={styles.bar}>
        <View style={styles.dateSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onDateChange(this.addDays(currentDate, -1))}
          >
            <MaterialIcons name="chevron-left" size={ICON_SIZE}></MaterialIcons>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectDate}
            onPress={this.showDatePicker}
          >
            <Text style={styles.text}>{currentDate.toDateString()}</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.confirmDate}
            onCancel={this.hideDatePicker}
            date={currentDate}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onDateChange(this.addDays(currentDate, 1))}
          >
            <MaterialIcons
              name="chevron-right"
              size={ICON_SIZE}
            ></MaterialIcons>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.addButton }}
          onPress={onAdd}
        >
          <MaterialIcons name="add" size={ICON_SIZE}></MaterialIcons>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    height: 40,
    backgroundColor: '#44ff88',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateSection: {
    height: '100%',
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
  button: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {},
  selectDate: {
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
  },
});

export default MealListControlBar;
