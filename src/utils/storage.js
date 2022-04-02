import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeViews = async (value, name) => {
    console.log("storeViews: ", value, name+"_views");
  try {
    await AsyncStorage.setItem(name+"_views", value);
  } catch (e) {
    console.log(e)
  }
};

export const getViews = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name+"_views");
    if(value !== null) {
      return value;
    }else {
        return 0;
    }
  } catch (e) {
    console.log(e)
  }
};
