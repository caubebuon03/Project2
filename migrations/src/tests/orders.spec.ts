import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../server';
import { OrderDao } from "../daos/orders.dao";
import { Order } from '../models/orders.model';

const OderDAO = new OrderDao();
const authToken =  jwt.sign({ id: 1, username: "name" }, process.env.TOKEN_SECRET as string);;

const request = supertest(app);

describe('Test Order DAO', () => {
    it('test get completed order by user ID', () => {
        expect(OderDAO.getCompletedOrderByUser).toBeDefined();
    });

    it('test get orders by user ID', () => {
        expect(OderDAO.getAllOrdersByUser).toBeDefined();
    });

    it('create new order', () => {
        expect(OderDAO.createOrder).toBeDefined();
    });

    it('create new order product', () => {
        expect(OderDAO.addProductToOrder).toBeDefined();
    });

    it('get active order by user ID', () => {
        expect(OderDAO.getActiveOrderByUser).toBeDefined();
    })

    it('get current order by user ID', () => {
        expect(OderDAO.getCurrentOrderByUser).toBeDefined();
    });

    it('delete order', () => {
        expect(OderDAO.deleteOrderProduct).toBeDefined();
    });
});

describe('Test Controller and Route', function () {
    
    it('test create order successfully', () => {
        const data = {
            userId: 1,
            status: 'new',
            quantity: 200
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                id: 1,
                userId: 1,
                status: 'new',
                quantity: 200
        })
    })

    it('test add Order Product successfully', () => {
        const data = {
            orderId: 3,
            productId: 2,
            quantity: 200
        }
        request
            .post('/api/orders/add-product/1')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                id: 1,
                orderId: 3,
                productId: 2,
                quantity: 200
        })
    })

    it('test create order fail 1', () => {
        const data = {
            userId: 1
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'UserID, Status are required',
        })
    })

    it('test create order fail 2', () => {
        const data = {
            status: "new"
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'UserID, Status are required',
        })
    })

    it('test create order fail 3', () => {
        const data = {
            productId: 1
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'UserID, Status are required',
        })
    })

    it('test add Order Product fail', () => {
        const data = {
            orderId: 3
        }
        request
            .post('/api/orders/add-product/1')
            .set('Authorization', `Bearer ${authToken}`)
            .send(data)
            .expect({
                error: 'OrderID, ProductID, Quantity are required',
        })
    })

    it('test get completed order by user', () => {
        const data = [
            {
              id: 1,
              productId: 2,
              userId: 1,
              quantity: 1,
              status: 'completed',
            },
            {
              id: 2,
              productId: 10,
              userId: 1,
              quantity: 10,
              status: 'completed',
            },
        ];
        spyOn(OrderDao.prototype, 'getCompletedOrderByUser').and.returnValue(
            Promise.resolve(data as unknown as Order[])
          );
        request
            .get('/api/orders/complete?userId=1')
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                  id: 1,
                  productId: 2,
                  userId: 1,
                  quantity: 1,
                  status: 'completed',
                },
                {
                  id: 2,
                  productId: 10,
                  userId: 1,
                  quantity: 10,
                  status: 'completed',
                },
            ]);
    })

    it('test get active order by user', () => {
        const data = [
            {
              id: 1,
              productId: 1,
              userId: 1,
              quantity: 20,
              status: 'new',
            },
            {
              id: 2,
              productId: 2,
              userId: 1,
              quantity: 10,
              status: 'new',
            },
        ];
        spyOn(OrderDao.prototype, 'getActiveOrderByUser').and.returnValue(
            Promise.resolve(data as unknown as Order[])
        );
        request
            .get('/api/orders/active/1')
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect([
                {
                  id: 1,
                  productId: 1,
                  userId: 2,
                  quantity: 20,
                  status: 'new',
                },
                {
                  id: 2,
                  productId: 2,
                  userId: 1,
                  quantity: 10,
                  status: 'new',
                },
        ])
    })

    it('test get current order by user', () => {
        const data = [
            {
              id: 1,
              productId: 1,
              userId: 1,
              quantity: 20,
              status: 'in-progress',
            },
            {
              id: 2,
              productId: 2,
              userId: 1,
              quantity: 10,
              status: 'in-progress',
            }
        ];
        spyOn(OrderDao.prototype, 'getCurrentOrderByUser').and.returnValue(
            Promise.resolve(data as unknown as Order[])
        );
        request
            .get('/api/orders/current/1')
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect([
                {
                    id: 1,
                    productId: 1,
                    userId: 1,
                    quantity: 20,
                    status: 'in-progress',
                  },
                  {
                    id: 2,
                    productId: 2,
                    userId: 1,
                    quantity: 10,
                    status: 'in-progress',
                  },
        ])
    })

    it('test get all order by user', () => {
        const data = [
            {
              id: 1,
              productId: 1,
              userId: 1,
              quantity: 20,
              status: 'in-progress',
            },
            {
              id: 2,
              productId: 2,
              userId: 1,
              quantity: 10,
              status: 'new',
            }
        ];
        spyOn(OrderDao.prototype, 'getAllOrdersByUser').and.returnValue(
            Promise.resolve(data as unknown as Order[])
        );
        request
            .get('/api/orders')
            .set('Authorization', `Bearer ${authToken}`)
            .expect([
                {
                    id: 1,
                    productId: 1,
                    userId: 1,
                    quantity: 20,
                    status: 'in-progress',
                  },
                  {
                    id: 2,
                    productId: 2,
                    userId: 1,
                    quantity: 10,
                    status: 'new',
                  },
        ])
    })

    it('test delete order', () => {
        spyOn(OrderDao.prototype, 'createOrder').and.returnValue(
            Promise.resolve({
              id: 1,
              productId: 10,
              quantity: 2,
              userId: 1,
              status: 'new'
            } as unknown as Order)
          );
        request
            .delete('/api/orders/1')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .expect({
                id: 1,
                productId: 10,
                quantity: 2,
                userId: 1,
                status: 'new'
            })
    })
    
})
