const core = require('@actions/core');

const runMonitor = require('./runMonitor');
const run = require('./run');


jest.mock('./runMonitor');
jest.mock('@actions/core');

const INPUT_VARIABLES = {
    'postman-api-key': 'API_KEY',
    'monitor-id': 'MONITOR_ID',
};

describe('test run', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(core, 'getInput').mockImplementation((argument) => {
            return INPUT_VARIABLES[argument];
        });
    });

    test('when everything works properly', async () => {
        const returnedStatus = "success";
        runMonitor.mockReturnValue(returnedStatus);

        await run();

        expect(runMonitor).toHaveBeenCalledWith('API_KEY', 'MONITOR_ID');
        expect(core.setOutput).toHaveBeenCalledWith('status', "success");
    });

    test('when runMonitor fails', async () => {
        runMonitor.mockImplementation(() => {
            const error = new Error('Error running the monitor');
            error.response = {
                status: 400,
                data: 'Error',
            }
            throw error;
        });

        await run();

        expect(runMonitor).toHaveBeenCalledWith('API_KEY', 'MONITOR_ID');
        expect(core.setFailed).toHaveBeenCalledWith('Error running the monitor. Error code: 400. Error body: "Error"');
    });
});

