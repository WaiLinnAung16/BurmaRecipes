import { LinearGradient } from 'tamagui/linear-gradient';
import React, { useMemo } from 'react';
import { Card, Image, Paragraph } from 'tamagui';
import { RecipeType } from '~/interfaces/data';
import { Images } from '~/data/Images';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';

type CradsProps = {
  item: RecipeType;
};

const Cards = ({ item }: CradsProps) => {
  const imageUri = Images.find((img) => img.name === item.Name);

  return (
    <Card
      backgroundColor={'transparent'}
      animation={'bouncy'}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      margin={'$2'}
      onPress={() => router.push(`/${item.Guid}`)}>
      <LinearGradient
        width={180}
        height={160}
        borderRadius={'$5'}
        colors={['$red9Light', '$yellow7Light']}
        start={[0, 3]}
        end={[0, 0]}>
        <BlurView
          intensity={60}
          tint="dark"
          style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 50 }}>
          <Card.Footer padding={0}>
            <Paragraph
              numberOfLines={2}
              fontWeight={'bold'}
              color={'$gray1Light'}
              padding={'$3'}
              userSelect="none">
              {item.Name}
            </Paragraph>
          </Card.Footer>
        </BlurView>
        <Card.Background>
          {imageUri ? (
            <Image
              source={{ uri: imageUri?.img }}
              width={'100%'}
              height={'100%'}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{ uri: require('../assets/img/default.png') }}
              width={'100%'}
              height={'100%'}
              resizeMode="cover"
            />
          )}
        </Card.Background>
      </LinearGradient>
    </Card>
  );
};

export default Cards;
