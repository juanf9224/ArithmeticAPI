import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import factories from "../../factories";
import { Operation, User } from "../../models";
import { config } from '../../config';
import { OperationType } from '../../constants/operation.constant';
import { Status } from '../../constants/user.constant';
import fetchMock from 'fetch-mock';

const server = app.listen();

afterAll(() => server.close());

describe('OperationController', () => {
    describe('calculate', () => {
        test('should calculate addition operation', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.ADDITION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 5020.65,
                valueB: 325720.55
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.ADDITION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBe(data.valueA + data.valueB);
        });
        test('should calculate substraction operation', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.SUBSTRACTION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 5000,
                valueB: 1000
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.SUBSTRACTION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBe(data.valueA - data.valueB);
        });
        test('should calculate multiplication operation', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.MULTIPLICATION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 10,
                valueB: 100
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.MULTIPLICATION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBe(data.valueA * data.valueB);
        });
        test('should calculate division operation', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.DIVISION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 150,
                valueB: 15
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.DIVISION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBe(data.valueA / data.valueB);
        });
        test('should calculate square root operation', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.SQUARE_ROOT,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 80
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.SQUARE_ROOT,
                data
            });
    
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBe(Math.sqrt(data.valueA));
        });
        test('should calculate random string operation', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.RANDOM_STRING,
            });
            await Operation.query().insert(operation);

            const data = {
                valueA : 12
            };
            
            const mockedGeneratedString = 'MDc6TGljZW5z';
            fetchMock.get(
                `${config.randomApi}/strings/?num=1&len=${data.valueA}&digits=on&upperalpha=on&loweralpha=on&unique=off&format=plain&rnd=new`,
                mockedGeneratedString
            )

            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.RANDOM_STRING,
                data
            });
    
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.data).toBe(mockedGeneratedString);
            expect(response.body.data.length).toBe(data.valueA);
        });
    })

    describe('Calculate errors', () => {
        test('should fail to calculate addition operation when missing valueB', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.ADDITION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 5020.65,
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.ADDITION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });
        test('should fail to calculate substraction operation when missing valueB', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.SUBSTRACTION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 5020.65,
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.SUBSTRACTION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });
        test('should fail to calculate multiplication operation when missing valueB', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.MULTIPLICATION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 5020.65,
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.MULTIPLICATION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });
        test('should fail to calculate division operation when missing valueB', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.DIVISION,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 5020.65,
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.DIVISION,
                data
            });
    
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });
        test('should fail to calculate square root operation when missing valueA', async () => {
            const user = factories.user.build({
                status: Status.ACTIVE
            });
            const dbUser = await User.query().insert(user);
            
            const operation = factories.operation.build({
                type: OperationType.SQUARE_ROOT,
            });
            await Operation.query().insert(operation);
    
            const data = {
                valueA: 0,
            };
            const response = await request(server).post(`/${config.apiVersion}/calculate/${dbUser.id}`).send({
                type: OperationType.SQUARE_ROOT,
                data
            });
    
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });
    })
});