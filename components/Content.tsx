import React, { useEffect, useState } from 'react';
import { Button, Input, Text, View, XStack, YStack } from 'tamagui';
import data from '../data/Recipes.json';
import userType from '../data/UsersTypes.json';
import Cards from './Cards';
import { FlatList } from 'react-native';
import { Subtitle } from '~/tamagui.config';
import { RecipeType } from '~/interfaces/data';
import { Ionicons } from '@expo/vector-icons';

const Content = () => {
  const [selectUserType, setSelectUserType] = useState('');
  const [search, setSearch] = useState('');
  const [filteredData, setfilteredData] = useState<RecipeType[]>([]);

  const selectUser = (userType: string) => {
    setSelectUserType(userType);
  };

  const filterData = () => {
    if (search.length > 0) {
      const searchRecipe = data.filter((el) => el.Name.includes(search));
      setfilteredData(searchRecipe);
    } else if (selectUserType !== '') {
      const recipe = data.filter((el) => el.UserType === selectUserType);
      setfilteredData(recipe);
    } else {
      setfilteredData(data);
    }
  };

  useEffect(() => {
    filterData();
  }, [selectUserType, search]);

  return (
    <YStack marginBottom={'$13'}>
      <View overflow="hidden" height={search === '' ? 100 : 50}>
        <XStack ai={'center'} position="relative">
          <Input
            size="$3"
            borderWidth={1}
            w={'95%'}
            ml={'$3'}
            mr={'$1'}
            marginVertical={'$2'}
            bc={'$yellow1Light'}
            boc={'$yellow7Light'}
            color={'#000'}
            fontWeight={'bold'}
            onChangeText={(text: string) => setSearch(text)}
          />
          <Ionicons
            name="search"
            color={'hsl(47, 100%, 50.0%)'}
            size={24}
            style={{ position: 'absolute', right: 20 }}
          />
        </XStack>
        <XStack space={'$3'} marginVertical={'$2'} paddingLeft={'$3'}>
          <View
            backgroundColor={`${selectUserType === '' ? '$yellow5Dark' : '$gray4Light'}`}
            padding={'$2'}
            borderRadius={8}>
            <Subtitle
              color={`${selectUserType === '' ? 'white' : '$gray3Dark'}`}
              size={'$4'}
              onPress={() => selectUser('')}>
              🤤 အကုန်စား
            </Subtitle>
          </View>
          {userType.map((user) => (
            <View
              key={user.UserId}
              backgroundColor={`${user.UserCode === selectUserType ? '$yellow5Dark' : '$gray4Light'}`}
              padding={'$2'}
              borderRadius={5}>
              <Subtitle
                color={`${user.UserCode === selectUserType ? 'white' : '$gray3Dark'}`}
                size={'$4'}
                onPress={() => selectUser(user.UserCode)}>
                {user.UserMMType === 'အသားစား' ? '🥩' : '🥦'} {user.UserMMType}
              </Subtitle>
            </View>
          ))}
        </XStack>
      </View>
      <FlatList
        windowSize={10}
        data={filteredData}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => <Cards item={item} />}
        keyExtractor={(item) => item.Guid}
      />
    </YStack>
  );
};

export default Content;
