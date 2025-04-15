const express = require('express');
const router = express.Router();

const pubs = [
    {
      id: 1,
      name: 'The Golden Fleece',
      slug: 'the-golden-fleece',
      place: 'york',
      position: [53.9584, -1.0807],
      description: 'Famous haunted pub in York.',
      attributes: ['accessible', 'food', 'cocktails'],
      images: ['https://upload.wikimedia.org/wikipedia/commons/9/98/Golden_Fleece%2C_York_-_geograph.org.uk_-_3442620.jpg',
  'https://cdn.getyourguide.com/img/location/5cfd1bca65967.jpeg/88.jpg'
      ],
      video: 'https://www.youtube.com/embed/someVideoID'
    },
    {
      id: 2,
      name: 'Eagle & Child',
      slug: 'eagle-and-child',
      place: 'york',
      position: [53.9577, -1.0813],
      description: 'Historic pub with great Sunday roasts.',
      attributes: ['dog-friendly', 'food', 'sunday-lunch', 'beer-garden'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Eagle_and_Child_York.jpg',
      video: ''
    }
  ];

router.get('/', (req, res) => {
  res.json(pubs);
});

module.exports = router;
