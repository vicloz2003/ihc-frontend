// components/SearchBar.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar productos..."
        placeholderTextColor="#94a3b8"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="#16a34a" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    flex: 1,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  input: {
    flex: 1,
    color: '#1e293b',
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 8,
  },
});

