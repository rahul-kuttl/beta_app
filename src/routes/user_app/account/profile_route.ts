import express, { Request, Response } from 'express';
import { getUserDetails } from '../../../controllers/user_controller';

const profileRouter = express.Router();

// Get user details
profileRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userDetails = await getUserDetails(req.params.userId);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Error handling middleware, placed after all routes
profileRouter.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err); // Added to log the error details
  res.status(500).send({ error: 'User/Account_API: Internal Server Error' }); // Send JSON response
});

export default profileRouter;
