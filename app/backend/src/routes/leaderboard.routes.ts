import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = express.Router();

leaderboardRouter.get('/away', leaderboardController.getLeaderboardAway);
leaderboardRouter.get('/home', leaderboardController.getLeaderboardHome);

export default leaderboardRouter;
