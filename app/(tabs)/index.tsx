import CarouselBanner from '@/components/CarouselBanner';
import { FloatingButton } from '@/components/FloatingButton';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CategoryCarousel from '@/components/CategoryCarousel';

import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    // Eliminamos la alerta para una UX más fluida
  };

  const handleViewAll = (section: string) => {
    console.log(`Ir a sección: ${section}`);
  };

return (
  <SafeAreaView style={styles.safeArea}>
    {/* Header con buscador y carrito */}
    <View style={styles.header}>
      <SearchBar />
      <View style={styles.cartContainer}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
          <Ionicons name="cart" size={28} color="#16a34a" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>

    {/* Contenido principal scrolleable */}
    <ScrollView showsVerticalScrollIndicator={false}>
      <CarouselBanner />

      <CategoryCarousel />

      <SectionHeader
        title="Productos Populares"
        onPress={() => handleViewAll('Populares')}
      />
      <FlatList
        horizontal
        data={MOCK_PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={() => handleAddToCart(item)}
            onPress={() => router.push(`/product/${item.id}`)} // ← aquí navega al detalle

          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      <SectionHeader
        title="Novedades"
        onPress={() => handleViewAll('Novedades')}
      />
      <FlatList
        horizontal
        data={[...MOCK_PRODUCTS].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={() => handleAddToCart(item)}
            onPress={() => router.push(`/product/${item.id}`)} // ← aquí navega al detalle

          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </ScrollView>

    {/* Botón flotante */}
    <FloatingButton onPress={() => router.push('/(tabs)/cart')} />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  list: { paddingHorizontal: 16, paddingBottom: 16 },

  // 🔹 Estilos del badge del carrito
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#16a34a',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
