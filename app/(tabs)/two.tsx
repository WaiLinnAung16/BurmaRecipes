import { YStack, H2, Separator, Theme } from 'tamagui';

import EditScreenInfo from '../../components/edit-screen-info';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function TabTwoScreen() {
  useFocusEffect(useCallback(() => console.log('hello'), []));
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Tab Two</H2>
        <Separator />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </YStack>
    </Theme>
  );
}
