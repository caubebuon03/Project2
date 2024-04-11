import client from '../database';
import { User } from '../models/user.model';
import queryContants from '../utils/queryContants';
import bcrypt from 'bcrypt';

export class UserDao {
    private async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            const conn = await client.connect();
            const result = await conn.query(query, params);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getAllUsers(): Promise<User[]> {
        return this.executeQuery(queryContants.getAllUsers);
    }

    async getUserByID(id: string): Promise<User> {
        return this.executeQuery(queryContants.getUserByID, [id]);
    }

    async createUser(user: User): Promise<User> {
        const { firstName, lastName, password, username } = user;
        const hash = bcrypt.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS ?? '10'));
        return this.executeQuery(queryContants.insertUser, [firstName, lastName, hash, username]);
    }
}
