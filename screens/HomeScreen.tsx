import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';
import { HomeScreenProps } from '../AppNavigator';
import { Favorite, Recipe } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const { loading, userId, recipes,toggleFavorite} = useRecipeContext();
  const handleRecipePress = (item: Recipe | Favorite) => {
    navigation.navigate('Detail',{recipe:item});
  };
const {top}=useSafeAreaInsets();
  return (  
    <View style={[ styles.screenContainer,{paddingTop:top}]}>
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
                userId={userId}
                toggleFavorite={(item)=>{new Promise((res,rej)=>{res("")})}}
                isRecipeFavorite={()=>false}
                onPress={()=>handleRecipePress(item)}
              />
            )}
            ListHeaderComponent={()=>(<Text style={styles.heading}>All Recipes</Text>)}
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