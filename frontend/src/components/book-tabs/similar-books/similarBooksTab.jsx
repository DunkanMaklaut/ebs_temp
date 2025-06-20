import React, { useEffect, useState } from 'react';
import CollectionList from '@components/collectionList/CollectionList.jsx';


const SimilarBooksTab = ({ similarBooks, onBookClick }) => {
  if (!similarBooks || similarBooks.length === 0) {
    return <p>Похожие книги не найдены.</p>;
  }

  return (
    <CollectionList
      collectionId={null}
      collectionName=""
      hideMoreDetails={true}
      books={similarBooks}
      onBookClick={onBookClick}
      onMoreDetails={() => {}}
      customClassName="collection-similar-books"
    />
  );
};

export default SimilarBooksTab;