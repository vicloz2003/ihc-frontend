import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { total, paymentMethod, address } = useLocalSearchParams<{
    total: string;
    paymentMethod: string;
    address: string;
  }>();

  const deliveryPerson = {
    name: 'Carlos Gómez',
    photo: require('../assets/images/pollo.png'),
    eta: '25 minutos',
  };

  const estimatedDelivery = '15:45 PM';

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -16.5,
          longitude: -68.15,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: -16.5, longitude: -68.15 }}
          title="Tu pedido"
          description="En camino"
        />
      </MapView>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Seguimiento de tu pedido</Text>

        <View style={styles.row}>
          <Image source={deliveryPerson.photo} style={styles.avatar} />
          <View>
            <Text style={styles.name}>Entrega a cargo de:</Text>
            <Text style={styles.deliveryName}>{deliveryPerson.name}</Text>
            <Text style={styles.eta}>Llega en {deliveryPerson.eta}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailText}> Lo recibirás en:</Text>
          <Text style={styles.detailValue}>{address}</Text>

          <Text style={[styles.detailText, { marginTop: 10 }]}> Entrega estimada:</Text>
          <Text style={styles.detailValue}>{estimatedDelivery}</Text>

          <Text style={[styles.detailText, { marginTop: 10 }]}> Total:</Text>
          <Text style={styles.detailValue}>${total}</Text>

          <Text style={[styles.detailText, { marginTop: 10 }]}> Método:</Text>
          <Text style={styles.detailValue}>{paymentMethod}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: './OrderStatus',
              params: { total, paymentMethod, address },
            })
          }
        >
          <Text style={styles.buttonText}>Ver estado del pedido</Text>
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
    padding: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
    textAlign: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 12 },
  name: { fontSize: 14, color: '#6b7280' },
  deliveryName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  eta: { fontSize: 14, color: '#16a34a' },
  details: { marginTop: 8 },
  detailText: { fontSize: 14, color: '#6b7280' },
  detailValue: { fontSize: 15, fontWeight: '500', color: '#111827' },
  button: {
    marginTop: 18,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
