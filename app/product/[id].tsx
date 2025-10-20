import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../context/CartContext';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Leche Deslactosada Pil Light',
    price: 25.0,
    image: require('@/assets/images/pil.png'),
  },
  {
    id: 2,
    name: 'Harina Famosa',
    price: 45.5,
    image: require('@/assets/images/harina.png'),
  },
  {
    id: 3,
    name: 'Pollo Sofia',
    price: 50.0,
    image: require('@/assets/images/pollo.png'),
  },
  {
    id: 4,
    name: 'Papel Higienico Familiar',
    price: 18.75,
    image: require('@/assets/images/papel.png'),
  },
  {
    id: 5,
    name: 'Gatorade Cool Blue 500 ml',
    price: 9.70,
    image: require('@/assets/images/gatoradeBlue.png'),
  },
  {
    id: 6,
    name: 'Gatorade Frutas Tropicales 500 ml',
    price: 9.70,
    image: require('@/assets/images/gatoradeRed.png'),
  },
  {
    id: 7,
    name: 'Pepsi Black 2 L',
    price: 9.50,
    image: require('@/assets/images/pepsiSinAzucar.png'),
  },
  {
    id: 8,
    name: 'Pepsi 1 L',
    price: 5.70,
    image: require('@/assets/images/pepsi.png'),
  },
  {
    id: 9,
    name: 'Seven Up 3 L',
    price: 15.50,
    image: require('@/assets/images/7up.png'),
  },
  {
    id: 10,
    name: 'Maltin 440 ml',
    price: 5.70,
    image: require('@/assets/images/maltin.png'),
  },
  {
    id: 11,
    name: 'Omo Limon 4.8 kg',
    price: 112.90,
    image: require('@/assets/images/omoVerde.png'),
  },
  {
    id: 12,
    name: 'Papel Higienico 12 un',
    price: 28.50,
    image: require('@/assets/images/papel12.png'),
  },
  {
    id: 13,
    name: 'Todo Brillo 1.8 kg',
    price: 37.90,
    image: require('@/assets/images/todoBrilloLimon.png'),
  },
  {
    id: 14,
    name: 'Te Windsor Canela 130 Sobres',
    price: 31.50,
    image: require('@/assets/images/maltin.png'),
  },
  {
    id: 15,
    name: 'Lavavajilla Ola Limon 900 ml',
    price: 16.00,
    image: require('@/assets/images/olaLimon.png'),
  },
  {
    id: 16,
    name: 'Doctor Babys Nina 100 un',
    price: 18.00,
    image: require('@/assets/images/DoctorBabys100.png'),
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams(); // Obtenemos el ID de la URL
  const { addToCart } = useCart(); // Usamos el contexto de carrito
  const router = useRouter(); // Usamos el router para navegar

  // Buscamos el producto que corresponde al ID
  const product = MOCK_PRODUCTS.find((p) => p.id.toString() === id);

  // Si no encontramos el producto, mostramos un mensaje de error
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Bs {product.price.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)} // Agregar al carrito
      >
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/')} // Navegar de regreso a la pantalla principal
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#16a34a',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
