import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../server';
import { ProductDao } from "../daos/products.dao";
import { Product } from '../models/products.model';

const DAO = new ProductDao();
const authToken =  jwt.sign({ id: 1, username: "name" }, process.env.TOKEN_SECRET as string);;

const request = supertest(app);

describe('Test Product DAO', () => {
    it('test get all products', () => {
        expect(DAO.getAllProducts).toBeDefined();
    });

    it('test get product by ID', () => {
        expect(DAO.getProductByID).toBeDefined();
    });

    it('create new product', () => {
        expect(DAO.createProduct).toBeDefined();
    });

    it('delete product', () => {
        expect(DAO.deleteProduct).toBeDefined();
    });
});

describe('Test Controller and Route', function () {
    
    it('test create product successfully', () => {
        const data = {
            productId: 1,
            name: "duy",
            price: 200
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                name: "duy",
                price: 200
        })
    })

    it('test create product fail 1', () => {
        const data = {
            name: "duy"
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'Name, Price are required',
        })
    })

    it('test create product fail 2', () => {
        const data = {
            price: 200
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'Name, Price are required',
        })
    })

    it('test get product by ID', () => {
        spyOn(ProductDao.prototype, 'getProductByID').and.returnValue(
            Promise.resolve({
                id: 1,
                name: "duy",
                price: 200
              } as unknown as Product)
          );
        request
            .get('/api/products/1')
            .expect({
                id: 1,
                name: "duy",
                price: 200
            });
    })

    it('test get all products', () => {
        const data = [
            {
                id: 1,
                name: "duy",
                price: 200
            },
            {
                id: 2,
                name: "duynq17",
                price: 100
            },
        ];
        spyOn(ProductDao.prototype, 'getAllProducts').and.returnValue(
            Promise.resolve(data as unknown as Product[])
        );
        request
            .get('/api/products')
            .expect([
                {
                    id: 1,
                    name: "duy",
                    price: 200
                },
                {
                    id: 2,
                    name: "duynq17",
                    price: 100
                },
        ])
    })


    it('test delete product', () => {
        spyOn(ProductDao.prototype, 'createProduct').and.returnValue(
            Promise.resolve(
                {
                    id: 1,
                    name: "duy",
                    price: 200
                } as unknown as Product)
          );
        request
            .delete('/api/products/1')
            .set('Authorization', `Bearer ${authToken}`)
            .expect({
                id: 1,
                name: "duy",
                price: 200
            })
    })  
  })
