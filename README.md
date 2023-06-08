# execute-postman-monitor

Executes an existing Postman monitor, given its id.


## Usage
Example of trigger on pull request.

```yaml
name: Execute Postman Monitor
on:
  pull_request:
jobs:
  execute-postman-monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Execute Postman Monitor
        id: executeMonitor
        uses: davidespihernandez/execute-postman-monitor@v1
        with:
          postman-api-key: ${{ secrets.POSTMAN_API_KEY }}
          monitor-id: ${{ vars.MONITOR_ID }}
```

For the previous example to work you need to define:
- An environment variable `MONITOR_ID` containing the monitor id to be executed.
- A secret called `POSTMAN_API_KEY` containing the Postman API key with admin permission on the monitor that is going to be executed.

The action sets a `status` output variable with the monitor execution result, which will contain either `success` or `failed`.
The monitor execution is synchronous, take this into account as it can take several seconds, depending on the executed collection.

## License

MIT

