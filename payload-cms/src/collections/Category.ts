// Category.ts
import { CollectionConfig } from 'payload/types';

const Category: CollectionConfig = {
    slug: 'category',
    labels: {
        singular: 'Category',
        plural: 'Category',
    },
    admin: {
        useAsTitle: 'activeButton'
    },
    fields: [
        {
            name: 'activeButton',
            label: 'Category',
            type: 'text',
            required: true,
        },
    ],
};

export default Category;
