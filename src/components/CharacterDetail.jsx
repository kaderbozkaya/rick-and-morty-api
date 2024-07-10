import React from "react";

const CharacterDetail = ({ character }) => {
  // CharacterDetail adında bir fonksiyonel bileşen tanımlandı ve character prop'u destructure edildi.
  return (
    // Bileşenin döndüreceği JSX yapısı.
    <div className="m-6 text-[#22a2bd]">
      <h2 className="text-xl font-bold">{character.name}</h2>
      <img
        src={character.image}
        alt={character.name}
        className="rounded"
      />{" "}
      {/* Karakterin resmi */}
      <p>
        <strong>Status:</strong> {character.status}
      </p>{" "}
      {/* Karakterin durumu */}
      <p>
        <strong>Species:</strong> {character.species}
      </p>{" "}
      {/* Karakterin türü*/}
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>{" "}
      {/* Karakterin cinsiyeti */}
      <p>
        <strong>Origin:</strong> {character.origin.name}
      </p>{" "}
      {/* Karakterin kökeni*/}
    </div>
  );
};

export default CharacterDetail;
