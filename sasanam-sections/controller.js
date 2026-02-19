const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('./service');

/**
 * @openapi
 * /hero-stones:
 *   get:
 *     summary: Get all hero stones
 *     responses:
 *       200:
 *         description: List of hero stones
 */
router.get('/', async (req, res) => {
  try {
    const result = await getAll();
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    res.json(result.data);
  } catch (err) {
    console.error('Hero stones controller error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

/**
 * @openapi
 * /hero-stones/{id}:
 *   get:
 *     summary: Get a hero stone by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero stone details
 *       404:
 *         description: Hero stone not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await getById(id);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    res.json(result.data);
  } catch (err) {
    console.error('Hero stones controller error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

/**
 * @openapi
 * /hero-stones:
 *   post:
 *     summary: Create a new hero stone
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleName:
 *                 type: string
 *               authorName:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Hero stone created successfully
 */
router.post('/', async (req, res) => {
  const data = req.body || {};
  
  try {
    const result = await create(data);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    res.status(201).json(result.data);
  } catch (err) {
    console.error('Hero stones controller error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

/**
 * @openapi
 * /hero-stones/{id}:
 *   put:
 *     summary: Update a hero stone
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleName:
 *                 type: string
 *               authorName:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Hero stone updated successfully
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body || {};
  
  try {
    const result = await update(id, data);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    res.json(result.data);
  } catch (err) {
    console.error('Hero stones controller error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

/**
 * @openapi
 * /hero-stones/{id}:
 *   delete:
 *     summary: Delete a hero stone
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero stone deleted successfully
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await remove(id);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    res.json(result.data);
  } catch (err) {
    console.error('Hero stones controller error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

module.exports = router;
