import React, { useState, useEffect } from "react"; // React ve gerekli hook'lar import edildi.
import axios from "axios"; // HTTP istekleri için axios kütüphanesi import edildi.
import CharacterTable from "./components/CharacterTable"; // Karakter tablosu bileşeni import edildi.
import CharacterDetail from "./components/CharacterDetail"; // Karakter detayları bileşeni import edildi.
import Pagination from "./components/Pagination"; // Sayfalandırma bileşeni import edildi.
import "./App.css"; // Stil dosyası import edildi.
import logo from "./assets/logo.png"; // Logo resmi import edildi.

const App = () => {
  // State değişkenleri tanımlandı.
  const [characters, setCharacters] = useState([]); // Karakterlerin tümü.
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtrelenmiş karakterler.
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Seçilen karakterin detayları.
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
  }); // Filtreleme kriterleri.
  const [currentPage, setCurrentPage] = useState(0); // Geçerli sayfa.
  const [pageCount, setPageCount] = useState(0); // Toplam sayfa sayısı.
  const itemsPerPage = 6; // Sayfa başına gösterilecek karakter sayısı.

  // Bileşen ilk yüklendiğinde karakterleri çekmek için useEffect kullanıldı.
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Karakterleri API'dan çekmek için async fonksiyon tanımlandı.
  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character/"
      );
      setCharacters(response.data.results); // Çekilen karakterler state'e kaydedildi.
      setFilteredCharacters(response.data.results); // Filtrelenmiş karakterler state'e kaydedildi.
      setPageCount(Math.ceil(response.data.results.length / itemsPerPage)); // Toplam sayfa sayısı hesaplandı.
    } catch (error) {
      console.error("Error fetching data", error); // Hata durumunda konsola hata mesajı yazıldı.
    }
  };

  // Filtre değişikliklerini yönetmek için fonksiyon tanımlandı.
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value }); // Filtre değerleri güncellendi.
  };

  // Filtreler veya karakterler değiştiğinde filtreleme işlemini yeniden gerçekleştirmek için useEffect kullanıldı.
  useEffect(() => {
    applyFilters();
  }, [filters, characters]);

  // Filtreleme işlemi için fonksiyon tanımlandı.
  const applyFilters = () => {
    let filtered = characters;
    if (filters.name) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter(
        (character) =>
          character.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    if (filters.species) {
      filtered = filtered.filter((character) =>
        character.species.toLowerCase().includes(filters.species.toLowerCase())
      );
    }
    if (filters.gender) {
      filtered = filtered.filter(
        (character) =>
          character.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    setFilteredCharacters(filtered); // Filtrelenmiş karakterler state'e kaydedildi.
    setPageCount(Math.ceil(filtered.length / itemsPerPage)); // Toplam sayfa sayısı yeniden hesaplandı.
  };

  // Sayfa değişikliklerini yönetmek için fonksiyon tanımlandı.
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Satır tıklamalarını yönetmek için fonksiyon tanımlandı.
  const handleRowClick = (character) => {
    setSelectedCharacter(character); // Seçilen karakter state'e kaydedildi.
  };

  return (
    <div className="App">
      <img src={logo} alt="logo" className="w-56 flex justify-center m-auto" />{" "}
      {/* Logo gösterildi. */}
      <div className="m-3 flex justify-center">
        <input
          className="outline-none border-2 border-green-300 rounded m-3 p-1"
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange} // İsim filtresi inputu.
        />
        <input
          className="outline-none border-2 border-green-300 rounded m-3 p-1"
          type="text"
          name="status"
          placeholder="Status"
          value={filters.status}
          onChange={handleFilterChange} // Durum filtresi inputu.
        />
        <input
          className="outline-none border-2 border-green-300 rounded m-3 p-1"
          type="text"
          name="species"
          placeholder="Species"
          value={filters.species}
          onChange={handleFilterChange} // Tür filtresi inputu.
        />
        <select
          className="outline-none border-2 border-green-300 rounded m-3 p-1"
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange} // Cinsiyet filtresi select elementi.
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      {filteredCharacters.length === 0 ? (
        <div className="text-center mt-5 text-red-500">No results found</div> // Filtre sonucunda hiçbir karakter bulunamazsa gösterilecek mesaj.
      ) : (
        <>
          <CharacterTable
            characters={filteredCharacters.slice(
              currentPage * itemsPerPage,
              (currentPage + 1) * itemsPerPage
            )}
            onRowClick={handleRowClick} // Karakter tablosu bileşeni ve tıklama işlemi.
          />
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />{" "}
          {/* Sayfalandırma bileşeni ve sayfa değiştirme işlemi. */}
          {selectedCharacter && (
            <CharacterDetail character={selectedCharacter} /> // Seçilen karakterin detay bileşeni.
          )}
        </>
      )}
    </div>
  );
};

export default App;
