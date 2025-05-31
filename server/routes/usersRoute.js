import express from 'express';
import { signIn, signUp, userInfor, verifyEmail, getAllUsers, updateUser, deleteUser } from '../controllers/users.js'
import { auth } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: User
 *     description: User related operations
 */

/**
 * @openapi
 * /service/user/user-infor:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user information (need auth)
 *     responses:
 *       '200':
 *         description: User information retrieved
 *       '403':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get("/user-infor", auth, userInfor)

/**
 * @openapi
 * /service/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personal_info:
 *                 type: object
 *                 properties:
 *                   personal_id:
 *                     type: string
 *                     example: "2702342742"
 *                   name:
 *                     type: string
 *                     example: "boob"
 *                   email:
 *                     type: string
 *                     example: "boob@gmail.com"
 *                   password:
 *                     type: string
 *                     example: "Password123"
 *                   confirmPassword:
 *                     type: string
 *                     example: "Password123"
 *                   address:
 *                     type: string
 *                     example: "Jakarta"
 *                   phone_number:
 *                     type: string
 *                     example: "085959975212"
 *     responses:
 *       '200':
 *         description: New user registration successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/signup", signUp)

/**
 * @openapi
 * /service/user/signin:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personal_info:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "user@gmail.com"
 *                   password:
 *                     type: string
 *                     example: "Password123"
 *     responses:
 *       '200':
 *         description: Sign in successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/signin", signIn)

/**
 * @openapi
 * /service/user/verify:
 *   post:
 *     tags:
 *       - User
 *     summary: Verify user email with OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@gmail.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *       '400':
 *         description: Invalid or expired OTP
 *       '500':
 *         description: Internal server error
 */
router.post('/verify', verifyEmail);

/**
 * @openapi
 * /service/user/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all users
 *       '403':
 *         description: Forbidden
 */
router.get("/admin/users", auth, isAdmin, getAllUsers);

/**
 * @openapi
 * /service/user/admin/users/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update user by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       '200':
 *         description: User updated
 *       '403':
 *         description: Forbidden
 */
router.put("/admin/users/:id", auth, isAdmin, updateUser);

/**
 * @openapi
 * /service/user/admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete user by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User deleted
 *       '403':
 *         description: Forbidden
 */
router.delete("/admin/users/:id", auth, isAdmin, deleteUser);

export default router