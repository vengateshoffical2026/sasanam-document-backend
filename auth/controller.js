const express = require('express');
const router = express.Router();
const { login } = require('./service');

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  try {
    const result = await login(username, password);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    res.json({ token: result.token, expiresIn: result.expiresIn });
  } catch (err) {
    console.error('Auth controller error:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

module.exports = router;
