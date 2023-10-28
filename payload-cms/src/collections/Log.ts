// log.ts
import { CollectionConfig } from 'payload/types';

const Log: CollectionConfig = {
    slug: 'log',
    labels: {
        singular: 'Log',
        plural: 'Log',
    },
    fields: [
        {
            name: 'action',
            label: 'Action',
            type: 'text',
            required: true,
        },
        {
            name: 'timestamp',
            label: 'Timestamp',
            type: 'date',
            required: true,
        },
    ],
    access: {
        read: () => true, // You may adjust the read access control
        create: () => false, // Prevent direct creation of logs
        update: () => false, // Prevent updates to logs
        delete: () => true, // Prevent deletion of logs
    },
};

export default Log;
