import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductProps = {
  id: number;
  name: string;
  price: number;
  image: any; // require()
  onAddToCart: () => void;
};

export const ProductCard = ({ name, price, image, onAddToCart }: ProductProps) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Ionicons name="cart-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100, // tamaño uniforme
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a', // verde
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#16a34a',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});
