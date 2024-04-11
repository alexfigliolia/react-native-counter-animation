import type { EasingFunction, StyleProp, TextStyle } from "react-native";

export interface NodeList {
  value: string;
  children: (number | string)[];
}

export interface IAnimatedNumber {
  /**
   * Delay
   *
   * A millisecond duration to delay the animation
   */
  delay?: number;
  /**
   * Duration
   *
   * The duration of the animation
   */
  duration?: number;
  /**
   * Value
   *
   * The value to animate
   */
  value: string | number;
  /**
   * Easing
   *
   * An easing function such as a cubic bezier
   */
  easing?: EasingFunction;
  /**
   * Style
   *
   * Styles to be applied to the text nodes
   */
  style?: StyleProp<TextStyle>;
}
