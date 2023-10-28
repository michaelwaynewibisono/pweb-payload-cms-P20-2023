import payload from 'payload';
import findByID from 'payload/dist/collections/operations/findByID';

/** @type {import('payload/types').CollectionConfig} */
const Todo = {
    slug: 'todo',
    labels: {
        singular: 'Todo',
        plural: 'Todo',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            required: true,
        },
        {
            name: 'activeButton',
            label: 'Category',
            type: 'relationship',
            relationTo: 'category',
            required: true,
        },
        {
            name: 'completed',
            label: 'Completed',
            type: 'checkbox',
            required: false,
        },
    ],
    hooks: {
        afterChange: [
            async (args) => {
                console.log('afterChange - operation:', args.operation);
                if (args.operation === 'create' || args.operation === 'update' || args.operation === 'delete') {
                    await payload.create({
                        collection: 'log',
                        data: {
                            collection: 'todo',
                            action: args.operation,
                            timestamp: new Date(),
                        },
                    });
                }
            },
        ],
        afterOperation: [
            async (args) => {
                console.log('afterOperation - operation:', args.operation);
                if (args.operation === 'findByID') {
                    // Create click activity
                    await payload.create({
                        collection: "log",
                        data: {
                            collection: 'todo',
                            action: args.operation,
                            timestamp: new Date(),
                        },
                    });
                } else if (args.operation === 'deleteByID') {
                    console.log('Delete operation detected - proceeding to log it.'); // Add this line for debugging
                    // Log delete operation
                    await payload.create({
                        collection: 'log',
                        data: {
                            collection: 'todo',
                            action: 'delete',
                            timestamp: new Date(),
                        },
                    });
                }
            },
        ],
    }
};

export default Todo;
