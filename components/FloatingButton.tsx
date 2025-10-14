import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const FloatingButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="absolute bottom-6 right-6 bg-green-600 p-4 rounded-full shadow-lg"
  >
    <Ionicons name="add" size={28} color="white" />
  </TouchableOpacity>
);
