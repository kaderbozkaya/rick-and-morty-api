import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  // Pagination adlı fonksiyonel bileşen tanımlandı. pageCount ve onPageChange prop'ları destructure edildi.
  return (
    <ReactPaginate
      previousLabel={"previous"} // "previous" butonu için etiket tanımlandı.
      nextLabel={"next"} // "next" butonu için etiket tanımlandı.
      breakLabel={"..."} // Sayfa numaralarının arasındaki boşluklar için "..." etiketi tanımlandı.
      breakClassName={"break-me"} // "breakLabel" için CSS sınıfı tanımlandı.
      pageCount={pageCount} // Toplam sayfa sayısı.
      marginPagesDisplayed={2} // Kenarlarda kaç sayfa numarasının gösterileceği.
      pageRangeDisplayed={5} // Aradaki kaç sayfa numarasının gösterileceği.
      onPageChange={onPageChange} // Sayfa değiştirildiğinde çağrılacak fonksiyon.
      containerClassName={"pagination"} // Ana konteyner için CSS sınıfı.
      subContainerClassName={"pages pagination"} // Alt konteyner için CSS sınıfı.
      activeClassName={"active"} // Aktif sayfa için CSS sınıfı.
    />
  );
};

export default Pagination;
