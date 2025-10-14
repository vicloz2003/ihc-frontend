import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const banners = [
  { id: 1, image: require('../assets/images/banner.png') },
  { id: 2, image: require('../assets/images/banner.png') },
  { id: 3, image: require('../assets/images/banner.png') },
];

export default function CarouselBanner() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width * 0.9}
        height={180}
        autoPlay
        autoPlayInterval={3000}
        data={banners}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
  },
});


