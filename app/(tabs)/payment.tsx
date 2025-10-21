import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';

export default function PaymentScreen() {
  const router = useRouter();
  const { total } = useLocalSearchParams<{ total: string }>();
  const { cartItems, addOrder, clearCart } = useCart();

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedAddress, setSelectedAddress] = useState('home');

  const handleConfirmPayment = () => {
    const totalAmount = Number(total || 0).toFixed(2);
    
    Alert.alert(
      '¿Confirmar pedido?',
      `Total a pagar: Bs. ${totalAmount}\n\nIncluye costo de envío.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Guardar el pedido en el historial
            addOrder({
              items: [...cartItems],
              total: Number(total),
              paymentMethod: selectedPayment,
              address: selectedAddress,
            });
            
            // Limpiar el carrito
            clearCart();
            
            router.push({
              pathname: '/order-success',
              params: { total, paymentMethod: selectedPayment, address: selectedAddress },
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Resumen de Pago</Text>

        {/* LISTA DE PRODUCTOS */}
        <Text style={styles.subtitle}>Productos seleccionados</Text>
        <View style={styles.listContainer}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.productRow}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
              </View>
              <Text style={styles.productPrice}>
                Bs. {(item.price * (item.quantity || 1)).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* TOTAL */}
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Total a pagar</Text>
          <Text style={styles.total}>Bs. {Number(total || 0).toFixed(2)}</Text>
        </View>

        {/* MÉTODO DE PAGO */}
        <Text style={styles.subtitle}>Método de pago</Text>
        <View style={styles.listContainer}>
          {[
            { id: 'card', name: 'Tarjeta de crédito o débito', icon: 'card-outline' },
            { id: 'qr', name: 'Pago por QR', icon: 'qr-code-outline' },
            { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
            { id: 'cash', name: 'Efectivo al entregar', icon: 'cash-outline' },
          ].map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.row, selectedPayment === method.id && styles.rowSelected]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.rowLeft}>
                <Ionicons name={method.icon as any} size={22} color="#1e293b" />
                <Text style={styles.rowText}>{method.name}</Text>
              </View>
              {selectedPayment === method.id && (
                <Ionicons name="checkmark-circle" size={22} color="#16a34a" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* DIRECCIÓN DE ENTREGA */}
        <Text style={styles.subtitle}>Dirección de entrega</Text>
        <View style={styles.listContainer}>
          {[
            {
              id: 'home',
              name: 'Casa Principal – Av. Libertador #1234',
              icon: 'location-outline',
            },
          ].map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[styles.row, selectedAddress === address.id && styles.rowSelected]}
              onPress={() => setSelectedAddress(address.id)}
            >
              <View style={styles.rowLeft}>
                <Ionicons name={address.icon as any} size={22} color="#1e293b" />
                <Text style={styles.rowText}>{address.name}</Text>
              </View>
              {selectedAddress === address.id && (
                <Ionicons name="checkmark-circle" size={22} color="#16a34a" />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={20} color="#16a34a" />
            <Text style={styles.addButtonText}>Agregar nueva dirección</Text>
          </TouchableOpacity>
        </View>

        {/* BOTÓN PAGAR */}
        <TouchableOpacity style={styles.payButton} onPress={handleConfirmPayment}>
          <Text style={styles.payButtonText}>Confirmar pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1, padding: 16 },
  contentContainer: { paddingTop: 0 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', marginVertical: 12, color: '#1e293b' },

  totalContainer: {
    marginBottom: 16,
  },
  label: { fontSize: 16, color: '#475569', paddingTop: 10, textAlign: 'right' },
  total: { fontSize: 22, fontWeight: 'bold', color: '#16a34a', marginTop: 6, textAlign: 'right' },

  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  
  // Estilos para productos
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 12,
    color: '#64748b',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#16a34a',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { marginLeft: 10, fontSize: 16, color: '#1e293b', flexShrink: 1 },
  rowSelected: { backgroundColor: '#f0fdf4' },

  addButton: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  addButtonText: { color: '#16a34a', fontSize: 15, marginLeft: 4 },

  payButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  payButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
