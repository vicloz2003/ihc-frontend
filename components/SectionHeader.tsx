import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  onPress: () => void; // <-- Prop para manejar el clic en "Ver todo"
};

export const SectionHeader = ({ title, onPress }: SectionHeaderProps) => (
  <View className="flex-row justify-between items-center px-4 mt-6 mb-2">
    <Text className="text-lg font-bold text-gray-800">{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text className="text-sm text-green-600 font-medium">Ver todo</Text>
    </TouchableOpacity>
  </View>
);