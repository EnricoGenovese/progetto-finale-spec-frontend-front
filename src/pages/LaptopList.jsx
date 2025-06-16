import { useCallback, useContext, useMemo, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import LaptopRow from "../components/LaptopRow";
import FavoritesModal from "../components/FavoritesModal";
import ComparisonModal from "../components/ComparisonModal";

import debounce from "../utilities/debounce";

export default function LaptopList() {
  const {
    laptops,
    loading,
    favorites,
    compareList, showCompareModal, openCompareModal, closeCompareModal,
    showFavoritesModal, openFavoritesModal, closeFavoritesModal
  } = useContext(GlobalContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);


  const handleSearch = useCallback(
    debounce(setSearchQuery, 500)
    , [])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortIcon = sortOrder === 1 ? '↓' : '↑'

  const categoriesMap = laptops.map(l => l.category);

  let categories = ['Tutte'];
  categoriesMap.forEach((category) => {
    if (!categories.includes(category)) {
      categories.push(category)
    }
  });

  const sortedAndFilteredLaptops = useMemo(() => {
    const getSortBy = (sortBy, a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    };
    return [...laptops]
      .filter(laptop =>
        laptop.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
      )
      .filter(laptop =>
        selectedCategory === "Tutte" ? true : laptop.category === selectedCategory
      )
      .sort((a, b) => getSortBy(sortBy, a, b) * sortOrder);
  }, [laptops, sortBy, sortOrder, searchQuery, selectedCategory]);


  if (loading) {
    return <div>Caricamento...</div>;
  }


  return (
    <>
      <div className="searchbar">
        <label htmlFor="search" style={{ marginRight: '2px' }}>Cerca per nome:</label>
        <input
          type="text"
          name="search"
          onChange={e => handleSearch(e.target.value)}
        />
        <label htmlFor="category" style={{ marginLeft: '8px', marginRight: '2px' }}>Filtra per categoria: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <h2>Lista dei laptop</h2>
      <button onClick={openCompareModal}>
        Confronta prodotti
      </button>
      <button onClick={openFavoritesModal}>
        Visualizza i preferiti
      </button>
      {sortedAndFilteredLaptops.length > 0 ?
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>Nome {sortBy === 'title' && sortIcon}</th>
              <th onClick={() => handleSort('category')}>Categoria {sortBy === 'category' && sortIcon}</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredLaptops.map((laptop) => (
              <LaptopRow
                key={laptop.id}
                laptop={laptop}
              />
            ))}
          </tbody>
        </table>
        :
        <div>
          <h2>Nessun risultato trovato per la ricerca</h2>
        </div>}
      <FavoritesModal
        favorites={favorites}
        show={showFavoritesModal}
        onClose={closeFavoritesModal}
      />

      <ComparisonModal
        compareList={compareList}
        show={showCompareModal}
        onClose={closeCompareModal}
      />
    </>
  );
}