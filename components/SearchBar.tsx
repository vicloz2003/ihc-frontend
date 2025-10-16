import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

export const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mx-4 mt-4">
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        placeholder="Buscar productos..."
        className="flex-1 ml-2 text-gray-700"
        placeholderTextColor="#999"
      />
    </View>
  );
};


