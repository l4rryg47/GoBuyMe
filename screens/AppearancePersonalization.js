import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'react-native';

const ACCENT_COLORS = [
  { name: 'Orange', color: '#FF521B' },
  { name: 'Teal', color: '#58A4B0' },
  { name: 'Navy', color: '#0B3948' },
];

export default function AppearancePersonalization({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [accent, setAccent] = useState(ACCENT_COLORS[0].color);

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#222' : '#FFF0EB' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#0B3948" />
        </Pressable>
        <Text style={styles.title}>Appearance & Personalization</Text>
        <View style={{ width: 28 }} />
      </View>
    {/* Preview */}
      <View style={styles.preview}>
        <Text style={[styles.previewText, { color: accent }]}>Preview</Text>
        <Image
          source={
            darkMode
              ? require('../assets/phone-dark.png')
              : require('../assets/phone-light.png')
          }
          style={styles.phoneImage}
          resizeMode="contain"
        />
        <Text style={styles.phoneLabel}>{darkMode ? 'Dark Mode' : 'Light Mode'}</Text>
      </View>
      {/* Theme Mode */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? '#FF521B' : '#f4f3f4'}
            trackColor={{ false: '#ccc', true: '#FF521B' }}
          />
        </View>
      </View>

      {/* Accent Color */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accent Color</Text>
        <View style={styles.colorRow}>
          {ACCENT_COLORS.map((item) => (
            <Pressable
              key={item.color}
              style={[
                styles.colorCircle,
                { backgroundColor: item.color, borderWidth: accent === item.color ? 3 : 1 },
              ]}
              onPress={() => setAccent(item.color)}
            />
          ))}
        </View>
      </View>

      {/* Preview */}
      <View style={styles.preview}>
        <Text style={[styles.previewText, { color: accent }]}>Preview Button</Text>
        <View style={[styles.previewButton, { backgroundColor: accent }]}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Order Now</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF521B',
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B3948',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#58A4B0',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: '#0B3948',
  },
  preview: {
    alignItems: 'center',
    marginTop: 18,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '600',
  },
  previewButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
    phoneImage: {
    width: 180,
    height: 240,
    marginBottom: 8,
  },
  phoneLabel: {
    fontSize: 14,
    color: '#0B3948',
    fontWeight: '500',
    marginTop: 4,
  },
});