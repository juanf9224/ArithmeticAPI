import app from "../../app";
import { config } from "../../config";
import factories from "../../factories";
import { User } from "../../models";
import { Record } from "../../models/record.model";
import { getUserBalanceByUserId } from "../../services/record.service";
import request from 'supertest';

const server = app.listen();

afterAll(() => server.close());

describe('RecordController', () => {
    describe('List', () => {
        it('should get a record', async () => {
            const user = factories.user.build();
            
            const newUser = await User.query().insert(user);
            const record1 = factories.record.build({
                user_id: Number(newUser.id)
            });

            const savedRecord = await Record.query().insert(record1);

            const response = await request(server).get(`/${config.apiVersion}/records/${newUser.id}/${savedRecord.id}`);
            console.log(response.body);
            expect(response.body.id).toBe(savedRecord.id);
        })

        it('should get list of records paginated', async () => {
            const user = factories.user.build();
            
            const newUser = await User.query().insert(user);

            const user2 = factories.user.build();
            
            const newUser2 = await User.query().insert(user2);

            const record1 = factories.record.build({
                user_id: Number(newUser.id)
            });
            const record2 = factories.record.build({
                user_id: Number(newUser.id)
            });
            const record3 = factories.record.build({
                user_id: Number(newUser.id)
            });
            const record4 = factories.record.build({
                user_id: Number(newUser.id)
            });
            const record5 = factories.record.build({
                user_id: Number(newUser2.id)
            });
            const record6 = factories.record.build({
                user_id: Number(newUser2.id)
            });

            await Record.query().insert(record1);
            await Record.query().insert(record2);
            await Record.query().insert(record3);
            const lastRecord = await Record.query().insert(record4);
            await Record.query().insert(record5);
            await Record.query().insert(record6);

            const response = await request(server).get(`/${config.apiVersion}/records/${newUser.id}?page=0&itemsPerPage=2&orderBy=id&sortBy=desc`);
            expect(response.body.total).toBe(4);
            expect(response.body.results.length).toBe(2);
            expect(response.body.results[0].id).toBe(lastRecord.id);
        })
    })
});