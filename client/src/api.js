import { client } from './sanity';

export const fetchPubs = async () => {
  const query = `*[_type == "pub"]{
    _id,
    name,
    "slug": slug.current,
    place,
    description,
    attributes,
    location,
    "images": images[].asset->url
  }`;

  return await client.fetch(query);
};

export const fetchPubBySlug = async (slug) => {
  const query = `*[_type == "pub" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    place,
    description,
    fullDescription,
    attributes,
    location,
    contact,
    openingTimes,
    "images": images[].asset->url
  }`;

  return await client.fetch(query, { slug });
};

export const fetchFeatureReviewsForPub = async (pubId) => {
  const query = `*[_type == "featureReview" && pub._ref == $pubId]{
    _id,
    title,
    slug,
    type,
    reviewedOn,
    body,
    "images": images[].asset->url
  }`;

  return await client.fetch(query, { pubId });
};
