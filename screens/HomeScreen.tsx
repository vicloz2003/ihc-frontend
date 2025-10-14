import React, { useState } from 'react';
import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Product } from '../types/Product';

// Componentes
import CarouselBanner from '../components/CarouselBanner';
import { FloatingButton } from '../components/FloatingButton';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { SectionHeader } from '../components/SectionHeader';

export default function HomeScreen({ navigation }: any) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Planta de Serpiente (Sansevieria)', price: 25.0, image: require('../assets/images/pil.png') },
    { id: 2, name: 'Monstera Deliciosa', price: 45.5, image: require('../assets/images/harina.png') },
    { id: 3, name: 'Ficus Lyrata', price: 50.0, image: require('../assets/images/pollo.png') },
    { id: 4, name: 'Pothos Dorado (Epipremnum aureum)', price: 18.75, image: require('../assets/images/papel.png') },
  ];

  const handleAddToCart = (product: Product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(prev => prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item));
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
    }
    Alert.alert('¡Éxito!', `${product.name} ha sido añadido al carrito.`);
  };

  const handleViewAll = (sectionTitle: string) => {
    Alert.alert('Navegación', `Navegando a la sección "${sectionTitle}"...`);
  };

  const handleFloatingButtonPress = () => {
    navigation.navigate('CartScreen', { cartItems });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar />
          <CarouselBanner />

          <SectionHeader title="Productos Populares" onPress={() => handleViewAll('Productos Populares')} />
          <FlatList
            horizontal
            data={MOCK_PRODUCTS}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productListContent}
            renderItem={({ item }) => (
              <View style={styles.productCardWrapper}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  onAddToCart={() => handleAddToCart(item)}
                />
              </View>
            )}
          />

          <SectionHeader title="Novedades" onPress={() => handleViewAll('Novedades')} />
          <FlatList
            horizontal
            data={[...MOCK_PRODUCTS].reverse()}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productListContent}
            renderItem={({ item }) => (
              <View style={styles.productCardWrapper}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  onAddToCart={() => handleAddToCart(item)}
                />
              </View>
            )}
          />
        </ScrollView>

        <FloatingButton onPress={handleFloatingButtonPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1 },
  productListContent: { paddingHorizontal: 16, paddingVertical: 8 },
  productCardWrapper: { marginRight: 16 },
});
