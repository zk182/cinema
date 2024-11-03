# KPIS

## Stress test over most expensive endpoint should have Failure rate < 15% with 500 concurrent requests

In order to test run

```
npm run test:stress
```

### Benchmark

```
Environment Details:
CPU: Apple M2
Cores: 8
RAM: 8.00 GB
OS: Darwin 23.5.0
Architecture: arm64
Node.js Version: v22.4.1
```

Results with 10, 100, 200 concurrent requests

```
All requests have been processed.
Average response time: 0.00 ms
Failed requests: 0
Failure rate: 0.00%
```

Results with 300 concurrent requests

```
All requests have been processed.
Average response time: 0.03 ms
Failed requests: 0
Failure rate: 0.00%
```

Results with 400 concurrent requests

```
All requests have been processed.
Average response time: 0.03 ms
Failed requests: 0
Failure rate: 0.00%
```

Results with 500 concurrent requests

```
All requests have been processed.
Average response time: 0.04 ms
Failed requests: 10
Failure rate: 2.00%
```

Results with 800 concurrent requests

```
All requests have been processed.
Average response time: 0.05 ms
Failed requests: 71
Failure rate: 8.88%
```
