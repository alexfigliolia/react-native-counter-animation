import { Component } from "react";
import type { EasingFunction, StyleProp, TextStyle } from "react-native";
import { Animated, Text, View } from "react-native";
import { Controller } from "./Controller";
import { Styles } from "./Styles";
import type { NodeList } from "./types";

export class Token extends Component<Props> {
  private translateY = new Animated.Value(0);

  public override componentDidMount() {
    const { delay, easing, duration } = this.props;
    Animated.timing(this.translateY, {
      delay,
      easing,
      duration,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  public override shouldComponentUpdate({ value }: Props) {
    return value !== this.props.value;
  }

  public override render() {
    const { token, style, height } = this.props;
    const int = parseInt(token.value);
    return (
      <Animated.View
        aria-hidden={true}
        style={[
          Styles.token,
          {
            height: height * token.children.length,
            transform: [
              {
                translateY: this.translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    0,
                    Controller.looseEqual(int, token.value)
                      ? -(int + 1) * height
                      : -height,
                  ],
                }),
              },
            ],
          },
        ]}
      >
        <View style={{ height }} />
        {token.children.map((child, i) => {
          return (
            <Text key={i} style={[{ height }, style]}>
              {child}
            </Text>
          );
        })}
      </Animated.View>
    );
  }
}

interface Props {
  height: number;
  delay: number;
  token: NodeList;
  duration: number;
  easing: EasingFunction;
  value: string | number;
  style?: StyleProp<TextStyle>;
}
