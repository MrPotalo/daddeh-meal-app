import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MEAL_ITEM_HEIGHT } from '../constants/styleConstants';

export default class ColorPicker extends Component {
  

  static propTypes = {
    style: PropTypes.object,
    values: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  expandPicker = (isExpanded) => {
    this.setState((prevState) => {
      return {
        expanded: isExpanded || !prevState.expanded,
      };
    });
  };

  onColorChanged = (color) => {
    const { onChange } = this.props;
    onChange(color);
    this.expandPicker(false);
  };

  render() {
    const { style, values, selected } = this.props;
    const { expanded } = this.state;

    return [
      <TouchableOpacity
        key={0}
        style={[style, { backgroundColor: selected }]}
        onPress={() => this.expandPicker()}
      />,
      ...(expanded
        ? values
            .map((value, i) => {
              return (
                <TouchableOpacity
                  key={i + 1}
                  style={[
                    style,
                    {
                      backgroundColor: value,
                      position: 'absolute',
                      zIndex: 100,
                      left: (i + 1) * MEAL_ITEM_HEIGHT,
                    },
                  ]}
                  onPress={() => this.onColorChanged(value)}
                />
              );
            })
        : []),
    ];
  }
}
