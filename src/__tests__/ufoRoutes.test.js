const queryUFO = require('../services/queryUFO')
const supertest = require('supertest')
const createServer = require('../utils/server')

const app = createServer()

jest.mock('../services/queryUFO')

const sampleResponse = [{
    "id": 91,
    "city": "Los Angeles",
    "state": "CA",
    "country": "USA",
    "shape": "Light",
    "reported_date": "7/29/23",
    "incident_date": "7/21/23",
    "duration": "15 Minutes",
    "summary": "10 to 15 glowing lights changing color at high altitude.",
    "images": "No"
}]

const req = {
        dateOfOccurrence: '7/21/23,7/17/23',
        country: 'USA',
        city: 'Los Angeles,Irvine,New York,Austin,Dallas,dallas,austin',
  };

describe('testing the /getUFOdata', () => {

    it('should return 200 status if the query matches formatting requirements and service returns proper response', async () => {
        queryUFO.mockResolvedValue(sampleResponse);
        const {statusCode, body} = await supertest(app).get('/getUFOdata').query(req)
        expect(statusCode).toBe(200);
        expect(body).toEqual(sampleResponse);
    })
    it('should return 200 status if there is no query being sent with the get call', async () => {
        queryUFO.mockResolvedValue(sampleResponse);
        const {statusCode, body} = await supertest(app).get('/getUFOdata')
        expect(statusCode).toBe(200);
        expect(body).toEqual(sampleResponse);
    })

    it('should return 400 status if the result of the service is an empty array', async () => {
        queryUFO.mockResolvedValue([]);
        const {statusCode, body} = await supertest(app).get('/getUFOdata').query(req)
        expect(statusCode).toBe(400);
        expect(body).toEqual({ error: "No results matching this search" });
    })

    it('should return 400 status if the format of the date is incorrect in the request', async () => {
        queryUFO.mockResolvedValue([]);
        const {statusCode, body} = await supertest(app).get('/getUFOdata').query({
            dateOfOccurrence: '7/2122/23,7/17/23',
            country: 'USA',
            city: 'Los Angeles,Irvine,New York,Austin,Dallas,dallas,austin',
        })
        expect(statusCode).toBe(400);
        expect(body).toEqual({ error: "Invalid date format." });
    })

    it('should return 500 status if queryUFO is mocked to throw an error', async () => {
        queryUFO.mockImplementation(() => {
            throw new Error('Simulated server error');
          });
        const {statusCode, body} = await supertest(app).get('/getUFOdata')
        expect(statusCode).toBe(500);
        expect(body).toEqual({  error: "Internal server error" });
    })

})