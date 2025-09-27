import { FC, useEffect } from "react";
import { DimensionValue, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import { useAppTheme } from "@/theme/context";

interface SkeletonBoxProps {
  /**
   * Width of the skeleton box
   */
  width?: DimensionValue;
  /**
   * Height of the skeleton box
   */
  height?: DimensionValue;
  /**
   * Border radius of the skeleton box
   */
  borderRadius?: number;
  /**
   * Custom style overrides
   */
  style?: ViewStyle;
  /**
   * Animation duration in milliseconds
   */
  duration?: number;
}

/**
 * A skeleton loading component with shimmer animation
 */
export const SkeletonBox: FC<SkeletonBoxProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
  duration = 1500,
}) => {
  const { theme } = useAppTheme();
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    shimmerValue.value = withRepeat(withTiming(1, { duration }), -1, false);
  }, [shimmerValue, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmerValue.value, [0, 0.5, 1], [0.3, 0.7, 0.3]);

    return {
      opacity,
    };
  });

  const baseStyle: ViewStyle = {
    width,
    height,
    borderRadius,
    backgroundColor: theme.colors.palette.neutral300,
  };

  return <Animated.View style={[baseStyle, animatedStyle, style]} />;
};

export default SkeletonBox;
