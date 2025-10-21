import { useLocalSearchParams, useRouter } from 'expo-router'; 
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useCart } from '../context/CartContext';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Leche Deslactosada Pil Light',
    price: 25.0,
    image: require('@/assets/images/pil.png'),
    description: 'Leche deslactosada para una digestión más fácil, ideal para personas con intolerancia a la lactosa.',
  },
  {
    id: 2,
    name: 'Harina Famosa',
    price: 45.5,
    image: require('@/assets/images/harina.png'),
    description: 'Harina de trigo de alta calidad para tus recetas, perfecta para panes, pasteles y más.',
  },
  {
    id: 3,
    name: 'Pollo Sofia',
    price: 50.0,
    image: require('@/assets/images/pollo.png'),
    description: 'Pollo fresco, ideal para preparar una variedad de platos deliciosos y nutritivos.',
  },
  {
    id: 4,
    name: 'Papel Higienico Familiar',
    price: 18.75,
    image: require('@/assets/images/papel.png'),
    description: 'Papel higiénico de 12 rollos, suave y resistente para toda la familia.',
  },
  {
    id: 5,
    name: 'Gatorade Cool Blue 500 ml',
    price: 9.70,
    image: require('@/assets/images/gatoradeBlue.png'),
    description: 'Bebida deportiva isotónica para reponer líquidos y electrolitos después del ejercicio.',
  },
  {
    id: 6,
    name: 'Gatorade Frutas Tropicales 500 ml',
    price: 9.70,
    image: require('@/assets/images/gatoradeRed.png'),
    description: 'Refresca tu cuerpo con la bebida Gatorade Frutas Tropicales, ideal para deportistas.',
  },
  {
    id: 7,
    name: 'Pepsi Black 2 L',
    price: 9.50,
    image: require('@/assets/images/pepsiSinAzucar.png'),
    description: 'Pepsi sin azúcar, la versión más ligera para disfrutar sin remordimientos.',
  },
  {
    id: 8,
    name: 'Pepsi 1 L',
    price: 5.70,
    image: require('@/assets/images/pepsi.png'),
    description: 'Refresco clásico con un sabor único y refrescante para cualquier ocasión.',
  },
  {
    id: 9,
    name: 'Seven Up 3 L',
    price: 15.50,
    image: require('@/assets/images/7up.png'),
    description: 'Bebida gaseosa refrescante con el sabor único de Seven Up.',
  },
  {
    id: 10,
    name: 'Maltin 440 ml',
    price: 5.70,
    image: require('@/assets/images/maltin.png'),
    description: 'Maltin, una bebida refrescante para todos los gustos, ideal para acompañar comidas.',
  },
  {
    id: 11,
    name: 'Omo Limon 4.8 kg',
    price: 112.90,
    image: require('@/assets/images/omoVerde.png'),
    description: 'Detergente en polvo Omo Limón para una limpieza profunda y fragancia fresca.',
  },
  {
    id: 12,
    name: 'Papel Higienico 12 un',
    price: 28.50,
    image: require('@/assets/images/papel12.png'),
    description: 'Papel higiénico suave y resistente, ideal para el hogar con 12 unidades por paquete.',
  },
  {
    id: 13,
    name: 'Todo Brillo 1.8 kg',
    price: 37.90,
    image: require('@/assets/images/todoBrilloLimon.png'),
    description: 'Detergente en polvo Todo Brillo con fragancia a limón, ideal para toda la familia.',
  },
  {
    id: 14,
    name: 'Te Windsor Canela 130 Sobres',
    price: 31.50,
    image: require('@/assets/images/maltin.png'),
    description: 'Té Windsor con sabor a canela, perfecto para relajarse en cualquier momento del día.',
  },
  {
    id: 15,
    name: 'Lavavajilla Ola Limon 900 ml',
    price: 16.00,
    image: require('@/assets/images/olaLimon.png'),
    description: 'Lavavajillas con aroma a limón, elimina grasa y deja tus platos impecables.',
  },
  {
    id: 16,
    name: 'Doctor Babys Nina 100 un',
    price: 18.00,
    image: require('@/assets/images/DoctorBabys100.png'),
    description: 'Pañales Doctor Babys para bebés, suaves y absorbentes para máxima comodidad.',
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams(); // Obtenemos el ID de la URL
  const { addToCart } = useCart(); // Usamos el contexto de carrito
  const router = useRouter(); // Usamos el router para navegar

  // Aseguramos que el id sea un número
  const productId = Number(id);

  // Buscamos el producto que corresponde al ID
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  // Si no encontramos el producto, mostramos un mensaje de error
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  // Estado para manejar la cantidad
  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Icono de corazón favorito */}
      <TouchableOpacity style={styles.favoriteButton} onPress={() => alert('Producto agregado a favoritos!')}>
        <Text style={styles.favoriteIcon}>❤️</Text>
      </TouchableOpacity>

      {/* Imagen del producto */}
      <Image source={product.image} style={styles.image} />
      
      {/* Nombre del producto */}
      <Text style={styles.name}>{product.name}</Text>

      {/* Precio y descuento */}
      <View style={styles.priceContainer}>
        <Text style={styles.discount}>22% Off</Text>
        <Text style={styles.price}>Bs {product.price.toFixed(2)}</Text>
      </View>

      {/* Descripción del producto */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Contenedor de cantidad */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={String(quantity)}
          keyboardType="numeric"
          onChangeText={(text) => setQuantity(Number(text))}
        />
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botón agregar al carrito */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart({ ...product, quantity })} // Agregar al carrito con la cantidad
      >
        <Text style={styles.addToCartText}>Agregar al carrito</Text>
      </TouchableOpacity>

      {/* Botón Volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/')} // Navegar de regreso a la pantalla principal
      >
        <Text style={styles.backText}>Volver</Text>
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
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 25,
    padding: 8,
    zIndex: 1,
  },
  favoriteIcon: {
    fontSize: 30,
    color: '#ff6347',
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    borderRadius: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  priceContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  discount: {
    fontSize: 18,
    color: '#d9534f',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginVertical: 20,
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    fontSize: 28,
    color: '#16a34a',
    paddingHorizontal: 20,
  },
  quantityInput: {
    width: 50,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  addToCartButton: {
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  backText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
