import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const handleOptionPress = (option: string) => {
    if (option === 'Historial de pedidos') {
      router.push('/order-history');
    } else {
      console.log(`Opción seleccionada: ${option}`);
      // Aquí puedes agregar la navegación o funcionalidad específica
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header del perfil */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="#16a34a" />
          </View>
          <Text style={styles.userName}>Usuario</Text>
          <Text style={styles.userEmail}>usuario@email.com</Text>
        </View>

        {/* Sección: Mi cuenta */}
        <Text style={styles.sectionTitle}>Mi cuenta</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Información personal')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="person-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Información personal</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Mis direcciones')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="location-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Mis direcciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Métodos de pago')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="card-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Métodos de pago</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Sección: Mis pedidos */}
        <Text style={styles.sectionTitle}>Mis pedidos</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Historial de pedidos')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="time-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Historial de pedidos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Favoritos')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="heart-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Favoritos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Sección: Configuración */}
        <Text style={styles.sectionTitle}>Configuración</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Notificaciones')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="notifications-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Notificaciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Idioma')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="language-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Idioma</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Ayuda y soporte')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="help-circle-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Ayuda y soporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleOptionPress('Acerca de')}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="information-circle-outline" size={22} color="#1e293b" />
              <Text style={styles.optionText}>Acerca de</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleOptionPress('Cerrar sesión')}
        >
          <Ionicons name="log-out-outline" size={22} color="#dc2626" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1, padding: 16 },

  // Header
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
  },

  // Secciones
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 12,
  },

  // Opciones
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#1e293b',
  },

  // Botón de cerrar sesión
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
});
