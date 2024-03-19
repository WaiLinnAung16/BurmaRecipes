import React, { useEffect, useRef, useState } from 'react';
import { Input, View, XStack, YStack } from 'tamagui';
import data from '../../data/Recipes.json';
import Cards from '../../components/Cards';
import { FlatList, TextInput } from 'react-native';
import { RecipeType } from '~/interfaces/data';
import { AntDesign } from '@expo/vector-icons';
import Category from '../../components/Category';

export default function Main() {
  
  const [selectUserType, setSelectUserType] = useState(''); 
  const [search, setSearch] = useState(''); 
  const [filteredData, setfilteredData] = useState<RecipeType[]>([]); 
  const inputRef = useRef<TextInput>(null);

  // Function to handle focusing input and clearing search
  const focusInput = () => {
    if (inputRef.current?.isFocused()) {
      // If input is already focused
      inputRef.current.blur(); // Blur the input
      setSearch(''); // Clear the search query
    } else {
      inputRef.current?.focus(); // Focus the input
    }
  };

  // Function to filter data based on search query or selected user type
  const filterData = () => {
    if (search.length > 0) {
      // If there is a search query
      const searchRecipe = data.filter((el) => el.Name.includes(search)); // Filter recipes based on search query
      setfilteredData(searchRecipe); // Set filtered data
    } else if (selectUserType !== '') {
      // If a user type is selected
      const recipe = data.filter((el) => el.UserType === selectUserType); // Filter recipes based on selected user type
      setfilteredData(recipe); // Set filtered data
    } else {
      setfilteredData(data); // If no search query or user type is selected, set filtered data to all recipes
    }
  };

  // Effect to filter data whenever selectUserType or search changes
  useEffect(() => {
    filterData();
  }, [selectUserType, search]);
  return (
    <YStack backgroundColor={'$yellow1Light'} flex={1}>
      <View overflow="hidden" height={search === '' ? 100 : 50}>
        <XStack ai={'center'} position="relative">
          <Input
            ref={inputRef}
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
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
          <AntDesign
            name={search.length > 0 ? 'closecircleo' : 'search1'}
            color={'hsl(47, 100%, 50.0%)'}
            size={24}
            onPress={focusInput}
            style={{ position: 'absolute', right: 20 }}
          />
        </XStack>
        <Category selectUserType={selectUserType} setSelectUserType={setSelectUserType} />
      </View>
      <FlatList
        windowSize={10}
        data={filteredData}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => <Cards item={item} />}
        keyExtractor={(item) => item.Guid}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </YStack>
  );
}
