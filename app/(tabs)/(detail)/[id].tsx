import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import data from '../../../data/Recipes.json';
import { H1, H3, H4, Image, ScrollView, Separator, Text, View, XStack, YStack } from 'tamagui';
import { Images } from '~/data/Images';
import { Subtitle, Title } from '~/tamagui.config';

const index = () => {
  const { id } = useLocalSearchParams();
  const detail = data.find((el) => el.Guid === id);
  const imageSrc = Images.find((el) => el.name === detail?.Name);

  return (
    <ScrollView padding={'$3'}>
      <YStack gap={'$3'} marginBottom={'$10'}>
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
