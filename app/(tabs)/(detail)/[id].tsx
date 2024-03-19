import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import data from '../../../data/Recipes.json';
import { Image, ScrollView, Separator, Text, View, XStack, YStack } from 'tamagui';
import { Images } from '~/data/Images';
import { Subtitle, Title } from '~/tamagui.config';
import { Ionicons } from '@expo/vector-icons';
import { color } from '@tamagui/themes';
import { RecipeType } from '~/interfaces/data';
import useAsyncStorage from '~/hooks/useAsyncStorage';

// Functional component for recipe detail screen
const index = () => {
  const { id }: { id: string } = useLocalSearchParams(); // Retrieving recipe ID from local search parameters
  const { data: favRecipes, getData, setData } = useAsyncStorage('favRecipes'); // call custom hook asyncStoarge

  const detail: RecipeType | undefined = data.find((el) => el.Guid === id); // Finding the recipe detail based on ID
  const imageSrc = Images?.find((el) => el.name === detail?.Name); // Retrieving image source for the recipe

  const [fav, setFav] = useState<Boolean>(false); // State for checking if the current recipe is favorited

  // Function to add/remove favorite recipe
  const addFav = () => {
    setData(detail);
    setFav((prev) => !prev);
  };

  // Using useFocusEffect hook to call getFav function when screen gains focus or favorite status changes
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [fav])
  );

  // useEffect hook to update favorite status when ID changes
  useEffect(() => {
    if (favRecipes.some((recipe) => recipe?.Guid === detail?.Guid)) {
      setFav(true); // Setting favorite state to true if recipe is in favorites
    } else {
      setFav(false); // Setting favorite state to false if recipe is not in favorites
    }
  }, [id]);

  // Rendering recipe detail screen
  return (
    <ScrollView padding={'$3'}>
      <YStack gap={'$3'} marginBottom={'$10'}>
        <XStack jc={'space-between'}>
          <View width={200} height={200} borderRadius={10} overflow="hidden">
            {imageSrc ? (
              <Image source={{ uri: imageSrc?.img }} width={'100%'} height={'100%'} />
            ) : (
              <Image
                source={{ uri: require('../../../assets/img/default.png') }} // Default image source if image not found
                width={'100%'}
                height={'100%'}
              />
            )}
          </View>
          <Ionicons
            name={`${fav ? 'heart-sharp' : 'heart-outline'}`} // Conditional rendering of heart icon based on favorite status
            size={30}
            color={`${color.yellow8Light}`}
            onPress={() => addFav()} // Adding/removing recipe from favorites on icon press
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

export default index; // Exporting the component
