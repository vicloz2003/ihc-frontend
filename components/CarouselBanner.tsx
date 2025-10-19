import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const banners = [
  { id: 1, image: require('../assets/images/BannerGolden.png') },
  { id: 2, image: require('../assets/images/BannerPaceña.png') },
  { id: 3, image: require('../assets/images/banner.png') },
];

export default function CarouselBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width * 0.9}
        height={160} // ligeramente más pequeño
        autoPlay
        autoPlayInterval={3000}
        data={banners}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.bannerImage}
              resizeMode="contain" // prioriza mostrar toda la imagen
            />
          </View>
        )}
      />

      {/* Indicadores */}
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <Dot key={index} active={index === activeIndex} />
        ))}
      </View>
    </View>
  );
}

const Dot = ({ active }: { active: boolean }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(active ? 16 : 8),
    backgroundColor: withTiming(active ? '#16a34a' : '#cbd5e1'),
  }));
  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    backgroundColor: '#fff', // elimina el gris de fondo
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
