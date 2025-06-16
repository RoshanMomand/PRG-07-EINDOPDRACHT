import {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useGymData() {
    const [gymSpots, setGymSpots] = useState([]);
    const [searchGymSpots, setSearchGymSpots] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchvalue, setSearchvalue] = useState('');

    const fetchGyms = async () => {
        try {
            const url = `https://stud.hosted.hr.nl/1028086/trainmore-spots/trainmore-locations.json?timestamp=${Date.now()}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            });
            const data = await response.json()
            setGymSpots(data);
            setSearchGymSpots(data)
        } catch (e) {
            console.log("Couldnt fetch data" + e)
        }
    };

    const gymFavorites = async () => {
        // Als er niks in de favorites is haal de objecten op uit de showFavorites en zet die setShowFavorite bij elke render
        try {
            const storedFavorites = await AsyncStorage.getItem('my-favorites');
            if (storedFavorites) {
                const parsedFavorites = JSON.parse(storedFavorites);
                setFavorites(parsedFavorites);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleSearch = (text) => {
        setSearchvalue(text)
        const filtered = gymSpots.filter((spots) => {
            return (
                // Incorrect: This assumes `spots.title` and `spots.description` always exist. Null/undefined values could cause errors here.
                // Check if 'title' and 'description' exist before calling 'toLowerCase()'.
                spots?.title?.toLowerCase().includes(text.toLowerCase()) ||
                spots?.description?.toLowerCase().includes(text.toLowerCase())
            );
        });
        setSearchGymSpots(filtered); // Confirm if gymSpots is set correctly beforehand.
    };

    const addToFavorites = async (item) => {
        // The some method is an iterative method it calls a provided callbackfn  once for each element,
        // in an array, until the cbFN returns a truthy value.
        // If such element is found the some() method immediately returns a true and stops iterating through the array.
        if (favorites.some(favorite => favorite.id === item.id)) {
            console.log(`you have unclicked the `, item.id)
            const removeFavorite = favorites.filter((favorite) => favorite.id !== item.id);

            // removing the favorites and giving a new updated array with the favorites you already have
            //favorite.id !== item.id betekent: hou alleen de favorieten waarvan de id anders is dan die van het aangeklikte item.
            await AsyncStorage.setItem('my-favorites', JSON.stringify(removeFavorite))
            setFavorites(removeFavorite)
            console.log('removed the', item)
        } else {
            console.log('You have clicked the item with the id ', item.id)
            // the favorites now contains the item object where we clicked on so item.id is now in favorites.id
            const newFavorites = [...favorites, item]
            await AsyncStorage.setItem('my-favorites', JSON.stringify(newFavorites))
            setFavorites(newFavorites);
            // console.log('added the', item)
        }
    }

    useEffect(() => {
        fetchGyms();
        gymFavorites();
    }, []);

    return {
        gymSpots,
        searchGymSpots,
        favorites,
        searchvalue,
        handleSearch,
        addToFavorites
    };
}

