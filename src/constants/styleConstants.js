import { StyleSheet } from 'react-native';

export const MEAL_HEIGHT = 70;
export const MEAL_ITEM_HEIGHT = 50;
export const ICON_SIZE = 30;
export const COLORS = [
  '#ff0000',
  '#0055ff',
  '#00dd00',
  '#ff6600',
  '#af00ff',
];

export const commonStyles = StyleSheet.create({
  button: {
    height: '100%',
    width: ICON_SIZE + 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
