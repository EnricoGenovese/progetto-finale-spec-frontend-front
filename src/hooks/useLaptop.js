import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_APIURL;

export default function useLaptop() {
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false)


    useEffect(() => {
        const fetchLaptops = async () => {
            try {
                const res = await fetch(`${apiUrl}/laptops`);
                const data = await res.json();
                setLaptops(data);
            } catch (error) {
                 
            } finally {
                setLoading(false)
            }
        };
        fetchLaptops();
    }, []);

    const getLaptop = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/laptops/${id}`);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const addToFavorites = (id) => {
        const isInFavorites = favorites.find((fav) => fav.id === id);
        if (isInFavorites) {
            setFavorites((prev) => prev.filter((fav) => fav.id !== id));
        } else {
            const newFavorite = laptops.find((laptop) => laptop.id === id);
            setFavorites((prev) => [...prev, newFavorite]);
        }
    };

    const openFavoritesModal = () => setShowFavoritesModal(true);
    const closeFavoritesModal = () => setShowFavoritesModal(false);

    const addToCompare = (id) => {
        const isInComparison = compareList.some((comp) => comp.id === id)
        if (isInComparison) {
            setCompareList((prev) => prev.filter((laptop) => laptop.id !== id));
        } else {
            if (compareList) {
                const newComparison = laptops.find((laptop) => laptop.id === id);
                if (newComparison) {
                    setCompareList((prev) => [...prev, newComparison]);
                }
            }
        }
    };

    const openCompareModal = () => setShowCompareModal(true)
    const closeCompareModal = () => setShowCompareModal(false)


    return {
        laptops, getLaptop,
        favorites, addToFavorites,
        compareList, addToCompare,
        showCompareModal, openCompareModal, closeCompareModal,
        showFavoritesModal, openFavoritesModal, closeFavoritesModal,
        loading
    };
}