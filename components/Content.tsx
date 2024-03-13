import React, { useEffect, useState } from 'react';
import { H1, View, XStack, YStack } from 'tamagui';
import data from '../data/Recipes.json';
import userType from '../data/UsersTypes.json';
import Cards from './Cards';
import { FlatList } from 'react-native';
import { Subtitle, Title } from '~/tamagui.config';
import { RecipeType } from '~/interfaces/data';

const Content = () => {
  const [selectUserType, setSelectUserType] = useState('');
  const [active, setActive] = useState('');
  const [filteredData, setfilteredData] = useState<RecipeType[]>([]);

  const selectUser = (userType: string) => {
    setSelectUserType(userType);
    setActive(userType);
    console.log(userType);
  };

  const filterData = () => {
    const recipe = data.filter((el) => el.UserType === selectUserType);
    setfilteredData(recipe);
  };

  useEffect(() => {
    filterData();
  }, [selectUserType]);

  return (
    <YStack>
      <XStack gap={'$3'} marginVertical={'$2'} paddingLeft={'$3'}>
        <View
          backgroundColor={`${active === '' ? '$yellow5Dark' : '$gray4Light'}`}
          padding={'$2'}
          borderRadius={8}>
          <Subtitle
            color={`${active === '' ? 'white' : '$gray3Dark'}`}
            size={'$4'}
            onPress={() => selectUser('')}>
            🤤 အကုန်စား
          </Subtitle>
        </View>
        {userType.map((user) => (
          <View
            key={user.UserId}
            backgroundColor={`${user.UserCode === active ? '$yellow5Dark' : '$gray4Light'}`}
            padding={'$2'}
            borderRadius={5}>
            <Subtitle
              color={`${user.UserCode === active ? 'white' : '$gray3Dark'}`}
              size={'$4'}
              onPress={() => selectUser(user.UserCode)}>
              {user.UserMMType === 'အသားစား' ? '🥩' : '🥦'} {user.UserMMType}
            </Subtitle>
          </View>
        ))}
      </XStack>
      <FlatList
        data={selectUserType === '' ? data : filteredData}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => <Cards item={item} />}
        keyExtractor={(item) => item.Guid}
        contentContainerStyle={{
          paddingLeft: 2,
          paddingBottom: 80,
        }}
      />
    </YStack>
  );
};

export default Content;
