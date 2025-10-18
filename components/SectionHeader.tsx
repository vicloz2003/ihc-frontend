import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const SectionHeader = ({ title, onPress }: { title: string; onPress?: () => void }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>Ver todo</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  link: {
    fontSize: 15,
    color: '#16a34a',
    fontWeight: '600',
  },
});
