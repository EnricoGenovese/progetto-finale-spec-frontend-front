import { Link } from "react-router-dom";
import Modal from "./Modal";


export default function FavoritesModal({ favorites, show, onClose }) {
    return (
        <Modal
            title={
                <>
                    Preferiti:
                    <p style={{ fontWeight: "normal", fontSize: "0.8em" }}>
                        (Clicca su un prodotto per vedere i dettagli)
                    </p>
                </>

            }
            show={show}
            onClose={onClose}
            content={
                <div className="favorites">
                    {favorites.length > 0 ? (
                        <ul>
                            {favorites.map((laptop) => (
                                <li key={laptop.id}>
                                    <Link to={`/laptops/${laptop.id}`} onClick={onClose}>{laptop.title}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nessun elemento nei preferiti!</p>
                    )}
                </div>
            }
        />
    );
}