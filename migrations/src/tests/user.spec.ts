import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../server';
import { UserDao } from "../daos/user.dao";
import { User } from '../models/user.model';

const DAO = new UserDao();
const authToken =  jwt.sign({ id: 1, username: "name" }, process.env.TOKEN_SECRET as string);;

const request = supertest(app);

describe('Test User DAO', () => {
    it('test get all users', () => {
        expect(DAO.getAllUsers).toBeDefined();
    });

    it('test get user by ID', () => {
        expect(DAO.getUserByID).toBeDefined();
    });

    it('create new user', () => {
        expect(DAO.createUser).toBeDefined();
    });
});

describe('Test Controller and Route', function () {
    
    it('test user successfully', () => {
        const data = {
            id: 1,
            firstName: "aaa",
            lastName: "bbb",
            password: "ccc",
            username: "ddd"
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                id: 1,
                firstName: "aaa",
                lastName: "bbb",
                username: "ddd"
        })
    })

    it('test create user fail 1', () => {
        const data = {
            id: 1,
            firstName: "aaa",
            lastName: "bbb",
            password: "ccc",
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'Password, Username are required',
        })
    })

    it('test create order fail 2', () => {
        const data = {
            id: 1,
            firstName: "aaa",
            lastName: "bbb",
            username: "ddd"
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'Password, Username are required',
        })
    })

    it('test get user by ID', () => {
        spyOn(UserDao.prototype, 'getUserByID').and.returnValue(
            Promise.resolve({
                id: 1,
                firstName: "aaa",
                lastName: "bbb",
                password: "ccc",
                username: "ddd"
              } as unknown as User)
          );
        request
            .get('/api/users/1')
            .set('Authorization', `Bearer ${authToken}`)
            .expect({
                id: 1,
                firstName: "aaa",
                lastName: "bbb",
                password: "ccc",
                username: "ddd"
            });
    })

    it('test get all products', () => {
        const data = [
            {
                id: 1,
                firstName: "aaa",
                lastName: "bbb",
                password: "ccc",
                username: "ddd"
            },
            {
                id: 2,
                firstName: "a22",
                lastName: "b22",
                password: "c22",
                username: "d22"
            },
        ];
        spyOn(UserDao.prototype, 'getAllUsers').and.returnValue(
            Promise.resolve(data as unknown as User[])
        );
        request
            .get('/api/users')
            .expect([
                {
                    id: 1,
                    firstName: "aaa",
                    lastName: "bbb",
                    password: "ccc",
                    username: "ddd"
                },
                {
                    id: 2,
                    firstName: "a22",
                    lastName: "b22",
                    password: "c22",
                    username: "d22"
                },
        ])
    }) 
  })