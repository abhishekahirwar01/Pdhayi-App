import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { COLORS } from '../constants/colors';
import { LEARNING_DATA } from '../data/learningData';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width * 0.85;

export default function TracingScreen({ route, navigation }: { route: any, navigation: any }) {
  const { type } = route.params || { type: 'alphabets' };
  const dataList = LEARNING_DATA[type as keyof typeof LEARNING_DATA] || LEARNING_DATA.alphabets;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paths, setPaths] = useState<any[]>([]);
  
  const currentPath = useRef<any>(null);
  const flatListRef = useRef<FlatList>(null);

  const currentItem = dataList[currentIndex] || dataList[0];

  const panGesture = Gesture.Pan()
    .onStart((g) => {
      const newPath = Skia.Path.Make();
      newPath.moveTo(g.x, g.y);
      currentPath.current = newPath;
      runOnJS(setPaths)((prev) => [...prev, newPath]);
    })
    .onUpdate((g) => {
      if (currentPath.current) {
        currentPath.current.lineTo(g.x, g.y);
        runOnJS(setPaths)((prev) => [...prev]);
      }
    })
    .runOnJS(true);

  const clearCanvas = () => {
    setPaths([]);
  };

  const selectItem = (index: number) => {
    setCurrentIndex(index);
    clearCanvas();
    flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
  };

  const getScreenTitle = () => {
    if (type === 'numbers') return 'Trace Numbers (1-20)';
    if (type === 'hindi') return 'Trace Hindi Varnamala';
    return 'Trace Alphabets (A-Z)';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{getScreenTitle()}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tracing Canvas Box */}
      <GestureDetector gesture={panGesture}>
        <View style={styles.canvasContainer}>
          {/* Background Ghost Letter/Number */}
          <Text style={styles.guideText}>{currentItem.char}</Text>
          
          <Canvas style={styles.canvas}>
            {/* User Drawn Paths */}
            {paths.map((path, index) => (
              <Path
                key={index}
                path={path}
                color={COLORS.primary}
                style="stroke"
                strokeWidth={14}
                strokeCap="round"
                strokeJoin="round"
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>

      {/* Bottom Controls & Selector Strip */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
          <Text style={styles.clearText}>Clear Canvas 🔄</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={dataList}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item, index) => `${item.char}-${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.itemBubble,
                currentIndex === index && styles.selectedBubble,
              ]}
              onPress={() => selectItem(index)}
            >
              <Text style={[styles.itemText, currentIndex === index && styles.selectedItemText]}>
                {item.char}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  backText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: -4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  placeholder: {
    width: 42,
  },
  canvasContainer: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  guideText: {
    position: 'absolute',
    fontSize: 160,
    fontWeight: 'bold',
    color: '#CBD5E0',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  clearButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 14,
    elevation: 2,
    marginBottom: 15,
  },
  clearText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  itemBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    elevation: 2,
  },
  selectedBubble: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  selectedItemText: {
    color: COLORS.white,
  },
});