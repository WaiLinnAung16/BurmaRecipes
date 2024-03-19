import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React from 'react';
import { Avatar, Button, H5, Image, View, XStack, YStack } from 'tamagui';
import { Images } from '~/data/Images';
import { RecipeType } from '~/interfaces/data';
import { Subtitle } from '~/tamagui.config';

const FavCard = ({ item }: { item: RecipeType }) => {
  const imageUri = Images.find((img) => img.name === item.Name);

  return (
    <View bc={'$gray5Light'} padding={'$3'} borderRadius={'$3'}>
      <XStack space ai={'center'}>
        <View borderRadius={'$4'} overflow="hidden">
          {imageUri ? (
            <Image source={{ uri: imageUri?.img, width: 84, height: 84 }} />
          ) : (
            <Image source={{ uri: require('../assets/img/default.png'), width: 84, height: 84 }} />
          )}
        </View>
        <YStack space={'$2'} flex={1}>
          <Subtitle size={'$4'} fontWeight={'bold'}>
            {item.Name.slice(0, 100)}
          </Subtitle>
          <XStack space={'$2'}>
            <Link href={`/(tabs)/(detail)/${item.Guid}`} asChild>
              <Button width={'50%'} size={'$3'}>
                Cook Now
              </Button>
            </Link>
          </XStack>
        </YStack>
      </XStack>
    </View>
  );
};

export default FavCard;
