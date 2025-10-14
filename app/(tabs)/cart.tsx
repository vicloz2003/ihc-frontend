import React from 'react';
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  const handlePay = () => {
    Alert.alert('Pago realizado', `Pagaste $${total.toFixed(2)}. ¡Gracias!`);
    clearCart();
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
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
              <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                <Text style={styles.payText}>Pagar</Text>
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
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 1,
  },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  price: { color: '#16a34a', fontWeight: 'bold', marginBottom: 8 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: { backgroundColor: '#16a34a', padding: 6, borderRadius: 8 },
  qtyText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  qtyValue: { marginHorizontal: 12, fontSize: 16 },
  footer: { marginTop: 24, alignItems: 'center' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  payButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  payText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
