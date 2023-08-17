import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageData = async (key: string) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data) return data;
    else return null;
  } catch (error) {
    return '';
  }
};

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

// export const getAppData = async () => {
//   try {
//     const value = await AsyncStorage.getItem(storageKey);
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@key'); // Replace '@key' with the key of the data to be removed
  } catch (error) {
    console.error(error);
  }
};
export const removeStorageData = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
