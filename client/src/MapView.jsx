import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { fetchPubs } from './api';
import FilterPanel from './FilterPanel';

const pintIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/931/931949.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapView = () => {
  const [pubs, setPubs] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPubs();
      setPubs(data);
    };
    load();
  }, []);

  const filteredPubs = pubs.filter(pub =>
    selectedFilters.length === 0 ||
    selectedFilters.every(filter => pub.attributes?.includes(filter))
  );

  return (
    <>
      <FilterPanel selected={selectedFilters} setSelected={setSelectedFilters} />
      <MapContainer center={[53.9586, -1.0803]} zoom={15} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        />
        {filteredPubs.map(pub => {
  // Null check for missing or broken location
  if (!pub.location?.lat || !pub.location?.lng) return null;

  return (
    <Marker
      key={pub._id}
      position={[pub.location.lat, pub.location.lng]}
      icon={pintIcon}
    >
      <Popup>
        <strong>{pub.name}</strong><br />
        <Link to={`/${pub.place}/${pub.slug}`}>View more</Link>
      </Popup>
    </Marker>
  );
})}
      </MapContainer>
    </>
  );
};

export default MapView;
