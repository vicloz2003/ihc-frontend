import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = [
  'Aderezos',
  'Básicos',
  'Café y Sucedáneos',
  'Chocolates y Caramelos',
  'Comidas en Conserva',
  'Condimentos y Legumbres',
  'Dietéticos y Saludables',
  'Frutas en Conserva',
  'Galletas',
  'Golosinas - Varias',
  'Mascotas',
  'Mermeladas y Mieles',
  'Nutrición Infantil',
  'Productos Americanos',
  'Productos Importados',
  'Repostería',
  'Salsas y Extracto de Tomate',
  'Snacks',
  'Temporada',
  'Verduras en Conserva',
];

export default function CategoryCarousel() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#16a34a',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 13,
    color: '#000000',
  },
});
