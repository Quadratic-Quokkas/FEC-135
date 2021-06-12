import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Spinner from './spinner/LoadingSpinner';
import GalleryPanel from './gallery-panel/GalleryPanel';
import ContentPanel from './content-panel/ContentPanel';
import CurrentStyleContext from './contexts/CurrentStyleContext';

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
`;

const GalleryDiv = styled.div`
  order: 1;
  margin-left: 20px;
`;

const ContentDiv = styled.div`
  order: 2;
  margin: 10px 20px;
  width: 450px;
`;

function ProductOverview() {
  const [product, setProduct] = useState([]);
  const [isError, setIsError] = useState(false);
  const [metaData, setMetaData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [prevStyle, setPrevStyle] = useState('');
  const [currentStyle, setCurrentStyle] = useState('');
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`http://localhost:3000/api/products/${25171}`);
        setProduct(result.data);
      } catch (err) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const result = await axios(`/api/reviews/meta?product_id=${25171}`);
        setMetaData(result.data);
      } catch (err) {
        setIsError(true);
      }
    };
    fetchMeta();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios(`http://localhost:3000/api/products/${25171}/styles`);
        setStyles(results.data.results);
        const defaultStyle = results.data.results.filter((style) => (
          style['default?']
        ));
        setPrevStyle(defaultStyle[0]);
        setCurrentStyle(defaultStyle[0]);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  function updateCurrentStyle(select) {
    setPrevStyle(currentStyle);
    setCurrentStyle(select);
  }

  function previewCurrentStyle(preview) {
    setCurrentStyle(preview);
  }

  function revertCurrentStyle() {
    setCurrentStyle(prevStyle);
  }

  return (
    isLoading
      ? <Spinner />
      : (
        <CurrentStyleContext.Provider value={{ currentStyle, setCurrentStyle }}>
          <OverviewContainer>
            <GalleryDiv>
              <GalleryPanel />
            </GalleryDiv>
            <ContentDiv>
              <ContentPanel
                product={product}
                metaData={metaData}
                styles={styles}
                updateCurrentStyle={updateCurrentStyle}
                previewCurrentStyle={previewCurrentStyle}
                revertCurrentStyle={revertCurrentStyle}
                currentStyle={currentStyle}
              />
            </ContentDiv>
          </OverviewContainer>
        </CurrentStyleContext.Provider>
      )
  );
}

export default ProductOverview;
