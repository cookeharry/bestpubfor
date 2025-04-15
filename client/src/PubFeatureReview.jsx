import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from './sanity';
import { PortableText } from '@portabletext/react';

const PubFeatureReview = () => {
    const { place, slug, feature } = useParams();
    const [review, setReview] = useState(null);
    const [pub, setPub] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            const query = `*[_type == "featureReview" && type == $feature && pub->slug.current == $slug][0]{
        _id,
        title,
        type,
        body,
        reviewedOn,
        "images": images[].asset->url,
        pub->{
          name,
          slug,
          place,
          description,
          location
        }
      }`;

            const fetchedReview = await client.fetch(query, { slug, feature });
            console.log("Fetched review:", fetchedReview);
            setReview(fetchedReview);
            setPub(fetchedReview?.pub);
        };

        fetchReview();
    }, [slug, feature]);

    if (!review) return <div>Loading review…</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{review.title || `${pub?.name} – Sunday Lunch`}</h1>

            <p><strong>Reviewed:</strong> {new Date(review.reviewedOn).toLocaleDateString()}</p>

            {review.images?.[0] && (
                <img
                    src={review.images[0]}
                    alt={review.title}
                    style={{ width: '100%', marginBottom: '1rem', borderRadius: '6px' }}
                />
            )}

            <PortableText value={review.body} />

            {pub && (
                <div style={{ marginTop: '3rem' }}>
                    <h3>About {pub.name}</h3>
                    <p>{pub.description}</p>
                    <Link to={`/${pub.place || 'york'}/${pub.slug.current}`}>
                        View full pub profile →
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PubFeatureReview;
