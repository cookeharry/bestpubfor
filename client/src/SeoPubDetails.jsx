import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPubBySlug, fetchFeatureReviewsForPub } from './api';
import { PortableText } from '@portabletext/react';

const SeoPubDetails = () => {
    const { place, slug } = useParams();
    const [pub, setPub] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const load = async () => {
            console.log("Slug from URL:", slug);
            const pubData = await fetchPubBySlug(slug);
            console.log("Fetched pub data:", pubData);
            setPub(pubData);
            if (pubData?._id) {
                const reviewData = await fetchFeatureReviewsForPub(pubData._id);
                setReviews(reviewData);
            }
        };
        load();
    }, [slug]);

    if (!pub) return <div>Loading pub details…</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{pub.name}</h1>

            {pub.description && (
                <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{pub.description}</p>
            )}

            {pub.attributes?.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <strong>Best For:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                        {pub.attributes.map(attr => (
                            <li key={attr} style={{ background: '#eee', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {attr.replace('-', ' ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Image Display */}
            {pub.images?.length > 0 && (
                <img
                    src={pub.images[0]}
                    alt={pub.name}
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
                />
            )}

            {/* Full Description */}
            {pub.fullDescription && (
                <div>
                    <h3>About this pub</h3>
                    <PortableText value={pub.fullDescription} />
                </div>
            )}

            {/* Contact Info */}
            {pub.contact && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Contact</h3>
                    <p><strong>Address:</strong> {pub.contact.address}</p>
                    <p><strong>Phone:</strong> {pub.contact.phone}</p>
                    {pub.contact.website && (
                        <p>
                            <strong>Website:</strong> <a href={pub.contact.website} target="_blank" rel="noreferrer">{pub.contact.website}</a>
                        </p>
                    )}
                </div>
            )}

            {/* Opening Times */}
            {pub.openingTimes && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Opening Times</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {Object.entries(pub.openingTimes).map(([day, time]) => (
                            <li key={day}><strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {time}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Feature Reviews */}
            {reviews?.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                    <h3>Reviews</h3>
                    {reviews.map(review => (
                        <div key={review._id} style={{ marginBottom: '2rem' }}>
                            <h4>{review.type}</h4>
                            <PortableText value={review.body} />
                        </div>
                    ))}
                </div>
            )}

            {/* Back Link */}
            <div style={{ marginTop: '2rem' }}>
                <Link to={`/${place}`}>← Back to map</Link>
            </div>
        </div>
    );
};

export default SeoPubDetails;
