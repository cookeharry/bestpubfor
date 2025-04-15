import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapView from './MapView';
import PubDetails from './PubDetails';
import Navbar from './Navbar';
import CategoryView from './CategoryView';
import CityCategoryView from './CityCategoryView';
import SeoPubDetails from './SeoPubDetails';
import BestFor from './BestFor';
import PubFeatureReview from './PubFeatureReview';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/:place" element={<MapView />} />
          <Route path="/:place/best-for/:attribute" element={<BestFor />} />
          <Route path="/:place/:slug" element={<SeoPubDetails />} />
          <Route path="/:place/:slug/:feature" element={<PubFeatureReview />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
