import { Box, HStack, VStack, Text, Spacer, FlatList } from "native-base";
import { RefreshControl } from "react-native";

const CustomList = ({ items }) => {
  /* Render list item */
  const renderItem = ({ item }) => {
    console.log( 'Desde renderItem: ',item);
    return (
      <Box
        borderBottomWidth="1"
        _dark={{ borderColor: "gray.600" }}
        backgroundColor="blue.300"
        borderColor="blue.200"
        pl="4"
        pr="5"
        py="2"
      >
        <HStack space={3} justifyContent="space-between">
          <VStack>
            <Text color="yellow" bold>
              {item.title}
              Hola
            </Text>
            <Text color="yellow" bold>
              {item.director}
            </Text>
            <Text color="yellow" bold>
              {item.opening_crawl}
            </Text>
          </VStack>
          <Spacer />
        </HStack>
      </Box>
    );
  };

  return (
  
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  );
};

export default CustomList;