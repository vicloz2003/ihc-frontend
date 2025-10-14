import CarouselBanner from '@/components/CarouselBanner';
import { FloatingButton } from '@/components/FloatingButton';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
];

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    Alert.alert('Agregado', `${product.name} añadido al carrito`);
  };

  const handleViewAll = (section: string) => {
    Alert.alert('Navegación', `Ir a sección: ${section}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <SearchBar />
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
          <Ionicons name="cart" size={28} color="#16a34a" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CarouselBanner />

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
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </ScrollView>

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
});
