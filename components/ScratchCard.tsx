import React, { useRef, useState } from "react";
import {
  AnimatedProp,
  Canvas,
  Group,
  Image,
  Mask,
  Path,
  Rect,
  SkImage,
  Skia,
} from "@shopify/react-native-skia";
import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  Vibration,
} from "react-native";
import { svgPathProperties } from "svg-path-properties";

type Props = {
  style: StyleProp<ViewStyle>;
  image: AnimatedProp<SkImage | null>;
  children?: React.ReactNode;
};

export const ScratchCard: React.FC<Props> = ({ style, children, image }) => {
  const [[width, height], setSize] = useState([0, 0]);
  const [isScratched, setScratched] = useState(false);
  const [isMove, setMove] = useState(false);
  const [percentageScratched, setPercentageScratched] = useState(0);
  const path = useRef(Skia.Path.Make());

  const handleTouchEnd = () => {
    if (isMove) {
      calculatePercentageScratched();
    }
  };

  const calculatePercentageScratched = () => {
    const pathProperties = new svgPathProperties(path.current.toSVGString());
    const pathLength = pathProperties.getTotalLength();
    const pathArea = pathLength * 50; // 50 is the stroke width
    const totalArea = width * height;
    const percentage = (pathArea / totalArea) * 100;

    setPercentageScratched(percentage);

    if (isScratched) return;

    // Trigger vibration when scratched area is more than 40%
    if (percentage > 40) {
      setScratched(true);
      Vibration.vibrate();
    }
  };

  // Reset the scrached area
  const resetScratchCard = () => {
    path.current = Skia.Path.Make();
    setScratched(false);
    setMove(false);
    setPercentageScratched(0);
  };

  return (
    <View
      onLayout={(e) => {
        setSize([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
      }}
      style={[styles.container, style]}
    >
      {Boolean(image && width && height) && (
        <>
          {isMove && <View style={styles.content}>{children}</View>}
          <Canvas
            style={styles.canvas}
            onTouchStart={({ nativeEvent }) => {
              path.current.moveTo(nativeEvent.locationX, nativeEvent.locationY);
            }}
            onTouchMove={({ nativeEvent }) => {
              setMove(true);
              path.current.lineTo(nativeEvent.locationX, nativeEvent.locationY);
            }}
            onTouchEnd={handleTouchEnd}
          >
            <Mask
              mode="luminance"
              mask={
                <Group>
                  <Rect x={0} y={0} width={1000} height={1000} color="white" />
                  <Path
                    path={path.current}
                    color="black"
                    style="stroke"
                    strokeJoin="round"
                    strokeCap="round"
                    strokeWidth={50}
                  />
                </Group>
              }
            >
              {!isScratched && (
                // Solid color as cover
                <Rect x={0} y={0} width={width} height={height} color="black" />

                // Image as cover
                // <Image image={image} fit="cover" x={0} y={0} width={width} height={height} />
              )}
            </Mask>
          </Canvas>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 300,
    height: 300,
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});
