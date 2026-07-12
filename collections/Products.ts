import { CollectionConfig } from 'payload/types';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      unique: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { label: 'Floor Cleaning', value: 'floor' },
        { label: 'Kitchen Cleaning', value: 'kitchen' },
        { label: 'Bathroom Cleaning', value: 'bathroom' },
        { label: 'Multi-Purpose', value: 'multipurpose' },
        { label: 'Pet & Family Safe', value: 'pet-safe' },
      ],
      required: true,
    },
    {
      name: 'price',
      label: 'Price (THB)',
      type: 'number',
      required: true,
    },
    {
      name: 'image',
      label: 'Product Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'ingredients',
      label: 'Key Ingredients',
      type: 'array',
      fields: [
        {
          name: 'ingredient',
          type: 'text',
        },
        {
          name: 'benefit',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'safetyRating',
      label: 'Safety Rating (1-5)',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'ecoFriendly',
      label: 'Eco-Friendly',
      type: 'checkbox',
    },
    {
      name: 'petSafe',
      label: 'Pet Safe',
      type: 'checkbox',
    },
    {
      name: 'published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
};
