import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from './context/CartContext';

export default function OrderHistoryScreen() {
  const router = useRouter();
  const { orders, addToCart } = useCart();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      card: 'Tarjeta',
      qr: 'QR',
      paypal: 'PayPal',
      cash: 'Efectivo',
    };
    return methods[method] || method;
  };

  const handleRepeatOrder = (order: any) => {
    // Agregar todos los productos del pedido al carrito
    order.items.forEach((item: any) => {
      // Agregar cada producto la cantidad de veces que se compró
      for (let i = 0; i < (item.quantity || 1); i++) {
        addToCart(item);
      }
    });
    
    // Navegar al carrito
    router.push('/(tabs)/cart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de Pedidos</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#94a3b8" />
          <Text style={styles.emptyText}>No tienes pedidos aún</Text>
          <Text style={styles.emptySubtext}>
            Tus pedidos confirmados aparecerán aquí
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              {/* Header del pedido */}
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Pedido #{item.id.slice(-6)}</Text>
                  <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              {/* Productos */}
              <View style={styles.productsSection}>
                {item.items.map((product) => (
                  <View key={product.id} style={styles.productRow}>
                    <Image source={product.image} style={styles.productImage} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={1}>
                        {product.name}
                      </Text>
                      <Text style={styles.productQuantity}>
                        Cantidad: {product.quantity}
                      </Text>
                    </View>
                    <Text style={styles.productPrice}>
                      Bs. {(product.price * (product.quantity || 1)).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Footer del pedido */}
              <View style={styles.orderFooter}>
                <View style={styles.orderInfo}>
                  <Ionicons name="card-outline" size={16} color="#64748b" />
                  <Text style={styles.orderInfoText}>
                    {getPaymentMethodName(item.paymentMethod)}
                  </Text>
                </View>
                <Text style={styles.orderTotal}>Total: Bs. {item.total.toFixed(2)}</Text>
              </View>

              {/* Botón Repetir Pedido */}
              <TouchableOpacity
                style={styles.repeatButton}
                onPress={() => handleRepeatOrder(item)}
              >
                <Ionicons name="refresh-outline" size={20} color="#fff" />
                <Text style={styles.repeatButtonText}>Repetir pedido</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    padding: 4,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    paddingTop: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },

  listContainer: {
    padding: 16,
  },

  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#64748b',
  },
  statusBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
  },

  productsSection: {
    marginBottom: 12,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  productQuantity: {
    fontSize: 12,
    color: '#64748b',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16a34a',
  },

  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderInfoText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 6,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },

  repeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  repeatButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});
