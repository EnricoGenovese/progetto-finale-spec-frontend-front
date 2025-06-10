import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "./Modal";

export default function ComparisonModal({ compareList, show, onClose }) {
  const { getLaptop } = useContext(GlobalContext);
  const [fullLaptops, setFullLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);

  useEffect(() => {
    // if (!show) return;
    setLoading(true);
    Promise.all(compareList.map(laptop => getLaptop(laptop.id)))
      .then(results => {
        setFullLaptops(results.map(res => res.laptop));
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setLoading(false));
  }, [compareList, getLaptop, show]);


  const orderedFullLaptops = useMemo(() => {
    const getSortBy = (sortBy, a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "category":
          return a.category.localeCompare(b.category);
        case "price":
          return a.price - b.price
        case "brand":
          return a.brand.localeCompare(b.compare)
        default:
          return 0;
      }
    }
    return [...fullLaptops].sort((a, b) => getSortBy(sortBy, a, b) * sortOrder);
  }, [fullLaptops, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortIcon = sortOrder === 1 ? '↓' : '↑';

  // if (!show) return null;
  if (loading) return <div>Caricamento...</div>;

  if (compareList.length <= 1) {
    return (
      <Modal
        title='Confronto prodotti'
        show={show}
        onClose={onClose}
        content={
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h3>Seleziona almeno due prodotti da confrontare</h3>
          </div>} />
    )
  }

  return (

    <Modal
      title='Confronto Prodotti'
      show={show}
      onClose={onClose}
      content={
        <table className="comparison-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>Nome {sortBy === 'title' && sortIcon}</th>
              <th onClick={() => handleSort('category')}>Categoria {sortBy === 'category' && sortIcon}</th>
              <th onClick={() => handleSort('price')}>Prezzo {sortBy === 'price' && sortIcon}</th>
              <th onClick={() => handleSort('brand')}>Marca {sortBy === 'brand' && sortIcon}</th>
            </tr>
          </thead>
          <tbody>
            {orderedFullLaptops.map((laptop) => (
              <tr key={laptop.id}>
                <td>{laptop.title}</td>
                <td>{laptop.category}</td>
                <td>{laptop.price}€</td>
                <td>{laptop.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
}
