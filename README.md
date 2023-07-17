# execute-postman-monitor

> This code is part of a blog post and is **not** actively maintained by Postman.

Runs an existing Postman monitor by its ID.

You will need to add the following values to your repository:

- The `MONITOR_ID` environment variable that contains the monitor's ID.
- The `POSTMAN_API_KEY` secret that contains your valid Postman API key. The API key requires admin permissions.

## Usage

The following is an example of a pull request trigger:

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

The GitHub action will set a status output variable that contains the monitor run's results. The results will return either a `success` or `failed` status.

The monitor run is synchronous. It can take several seconds, depending on the executed collection.

## License

MIT