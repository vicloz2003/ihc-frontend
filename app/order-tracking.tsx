import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { total, paymentMethod, address } = useLocalSearchParams<{
    total: string;
    paymentMethod: string;
    address: string;
  }>();

  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = ['Preparando pedido', 'En camino', 'Entregado'];
  const estimatedRange = '15:40 - 15:50 PM';

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -17.7833,
          longitude: -63.1821,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: -17.7833, longitude: -63.1821 }}
          title="Tu pedido"
          description="Santa Cruz de la Sierra"
        />
      </MapView>

      {/* Panel inferior con detalles */}
      <View style={styles.infoContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Entrega estimada principal */}
          <View style={styles.etaContainer}>
            <Ionicons name="time-outline" size={24} color="#16a34a" style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.etaLabel}>Entrega estimada</Text>
              <Text style={styles.etaValue}>{estimatedRange}</Text>
            </View>
          </View>

          {/* Timeline visual */}
          <View style={styles.timeline}>
            {statuses.map((status, index) => (
              <View key={index} style={styles.timelineStep}>
                <View
                  style={[
                    styles.circle,
                    index <= statusIndex ? styles.circleActive : styles.circleInactive,
                  ]}
                />
                <Text
                  style={[
                    styles.timelineText,
                    index <= statusIndex ? styles.activeText : styles.inactiveText,
                  ]}
                >
                  {status}
                </Text>
                {index < statuses.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      index < statusIndex ? styles.lineActive : styles.lineInactive,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Información complementaria */}
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color="#16a34a" />
              <Text style={styles.detailValue}>{address}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="card-outline" size={20} color="#16a34a" />
              <Text style={styles.detailValue}>{paymentMethod}</Text>
            </View>

            <View style={[styles.detailRow, { marginTop: 10 }]}>
              <Ionicons name="cash-outline" size={22} color="#16a34a" />
              <Text style={styles.totalValue}>${total}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Botón fijo siempre visible */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 18,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '65%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    elevation: 5,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  etaLabel: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  etaValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16a34a',
    textAlign: 'center',
  },

  /* Timeline */
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  circleActive: { backgroundColor: '#16a34a' },
  circleInactive: { backgroundColor: '#d1d5db' },
  line: {
    position: 'absolute',
    top: 7,
    right: -20,
    width: 40,
    height: 2,
  },
  lineActive: { backgroundColor: '#16a34a' },
  lineInactive: { backgroundColor: '#e5e7eb' },
  timelineText: { fontSize: 13, textAlign: 'center', width: 90 },
  activeText: { color: '#16a34a', fontWeight: '600' },
  inactiveText: { color: '#9ca3af' },

  details: { marginTop: 10 },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 8,
    flexShrink: 1,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#16a34a',
    marginLeft: 8,
  },

  button: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
