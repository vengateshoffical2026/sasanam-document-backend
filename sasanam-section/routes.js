const express = require('express');
const router = express.Router();
const {
  createSection,
  getSectionById,
  getAllSections,
  updateSection,
  deleteSection
} = require('./controller');
const { validateCreateSection, validateUpdateSection } = require('./controller');

/**
 * @openapi
 * /sasanam-section:
 *   post:
 *     summary: Create a new section
 *     tags:
 *       - Sections
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Section name (max 100 characters)
 *                 example: "Sales"
 *     responses:
 *       201:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Section name already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', validateCreateSection, createSection);

/**
 * @openapi
 * /sasanam-section:
 *   get:
 *     summary: Get all sections
 *     tags:
 *       - Sections
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Maximum number of results (max 1000)
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of results to skip (pagination)
 *     responses:
 *       200:
 *         description: Sections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllSections);

/**
 * @openapi
 * /sasanam-section/{id}:
 *   get:
 *     summary: Get section by ID
 *     tags:
 *       - Sections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Section ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Section retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Section not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getSectionById);

/**
 * @openapi
 * /sasanam-section/{id}:
 *   put:
 *     summary: Update section by ID
 *     tags:
 *       - Sections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Section ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Section name (max 100 characters)
 *                 example: "Marketing"
 *     responses:
 *       200:
 *         description: Section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input or ID format
 *       404:
 *         description: Section not found
 *       409:
 *         description: Section name already exists
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateUpdateSection, updateSection);

/**
 * @openapi
 * /sasanam-section/{id}:
 *   delete:
 *     summary: Delete section by ID
 *     tags:
 *       - Sections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Section ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Section not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteSection);

module.exports = router;
