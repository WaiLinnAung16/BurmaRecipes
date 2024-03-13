import React from 'react';
import { YStack } from 'tamagui';
import Content from '~/components/Content';

export default function TabOneScreen() {
  return (
    <YStack backgroundColor={'$yellow1Light'} flex={1}>
      <Content />
    </YStack>
  );
}
