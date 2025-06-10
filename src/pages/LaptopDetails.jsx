import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import FavoritesModal from "../components/FavoritesModal";

export default function LaptopDetails() {
  const { id } = useParams();
  const { getLaptop, loading, favorites, addToFavorites, showFavoritesModal, openFavoritesModal, closeFavoritesModal } = useContext(GlobalContext);
  const [laptop, setLaptop] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);




  useEffect(() => {
    const fetchLaptop = async () => {
      setLocalLoading(true);
      try {
        const data = await getLaptop(id);
        setLaptop(data.laptop);
      } catch (error) {
        setLaptop(null);
      } finally {
        setLocalLoading(false);
      }
    };
    fetchLaptop();
  }, [id, getLaptop]);

  if (loading || localLoading) {
    return <div>Caricamento...</div>;
  }

  if (!laptop) {
    return <h3>Prodotto non trovato</h3>;
  }

  const isInFavorites = favorites.some((fav) => fav.id === laptop.id);

  return (
    <>
      <div className="card">
        <h3>Dettagli:</h3>
        <p><strong>Nome: </strong>{laptop.title}</p>
        <p><strong>Categoria: </strong>{laptop.category}</p>
        <p><strong>Marca: </strong>{laptop.brand}</p>
        <p><strong>Prezzo:</strong> €{laptop.price}</p>
      </div>
      <div>
        <button onClick={() => addToFavorites(laptop.id)}>
          {isInFavorites ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        </button>
        <button onClick={openFavoritesModal}>
          Visualizza i preferiti
        </button>
      </div>

      <FavoritesModal
        favorites={favorites}
        show={showFavoritesModal}
        onClose={closeFavoritesModal}
      />
    </>
  );
}