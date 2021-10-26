import express from 'express';

const router = express.Router();

/**
 * @swagger
 * parameters:
 *   limit:
 *     in: query
 *     name: limit
 *     schema:
 *       type: number
 *       default: 20
 *   offset:
 *     in: query
 *     name: offset
 *     schema:
 *       type: number
 *       deafult: 0
 * 
 * definitions:
 *   Vine:
 *     properties:
 *       title:
 *         type: string
 *         example: I love you bitch
 *       description:
 *         type: string
 *         example: I love you bitch, I ain't gonna never stop login you, biiitch
 *   Creator:
 *     properties:
 *       username:
 *         type: string
 *         example: Meme
 *       url:
 *         type: string
 *         example: https://vine.co/asdf124
 */

/* GET home page. */
router.get('/', (req, res) => {
  res.json({});
});

export default router;
