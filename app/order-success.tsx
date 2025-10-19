import { useLocalSearchParams, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { total, paymentMethod, address } = useLocalSearchParams<{
    total: string;
    paymentMethod: string;
    address: string;
  }>();

  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleTrackOrder = () => {
    router.replace({
      pathname: '/order-tracking',
      params: { total, paymentMethod, address },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* ✅ Animación Lottie */}
        <LottieView
          ref={animation}
          source={require('../assets/animations/success.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />

        <Text style={styles.title}>¡Pedido realizado exitosamente!</Text>
        <Text style={styles.subtitle}>
          Gracias por tu compra. Estamos preparando tu pedido.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleTrackOrder}>
          <Text style={styles.buttonText}>Ver estado de mi pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f8fafc' 
  },
  content: { 
    alignItems: 'center', 
    paddingHorizontal: 24 
  },
  animation: { 
    width: 360, 
    height: 360 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    marginTop: 8, 
    marginBottom: 8, 
    textAlign: 'center', 
    color: '#16a34a', 
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: { 
    fontSize: 16, 
    color: '#475569', 
    textAlign: 'center', 
    marginBottom: 28 
  },
  button: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#16a34a',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});
