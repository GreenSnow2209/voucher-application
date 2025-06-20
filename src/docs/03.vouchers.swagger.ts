/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: Voucher management APIs
 */

/**
 * @swagger
 * /api/vouchers/request/{id}:
 *   post:
 *     summary: Request a voucher for a specific event
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to request voucher for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Voucher issued successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       404:
 *         description: Event not found
 *       456:
 *         description: Maximum quantity of vouchers has been reached
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Voucher:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         code:
 *           type: string
 *         userId:
 *           type: string
 *         eventId:
 *           type: string
 *         status:
 *           type: boolean
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         expireDate:
 *           type: string
 *           format: date-time
 *         value:
 *           type: number
 *         isPercentage:
 *           type: boolean
 *         issuedAt:
 *           type: string
 *           format: date-time
 *         usedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "abcd-1234"
 *         code: "XYZ789"
 *         userId: "user123"
 *         eventId: "event123"
 *         title: "10% Discount"
 *         description: "Apply on all items"
 *         status: true
 *         startDate: "2025-06-18T00:00:00Z"
 *         expireDate: "2025-07-01T00:00:00Z"
 *         value: 10
 *         isPercentage: true
 *         issuedAt: "2025-06-18T12:00:00Z"
 *         usedAt: null
 *         createdAt: "2025-06-18T12:00:00Z"
 *         updatedAt: "2025-06-18T12:00:00Z"
 */
