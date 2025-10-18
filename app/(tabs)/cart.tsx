import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const router = useRouter();

  const totalProductos = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );
  const costoEnvio = 10.0;
  const subtotal = totalProductos + costoEnvio;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tu carrito está vacío 🛒</Text>
          </View>
        ) : (
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
              <>
                <View style={styles.separator} />

                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryTitle}>Resumen del pedido</Text>

                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Productos</Text>
                    <Text style={styles.summaryValue}>${totalProductos.toFixed(2)}</Text>
                  </View>

                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Envío</Text>
                    <Text style={styles.summaryValue}>${costoEnvio.toFixed(2)}</Text>
                  </View>

                  <View style={styles.summaryRowTotal}>
                    <Text style={styles.summaryTotalLabel}>Subtotal</Text>
                    <Text style={styles.summaryTotalValue}>${subtotal.toFixed(2)}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() =>
                      router.push({ pathname: '/(tabs)/payment', params: { total: subtotal } })
                    }
                  >
                    <Text style={styles.payText}>Proceder al pago</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={clearCart}
                    style={styles.clearButton}
                  >
                    <Text style={styles.clearText}>Vaciar carrito</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          />
        )}
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
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  price: { color: '#16a34a', fontWeight: 'bold', marginBottom: 8 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: { backgroundColor: '#16a34a', padding: 6, borderRadius: 8 },
  qtyText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  qtyValue: { marginHorizontal: 12, fontSize: 16 },
  separator: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 16 },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  summaryTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#1e293b' },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  summaryLabel: { color: '#475569', fontSize: 16 },
  summaryValue: { color: '#475569', fontSize: 16 },
  summaryTotalLabel: { fontSize: 17, fontWeight: '700', color: '#1e293b' },
  summaryTotalValue: { fontSize: 17, fontWeight: '700', color: '#16a34a' },
  payButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  payText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  clearButton: { marginTop: 10, alignItems: 'center' },
  clearText: { color: '#64748b', fontWeight: '600' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#64748b', fontSize: 16 },
});
