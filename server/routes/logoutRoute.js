import express from 'express'

const router = express.Router();

router.get('/', async (req, res) => {
  // Auth is a stateless Bearer JWT (see server/middleware/auth.js) — there is no
  // server-side session to invalidate here. The client discards its token on logout.
  // Server-side token revocation is planned as part of the Phase 3 refresh-token rework.
  return res.send({
    message: 'Logout successful',
    success: true,
  });
})

export default router;

