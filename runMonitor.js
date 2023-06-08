const core = require('@actions/core');
const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const {POSTMAN_API_BASE_URL} = require('./constants');

const runMonitor = async (postmanApiKey, monitorId) => {
    const url = `${POSTMAN_API_BASE_URL}/monitors/${monitorId}/run`;
    core.info(`Executing monitor via Postman API: ${url} ...`);
    const response = await axios.post(
        url,
        {},
        getAxiosConfig(postmanApiKey),
    );
    core.debug(`Postman API POST monitor run response code: ${response.status}`);
    return response.data.run.info.status;
}

module.exports = runMonitor;
