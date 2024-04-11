import { Request, Response } from 'express';
import { UserDao } from '../daos/user.dao';
import jwt from 'jsonwebtoken';

export default class UserController {
    private readonly DAO = new UserDao();

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.DAO.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getUserByID(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).send('User ID is invalid');
                return;
            }
            const user = await this.DAO.getUserByID(id);
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { password, username } = req.body;
            if (!password || !username) {
                res.status(400).json({ error: 'Password, Username are required' });
                return;
            }

            const user = await this.DAO.createUser(req.body);

            if (!user) {
                res.status(400).json({ error: 'User creation failed' });
                return;
            }

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET as string);

            res.json({
                ...user,
                token
            });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
