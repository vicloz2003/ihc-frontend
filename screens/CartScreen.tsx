import React, { useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../types/Product';

export default function CartScreen({ route, navigation }: any) {
  const [cartItems, setCartItems] = useState<Product[]>(route.params.cartItems || []);

  const increaseQuantity = (id: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item));
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handlePay = () => {
    Alert.alert('Pago', `Pagaste $${total.toFixed(2)}. ¡Gracias por tu compra!`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.qtyButton}>
                    <Text style={styles.qtyButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.qtyButton}>
                    <Text style={styles.qtyButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
              <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                <Text style={styles.payButtonText}>Pagar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#fff', borderRadius: 12, padding: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 1 },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: 'bold', color: '#16a34a', marginBottom: 8 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: { backgroundColor: '#16a34a', padding: 6, borderRadius: 8 },
  qtyButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  qtyText: { marginHorizontal: 12, fontSize: 16 },
  footer: { marginTop: 24, alignItems: 'center' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  payButton: { backgroundColor: '#16a34a', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  payButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
