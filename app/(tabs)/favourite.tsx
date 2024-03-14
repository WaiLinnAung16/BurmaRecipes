import { YStack, H2, Separator, Text, View } from 'tamagui';
import data from '../../data/Recipes.json';
import EditScreenInfo from '../../components/edit-screen-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Title } from '~/tamagui.config';
import { RecipeType } from '~/interfaces/data';
import { useFocusEffect } from 'expo-router';
import FavCard from '~/components/FavCard';

export default function FavouriteScreen() {
  const [favRecipes, setFavRecipes] = useState<RecipeType[]>([]);

  const remove = async () => {
    try {
      await AsyncStorage.removeItem('favRecipes');
    } catch (err) {
      alert(err);
    } finally {
      setFavRecipes([]);
    }
  };

  const getFav = async () => {
    try {
      const items = await AsyncStorage.getItem('favRecipes');
      console.log(items);
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

  return (
    <YStack flex={1} space jc={'space-between'} padding={'$3'}>
      <YStack space={'$3'}>
        {favRecipes.map((el) => (
          <FavCard key={el.Guid} item={el} favRecipes={favRecipes} setFavRecipes={setFavRecipes}/>
        ))}
      </YStack>
    </YStack>
  );
}
