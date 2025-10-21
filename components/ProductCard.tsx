import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductProps = {
  id: number;
  name: string;
  price: number;
  image: any; // require()
  onAddToCart: () => void;
  onPress?: () => void; // ← nueva prop

};

export const ProductCard = ({ name, price, image, onAddToCart, onPress}: ProductProps) => {
    //<View style={styles.card}>
    //presiona el producto para ver detalles
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Imagen del producto */}
      <Image source={image} style={styles.image} resizeMode="contain" />

      {/* Información */}
      <View style={styles.infoContainer}>
        <Text style={styles.price}>Bs. {price.toFixed(2)}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
      </View>

      {/* Botón agregar al carrito */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={(e: GestureResponderEvent) => {
          e.stopPropagation(); // evitar que el onPress externo se dispare
          onAddToCart();
        }}
      >
        <Ionicons name="cart-outline" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity> //  cierre correcto del TouchableOpacity externo
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 210, // 🔹 altura fija para alinear todos los cards
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-between', // mantiene estructura estable
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 6,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  name: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#374151',
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#16a34a',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 6,
  },
});
