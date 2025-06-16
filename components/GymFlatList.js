import {FlatList} from "react-native";
import GymLocationCard from "./GymLocationCard";

export default function GymList({ data, addToFavorites, favorites, navigation }) {
    return (
        <FlatList
            data={data}
            renderItem={({item}) => (
                <GymLocationCard
                    addToFavorites={addToFavorites}
                    isFavorite={favorites.some(favorite => favorite.id === item.id)}
                    navigation={navigation}
                    item={item}
                />
            )}
            keyExtractor={item => item?.id}
            numColumns={2}
        />
    );
}
