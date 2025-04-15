import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';
import { fetchPubs } from './api';

const pintIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/931/931949.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const BestFor = () => {
    const { place, attribute } = useParams();
    const [filteredPubs, setFilteredPubs] = useState([]);

    useEffect(() => {
        const load = async () => {
            const allPubs = await fetchPubs();
            const filtered = allPubs.filter(pub =>
                pub.place === place &&
                pub.attributes?.includes(attribute)
            );
            console.log("Filtered pubs:", filtered);
            setFilteredPubs(filtered);
        };
        load();
    }, [place, attribute]);

    const validPubs = filteredPubs.filter(
        pub => typeof pub?.location?.lat === 'number' && typeof pub?.location?.lng === 'number'
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1>
                Best pubs in {place.charAt(0).toUpperCase() + place.slice(1)} for {attribute.replace('-', ' ')}
            </h1>
            {filteredPubs.length === 0 && <p>No pubs found with this feature.</p>}

            {validPubs.length > 0 && (
                <MapContainer
                    center={[53.9586, -1.0803]}
                    zoom={15}
                    style={{ height: '400px', width: '100%', marginBottom: '2rem' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                    />
                    {validPubs.map(pub => (
                        <Marker
                            key={pub._id}
                            position={[pub.location.lat, pub.location.lng]}
                            icon={pintIcon}
                        >
                            <Popup maxWidth={240}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <strong style={{ fontSize: '1rem' }}>{pub.name}</strong>

                                    {pub.images?.[0] && (
                                        <img
                                            src={pub.images[0]}
                                            alt={pub.name}
                                            style={{ width: '100%', margin: '0.5rem 0', borderRadius: '4px', objectFit: 'cover' }}
                                        />
                                    )}

                                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                                        {pub.description?.slice(0, 80)}...
                                    </p>

                                    <Link to={`/${pub.place}/${pub.slug}`} style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#0077cc' }}>
                                        View more
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}

            {filteredPubs.map(pub => (
                <div key={pub._id} style={{ marginBottom: '2rem' }}>
                    <h2>
                        <Link to={`/${pub.place}/${pub.slug}`}>{pub.name}</Link>
                    </h2>
                    {pub.images?.[0] && (
                        <img
                            src={pub.images[0]}
                            alt={pub.name}
                            style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                    )}
                    <p>{pub.description}</p>
                </div>
            ))}
        </div>
    );
};

export default BestFor;
