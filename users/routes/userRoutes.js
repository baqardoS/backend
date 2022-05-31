const express = require('express');

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  preventPasswordChange,
  becomeAdministrator
} = require('../controllers/userController');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
  authenticateUser,
} = require('../controllers/authController');

const router = express.Router();

router.get('/authenticateUser/:jwt', authenticateUser);

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', protect, logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/becomeAdministrator', protect, becomeAdministrator);
router.get('/me', protect, getMe);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router
  .route('/')
  .get(protect, restrictTo('admin'), getAllUsers)
  .post(protect, restrictTo('admin'), createUser);
router
  .route('/:id')
  .get(protect, restrictTo('admin'), getUser)
  .patch(protect, restrictTo('admin'), preventPasswordChange, updateUser)
  .delete(protect, restrictTo('admin'), deleteUser);

module.exports = router;
