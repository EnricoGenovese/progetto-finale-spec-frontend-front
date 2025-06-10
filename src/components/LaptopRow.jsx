import { useContext } from "react";
import { Link } from "react-router-dom"
import { GlobalContext } from "../context/GlobalContext";

export default function LaptopRow({ laptop }) {
    const { favorites, addToFavorites, compareList, addToCompare } = useContext(GlobalContext);

    const isInFavorites = favorites.some((fav) => fav.id === laptop.id);
    const isInComparison = compareList.some((comp) => comp.id === laptop.id);

    return (
        <tr className="row">
            <td>{laptop.title}</td>
            <td>{laptop.category}</td>
            <td>
                <Link to={`/laptops/${laptop.id}`}>
                    <button>Dettagli</button>
                </Link>
            </td>
            <td>
                <button onClick={() => addToFavorites(laptop.id)}>
                    {isInFavorites ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                </button>
            </td>
            <td>
                <button onClick={() => addToCompare(laptop.id)}>
                    {isInComparison ? "Togli dal confronto" : "Aggiungi al confonto"}
                </button>
            </td>
        </tr>

    )
}