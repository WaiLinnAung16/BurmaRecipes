import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import data from '../../../data/Recipes.json';
import { H1, H3, H4, Image, ScrollView, Separator, Text, View, XStack, YStack } from 'tamagui';
import { Images } from '~/data/Images';
import { Subtitle, Title } from '~/tamagui.config';
import { Ionicons } from '@expo/vector-icons';
import { color } from '@tamagui/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecipeType } from '~/interfaces/data';

const index = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const detail: RecipeType | undefined = data.find((el) => el.Guid === id);
  const imageSrc = Images.find((el) => el.name === detail?.Name);
  const [favRecipes, setFavRecipes] = useState<RecipeType[]>([]);
  const [fav, setFav] = useState<Boolean>(false);

  const addFav = async () => {
    try {
      if (favRecipes.some((recipe) => recipe?.Guid === detail?.Guid)) {
        const updatedRecipes = favRecipes.filter((recipe) => recipe?.Guid !== detail?.Guid);
        await AsyncStorage.setItem('favRecipes', JSON.stringify(updatedRecipes));
        setFav(false);
      } else {
        const items = [...favRecipes, detail];
        console.log(items);
        await AsyncStorage.setItem('favRecipes', JSON.stringify(items));
        setFav(true);
      }
    } catch (error) {
      alert(error);
    }
  };

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

  useEffect(() => {
    if (favRecipes.some((recipe) => recipe?.Guid === detail?.Guid)) {
      setFav(true);
    } else {
      setFav(false);
    }
  }, [detail, favRecipes]);

  return (
    <ScrollView padding={'$3'}>
      <YStack gap={'$3'} marginBottom={'$10'}>
        <XStack jc={'space-between'}>
          <View width={200} height={200} borderRadius={10} overflow="hidden">
            {imageSrc ? (
              <Image source={{ uri: imageSrc?.img }} width={'100%'} height={'100%'} />
            ) : (
              <Image
                source={{ uri: require('../../../assets/img/default.png') }}
                width={'100%'}
                height={'100%'}
              />
            )}
          </View>
          <Ionicons
            name={`${fav ? 'heart-sharp' : 'heart-outline'}`}
            size={26}
            color={`${color.yellow8Light}`}
            onPress={() => addFav()}
          />
        </XStack>
        <Separator borderStyle="dashed" />
        <Title>{detail?.Name}</Title>
        <Separator borderStyle="dashed" />
        <Subtitle>📃 ပါဝင်ပစ္စည်းများ</Subtitle>
        <View backgroundColor={'$gray5Light'} padding={'$3'} borderRadius={'$3'}>
          <Text lineHeight={'$1'}>{detail?.Ingredients}</Text>
        </View>

        <Subtitle>🍳 ချက်ပြုတ်နည်း</Subtitle>
        <View backgroundColor={'$gray5Light'} padding={'$3'} borderRadius={'$3'}>
          <Text lineHeight={'$1'}> {detail?.CookingInstructions}</Text>
        </View>
      </YStack>
    </ScrollView>
  );
};

export default index;
