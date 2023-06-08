const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const runMonitor = require('./runMonitor')
const {POSTMAN_API_BASE_URL} = require('./constants');

jest.mock('axios');
jest.mock('./axiosUtils', () => {
    return {
        getAxiosConfig: jest.fn().mockReturnValue({}),
    };
});
const axiosPost = axios.post;

describe('test runMonitor', () => {
    test('calls the Postman API with the proper payload', async () => {
        axiosPost.mockResolvedValue({data: {run: {info: {status: 'success'}}}});
        const monitorStatus = await runMonitor('API_KEY', 'MONITOR_ID');
        expect(axiosPost).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledWith('API_KEY');
        expect(axiosPost).toHaveBeenCalledWith(
            `${POSTMAN_API_BASE_URL}/monitors/MONITOR_ID/run`,
            {},
            {},
        );
        expect(monitorStatus).toEqual("success")
    });
});

