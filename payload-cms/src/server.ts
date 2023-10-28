import express from 'express';
import bodyParser from 'body-parser';
import payload from 'payload';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from a .env file
dotenv.config();

const app = express();

app.use(cors());

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET, // Use your Payload secret from the .env file
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Middleware
  app.use(bodyParser.json());

  // Create a new Todo item (POST)
  app.post('/api/todo', async (req, res) => {
    try {
      // Extract data from the request body
      const { title, description, completed, category } = req.body;

      // Create a new Todo object based on the Payload collection schema
      const newTodo = await payload.create({
        collection: 'todo',
        data: {
          title,
          description,
          completed,
          category
        },
      });

      // Send a success response with the created Todo item
      res.status(201).json(newTodo);
    } catch (error) {
      // Handle any errors
      console.error('Error creating Todo:', error);
      res.status(500).json({ error: 'Failed to create Todo' });
    }
  });

  // Retrieve a specific Todo by ID (GET)
  app.get('/api/todo/:id', async (req, res) => {
    try {
      const { id } = req.params;

      // Use any to bypass TypeScript issues, but you should define a proper type.
      const todo = await (payload.collections.todo as any).findOneByID(id);

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.status(200).json(todo);
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Change the specific Todo by ID route into a catch-all route
  app.get('/api/todo/:id(*)', async (req, res) => {
    try {
      const { id } = req.params;

      // Use any to bypass TypeScript issues, but you should define a proper type.
      const todo = await (payload.collections.todo as any).findOneByID(id);

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.status(200).json(todo);
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update a specific Todo by ID (PUT)
  app.put('/api/todo/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed, category } = req.body;

      // Update the Todo object based on the Payload collection schema
      const updatedTodo = await payload.update({
        collection: 'todo',
        id,
        data: {
          title,
          description,
          completed,
          category
        },
      });

      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete a specific Todo by ID (DELETE)
  app.delete('/api/todo/:id', async (req, res) => {
    try {
      const { id } = req.params;

      // Delete the Todo object based on the Payload collection schema
      await payload.delete({
        collection: 'todo',
        id,
      });

      res.status(204).send(); // No content (successful deletion)
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
