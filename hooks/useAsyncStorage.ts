import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { RecipeType } from '~/interfaces/data';

const useAsyncStorage = (key: string) => {
  const [data, setData] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);

  const getStorageItems = async () => {
    try {
      const items = await AsyncStorage.getItem(key);
      if (items !== null) {
        setData(JSON.parse(items));
      }
    } catch (error: any) {
      setError(error); // Alerting user in case of error
    } finally {
      setLoading(false);
    }
  };

  const setStorageItems = async (item: RecipeType | undefined) => {
    try {
      if (data?.some((recipe) => recipe?.Guid === item?.Guid)) {
        const items = data?.filter((recipe) => recipe?.Guid !== item?.Guid);
        await AsyncStorage.setItem(key, JSON.stringify(items));
      } else {
        const items = [...data, item];
        await AsyncStorage.setItem(key, JSON.stringify(items));
      }
    } catch (error) {
      alert(error); // Alerting user in case of error
    }
  };

  return { data, loading,error, getData: getStorageItems, setData: setStorageItems };
};

export default useAsyncStorage;
