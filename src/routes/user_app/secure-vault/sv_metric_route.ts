import express, { Request, Response } from 'express';

const svMetricRouter = express.Router();
// Get details of the media (read metadata) and retrieve all files of an User
svMetricRouter.get('/global', async (req: Request, res: Response) => {
  res.json({ message: '' });
});

// ToDo As user won't be able to edit, these are aggregated system generated data
// Intead this should come under manage route

export default svMetricRouter;
