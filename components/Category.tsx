import React, { Dispatch, SetStateAction } from 'react';
import { View, XStack } from 'tamagui';
import { Subtitle } from '~/tamagui.config';
import userType from '../data/UsersTypes.json';

type categoryProps = {
  selectUserType: string;
  setSelectUserType: Dispatch<SetStateAction<string>>;
};

const Category = ({ selectUserType, setSelectUserType }: categoryProps) => {
  return (
    <XStack space={'$3'} marginVertical={'$2'} paddingLeft={'$3'}>
      <View
        backgroundColor={`${selectUserType === '' ? '$yellow5Dark' : '$gray4Light'}`}
        padding={'$2'}
        borderRadius={8}>
        <Subtitle
          color={`${selectUserType === '' ? 'white' : '$gray3Dark'}`}
          size={'$4'}
          onPress={() => setSelectUserType('')}>
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
            onPress={() => setSelectUserType(user.UserCode)}>
            {user.UserMMType === 'အသားစား' ? '🥩' : '🥦'} {user.UserMMType}
          </Subtitle>
        </View>
      ))}
    </XStack>
  );
};

export default Category;
