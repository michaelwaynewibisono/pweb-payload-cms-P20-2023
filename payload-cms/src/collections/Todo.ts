import payload from 'payload';

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
                if (args.operation === 'create' || args.operation === 'update') {
                    await payload.create({
                        collection: 'log',
                        data: {
                            collection: 'todo',
                            todoId: args.doc.id,
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
                            todoId: args.doc.id,
                            action: args.operation,
                            timestamp: new Date(),
                        },
                    });
                }
            },
        ],
        afterDelete: [ // Add afterDelete hook for delete operations
            async (args) => {
                console.log('afterDelete - operation:', args.operation);
                await payload.create({
                    collection: "log",
                    data: {
                        collection: 'todo',
                        todoId: args.doc.id,
                        action: 'delete',
                        timestamp: new Date(),
                    },
                });
            },
        ],
    }
};

export default Todo;