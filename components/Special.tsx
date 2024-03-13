import { View, Text } from 'react-native';
import React from 'react';
import { H1, ScrollView, YStack } from 'tamagui';
import data from '../data/Recipes.json';
import Cards from '~/components/Cards';
import { Data } from '~/interfaces/data';
import { Title } from '~/tamagui.config';

const Special = () => {
  const special = data.slice(0, 3);

  return (
    <YStack>
      <ScrollView horizontal contentContainerStyle={{ gap: 14, paddingHorizontal: 14 }} marginVertical={'$2'}>
        {special.map((item: Data, index: number) => (
          <Cards key={index} item={item} />
        ))}
      </ScrollView>
    </YStack>
  );
};

export default Special;
