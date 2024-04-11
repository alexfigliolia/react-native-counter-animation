import React, { Component } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Animated, Easing, Text } from "react-native";
import { Controller } from "./Controller";
import { Styles } from "./Styles";
import { Token } from "./Token";
import type { IAnimatedNumber, NodeList } from "./types";

/**
 * Animated Number
 *
 * A component for animating a number from zero to
 * the value provided.
 *
 * ```tsx
 * <AnimatedNumber
 *    delay={200}
 *    duration={700}
 *    value="$12,000"
 *    easing={Easing.out(Easing.ease)}
 *    style={{ color: "#fff", fontWeight: "800" }} />
 * ```
 */
export class AnimatedNumber extends Component<IAnimatedNumber, State> {
  private fading = false;
  private nextValue = this.props.value;
  private opacity = new Animated.Value(1);
  public state: State = {
    height: undefined,
    nodeList: Controller.setup(this.props.value),
  };

  public override UNSAFE_componentWillReceiveProps({ value }: IAnimatedNumber) {
    if (value !== this.props.value) {
      this.nextValue = value;
      if (!this.fading) {
        this.fadeOut();
      }
    }
  }

  public override shouldComponentUpdate(_: IAnimatedNumber, nextState: State) {
    return this.state !== nextState;
  }

  private onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (height !== this.state.height) {
      this.setState({ height });
    }
  };

  private fadeOut() {
    this.fading = true;
    Animated.timing(this.opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ nodeList: [] }, () => {
        this.setState({ nodeList: Controller.setup(this.nextValue) }, () => {
          this.fading = false;
          this.opacity.setValue(1);
        });
      });
    });
  }

  public override render() {
    const {
      value,
      style,
      delay = 200,
      duration = 700,
      easing = Easing.out(Easing.ease),
    } = this.props;
    const { height, nodeList } = this.state;
    return (
      <Animated.View
        aria-label={value.toString()}
        style={[
          Styles.counter,
          {
            height,
            opacity: this.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <Text
          aria-hidden={true}
          style={[Styles.shadow, style]}
          onLayout={this.onLayout}
        >
          {value}
        </Text>
        {height !== undefined &&
          nodeList.map((token, index) => {
            return (
              <Token
                token={token}
                style={style}
                value={value}
                height={height}
                easing={easing}
                duration={duration}
                delay={index * 100 + delay}
                key={`${index}-${token.value}`}
              />
            );
          })}
      </Animated.View>
    );
  }
}

interface State {
  nodeList: NodeList[];
  height: undefined | number;
}
