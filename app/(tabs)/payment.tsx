import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentScreen() {
  const router = useRouter();
  const { total } = useLocalSearchParams<{ total: string }>();

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedAddress, setSelectedAddress] = useState('home');

  const handleConfirmPayment = () => {
    Alert.alert('✅ Pago Exitoso', 'Tu pedido ha sido procesado correctamente.');
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Resumen de Pago</Text>

        {/* TOTAL */}
        <View style={styles.section}>
          <Text style={styles.label}>Total a pagar</Text>
          <Text style={styles.total}>${Number(total || 0).toFixed(2)}</Text>
        </View>

        {/* MÉTODO DE PAGO */}
        <Text style={styles.subtitle}>Método de pago</Text>
        <View style={styles.section}>
          {[
            { id: 'card', name: 'Tarjeta de Crédito o Débito', image: require('../../assets/images/visa.png') },
            { id: 'paypal', name: 'PayPal', image: require('../../assets/images/paypal.png') },
            { id: 'cash', name: 'Efectivo al entregar', image: require('../../assets/images/pollo.png') },
          ].map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.option,
                selectedPayment === method.id && styles.optionSelected,
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <Image source={method.image} style={styles.icon} />
              <Text style={styles.optionText}>{method.name}</Text>
              {selectedPayment === method.id && (
                <Ionicons name="checkmark-circle" size={22} color="#16a34a" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* DIRECCIÓN DE ENTREGA */}
        <Text style={styles.subtitle}>Dirección de entrega</Text>
        <View style={styles.section}>
          {[
            {
              id: 'home',
              name: 'Casa Principal – Av. Libertador #1234',
              image: require('../../assets/images/location.png'),
            },
            {
              id: 'office',
              name: 'Oficina – Calle Sucre #456',
              image: require('../../assets/images/location.png'),
            },
          ].map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[
                styles.option,
                selectedAddress === address.id && styles.optionSelected,
              ]}
              onPress={() => setSelectedAddress(address.id)}
            >
              <Image source={address.image} style={styles.icon} />
              <Text style={styles.optionText}>{address.name}</Text>
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
          <Text style={styles.payButtonText}>Confirmar y Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', marginVertical: 12 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  label: { fontSize: 16, color: '#475569' },
  total: { fontSize: 20, fontWeight: 'bold', color: '#16a34a', marginTop: 4 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  optionText: { flex: 1, marginLeft: 12, fontSize: 16 },
  optionSelected: { backgroundColor: '#ecfdf5', borderRadius: 8 },
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
  icon: { width: 32, height: 32, resizeMode: 'contain', marginRight: 8 },
});
