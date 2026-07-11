export const captainMaidSchema = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Captain Maid',
    description: 'Premium natural home cleaning products for eco-conscious families',
    url: 'https://captainmaid.com',
    logo: 'https://captainmaid.com/logo.png',
    sameAs: [
      'https://facebook.com/captainmaid',
      'https://instagram.com/captainmaid',
      'https://twitter.com/captainmaid',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+66-XX-XXXXXX',
      contactType: 'Customer Service',
      email: 'support@captainmaid.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bangkok, Thailand',
      addressRegion: 'Bangkok',
      addressCountry: 'TH',
    },
  },

  product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Captain Maid Natural Cleaning Collection',
    description: 'Premium eco-friendly natural cleaning products safe for families and pets',
    image: [
      'https://captainmaid.com/products/green-bottle.jpg',
      'https://captainmaid.com/products/pink-bottle.jpg',
      'https://captainmaid.com/products/purple-bottle.jpg',
    ],
    brand: {
      '@type': 'Brand',
      name: 'Captain Maid',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'THB',
      lowPrice: '299',
      highPrice: '1299',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
  },

  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Captain Maid safe for children?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all Captain Maid products are formulated to be safe for children and pets. Our natural ingredients are non-toxic and hypoallergenic.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are Captain Maid products eco-friendly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Captain Maid is committed to sustainability. Our products are made from natural, biodegradable ingredients and come in recyclable packaging.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I buy Captain Maid products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Captain Maid products are available on our website, major e-commerce platforms, and select retail partners throughout Thailand.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your return policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer a 30-day satisfaction guarantee. If you are not completely satisfied with your purchase, we will provide a full refund.',
        },
      },
    ],
  },

  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://captainmaid.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://captainmaid.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'About',
        item: 'https://captainmaid.com/about',
      },
    ],
  },
};
