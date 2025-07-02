/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         quantity:
 *           type: integer
 *         status:
 *           type: boolean
 *         start:
 *           type: string
 *           format: date-time
 *         end:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "665e3a51922f7c84f5d9fcb0"
 *         title: "Mid-Year Campaign"
 *         description: "Big voucher drop"
 *         quantity: 100
 *         status: true
 *         start: "2025-06-01T00:00:00Z"
 *         end: "2025-06-30T23:59:59Z"
 *         createdAt: "2025-06-01T10:00:00Z"
 *         updatedAt: "2025-06-01T10:00:00Z"
 *
 *     EventInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - quantity
 *         - start
 *         - end
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         quantity:
 *           type: integer
 *         status:
 *           type: boolean
 *         start:
 *           type: string
 *           format: date-time
 *         end:
 *           type: string
 *           format: date-time
 *       example:
 *         title: "Mid-Year Campaign"
 *         description: "Big voucher drop"
 *         quantity: 100
 *         status: true
 *         start: "2025-06-01T00:00:00Z"
 *         end: "2025-06-30T23:59:59Z"
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events/{id}/editable/me:
 *   post:
 *     summary: Request edit permission
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission granted
 *       404:
 *         description: Event not found
 *       409:
 *         description: Already being edited
 */

/**
 * @swagger
 * /api/events/{id}/editable/release:
 *   post:
 *     summary: Release edit permission
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Released
 */

/**
 * @swagger
 * /api/events/{id}/editable/maintain:
 *   post:
 *     summary: Extend edit session
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Extended
 *       403:
 *         description: Session expired
 */
