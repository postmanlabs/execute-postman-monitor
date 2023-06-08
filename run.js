const core = require('@actions/core');
const runMonitor = require('./runMonitor');


async function run() {
  try {
    const postmanApiKey = core.getInput('postman-api-key');
    const monitorId = core.getInput('monitor-id');

    core.info(`Inputs:`);
    core.info(`  monitor-id: ${monitorId}`);

    core.info(`Running monitor ...`);
    const result = await runMonitor(postmanApiKey, monitorId);

    core.setOutput('status', result);
    core.info(`Monitor result: ${result}`);
  } catch (error) {
    let message = error.message;
    if (error.response) {
      message = `${message}. Error code: ${error.response.status}. Error body: ${JSON.stringify(error.response.data)}`;
    }
    core.setFailed(message);
  }
}

module.exports = run;
