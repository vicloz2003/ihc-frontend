import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { total, paymentMethod,address } = useLocalSearchParams<{ total: string; paymentMethod: string ;address: string;}>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/check.png')} // ✅ agrega una imagen tipo check grande
          style={styles.image}
        />
        <Text style={styles.title}>¡Pedido realizado exitosamente!</Text>
        <Text style={styles.subtitle}>
          Gracias por tu compra. Estamos preparando tu pedido.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({
            pathname: '/order-tracking',
            params: { total, paymentMethod,address },
          })}
        >
          <Text style={styles.buttonText}>Seguir mi pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  content: { alignItems: 'center', paddingHorizontal: 24 },
  image: { width: 150, height: 150, marginBottom: 24, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 ,textAlign: 'center',},
  subtitle: { fontSize: 16, color: '#475569', textAlign: 'center', marginBottom: 24 },
  button: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
