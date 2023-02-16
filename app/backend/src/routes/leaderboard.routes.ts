import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', leaderboardController.getLeaderboardHome);
leaderboardRouter.get('/away', leaderboardController.getLeaderboardAway);

export default leaderboardRouter;
