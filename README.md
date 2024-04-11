# React Native Counter Animation
A number animation library for adding some flair to your data

[Screenshot](media/rn-counter.gif)

## Installation

```bash
npm i -S react-native-counter-animation
# or
yarn add react-native-counter-animation 
```

## Usage 
```tsx
import { View, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "react-native-counter-animation";

const MyComponent = () => {
  const [value, setValue] = useState(5000);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setValue(Math.floor(Math.random() * 5000));
    }, 5000);
    return () => {
      clearInterval(timer.current);
      timer.current = null;
    }
  });

  return (
    <View>
      {/* ...your component code */}
      <AnimatedNumber
        delay={200}
        duration={700}
        value="$12,000"
        easing={Easing.out(Easing.ease)}
        style={{ color: "#fff", fontWeight: "800" }} />
    </View>
  );
}
```

### Options

`delay`: A millisecond duration to defer the animation

`duration`: A millisecond duration for the animation

`value`: A string or number to animate to

`easing`: An easing function such as a Cubic Bezier

`style`: Any styling you wish to apply to your text
