import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pdhayi <Text style={styles.hindiTitle}>(पढ़ाई)</Text></Text>
        <Text style={styles.subtitle}>Learn & Trace with Fun!</Text>
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#FF6B6B' }]} 
          onPress={() => navigation.navigate('TracingScreen', { type: 'alphabets' })}
        >
          <Text style={styles.cardEmoji}>ABC</Text>
          <Text style={styles.cardText}>Alphabets</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#4D96FF' }]} 
          onPress={() => navigation.navigate('TracingScreen', { type: 'numbers' })}
        >
          <Text style={styles.cardEmoji}>123</Text>
          <Text style={styles.cardText}>Numbers</Text>
        </TouchableOpacity>
      </View>

      {/* Hindi Category Row */}
      <TouchableOpacity 
        style={[styles.hindiCard, { backgroundColor: '#FF9F43' }]} 
        onPress={() => navigation.navigate('TracingScreen', { type: 'hindi' })}
      >
        <Text style={styles.cardEmoji}>अ आ</Text>
        <Text style={styles.cardText}>हिंदी वर्णमाला (Hindi)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  hindiTitle: {
    color: '#FF8800',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 5,
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: width * 0.42,
    height: width * 0.38,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  hindiCard: {
    width: '100%',
    height: width * 0.26,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    flexDirection: 'row',
  },
  cardEmoji: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
    marginRight: 12,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
});