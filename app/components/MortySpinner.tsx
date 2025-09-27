import { FC, useEffect } from "react";
import { Image, ImageStyle, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface MortySpinnerProps {
  /**
   * Size of the spinner icon
   */
  size?: number;
  /**
   * Whether the spinner should be animating
   */
  spinning?: boolean;
  /**
   * Animation duration in milliseconds
   */
  duration?: number;
  /**
   * Custom style overrides
   */
  style?: ViewStyle;
}

/**
 * Animated Morty icon spinner component
 */
export const MortySpinner: FC<MortySpinnerProps> = ({
  size = 40,
  spinning = true,
  duration = 1000,
  style,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (spinning) {
      rotation.value = withRepeat(withTiming(360, { duration }), -1, false);
    } else {
      rotation.value = 0;
    }
  }, [spinning, duration, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Image
        source={require("../../assets/icons/mortyIcon.png")}
        style={imageStyle}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default MortySpinner;