import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';
import { Favorite, Recipe } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListHeader from '../components/header';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const { loading, recipes,toggleFavorite} = useRecipeContext();
  const handleRecipePress = (item: Recipe | Favorite) => {
    navigation.navigate('Detail',{recipe:item});
  };
const {top,bottom}=useSafeAreaInsets();
  return (  
    <View style={[ styles.screenContainer,{paddingTop:top,paddingBottom:bottom}]}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF6F61" style={styles.loadingIndicator} />
      ) : (
        <>
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <RecipeCard
                item={item}
                toggleFavorite={(item)=>{new Promise((res,rej)=>{res("")})}}
                isRecipeFavorite={()=>false}
                onPress={()=>handleRecipePress(item)}
              />
            )}
            ListHeaderComponent={ListHeader}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>You haven't saved any favorites yet!</Text>
              </View>
            )}
            style={{ flex: 1 }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  userIdDisplay: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;