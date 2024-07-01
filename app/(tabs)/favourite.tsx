import { Image, ScrollView, YStack } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import { Title } from '~/tamagui.config';
import { useFocusEffect } from 'expo-router';
import FavCard from '~/components/FavCard';
import { RecipeType } from '~/interfaces/data';

export default function FavouriteScreen() {
  const [favRecipes, setFavRecipes] = useState<RecipeType[]>([]);

  const getFav = async () => {
    try {
      const items = await AsyncStorage.getItem('favRecipes');
      if (items !== null) {
        setFavRecipes(JSON.parse(items));
      }
    } catch (error) {
      alert(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFav();
    }, [])
  );

  if (favRecipes.length === 0) {
    return (
      <YStack flex={1} jc="center" ai="center">
        <Image
          source={{ uri: require('../../assets/emptyCart.png'), width: 300, height: 100 }}
          resizeMode="contain"
        />
        <Title>Your Favourite list is Empty.</Title>
      </YStack>
    );
  }

  return (
    <YStack flex={1} space jc={'space-between'} padding={'$3'}>
      <ScrollView horizontal={false} contentContainerStyle={{ gap: 14 }}>
        {favRecipes.map((el) => (
          <FavCard key={el.Guid} item={el} />
        ))}
      </ScrollView>
    </YStack>
  );
}
