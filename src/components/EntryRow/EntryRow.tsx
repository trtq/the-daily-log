import { useMemo } from "react";
import { Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { TEntry } from "@/services/db/types";
import { formatShortDate } from "@/utils/formatTime";
import {
  RowClip,
  DeleteZone,
  DeleteIcon,
  RowRule,
  RowContent,
  RowKicker,
  RowTitle,
  RowExcerpt,
  SWIPE_DELETE_WIDTH,
} from "./layouts";

export const EntryRow = ({
  entry,
  onPress,
  onDelete,
}: {
  entry: TEntry;
  onPress: () => void;
  onDelete: () => void;
}) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onChange((e) => {
          translateX.value = Math.min(0, translateX.value + e.changeX);
        })
        .onFinalize(() => {
          if (translateX.value < -SWIPE_DELETE_WIDTH) {
            opacity.value = withTiming(0, { duration: 200 }, () => {
              scheduleOnRN(onDelete);
            });
          } else {
            translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
          }
        }),
    [],
  );

  const outerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteZoneStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, -SWIPE_DELETE_WIDTH],
      [0, 1],
      "clamp",
    ),
    transform: [
      { translateX: Math.max(-SWIPE_DELETE_WIDTH, translateX.value) },
    ],
  }));

  return (
    <Animated.View style={outerStyle}>
      <RowClip>
        <DeleteZone style={deleteZoneStyle}>
          <DeleteIcon />
        </DeleteZone>
        <RowRule />
        <GestureDetector gesture={pan}>
          <Animated.View style={cardStyle}>
            <Pressable onPress={onPress}>
              <RowContent>
                <RowKicker>{formatShortDate(entry.createdAt)}</RowKicker>
                <RowTitle numberOfLines={2}>
                  {entry.title || "Untitled"}
                </RowTitle>
                {!!entry.body && (
                  <RowExcerpt testID="row-excerpt" numberOfLines={2}>
                    {entry.body}
                  </RowExcerpt>
                )}
              </RowContent>
            </Pressable>
          </Animated.View>
        </GestureDetector>
      </RowClip>
    </Animated.View>
  );
};
