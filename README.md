# bragg-cloudwatch-log [![Build Status](https://travis-ci.org/SimonJang/bragg-cloudwatch-log.svg?branch=master)](https://travis-ci.org/SimonJang/bragg-cloudwatch-log)

> [bragg](https://github.com/SamVerschueren/bragg) Bragg middleware to process [CloudWatch Logs events](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchlogs.html)


## Install

```
$ npm install bragg-cloudwatch-log
```

## Usage

All the events will be routed to `post` `cloudwatch:log`. You can use that route to handle the CloudWatch log events.

```js
const app = require('bragg')();
const router = require('bragg-router')();
const cloudWatchLog = require('bragg-cloudwatch-log');

// Listen for CloudWatch Log events
router.post('cloudwatch:log', ctx => {
	/**
	 * {
	 *		"messageType": "DATA_MESSAGE",
	 *		"owner": "123456789012",
	 *		"logGroup": "/aws/lambda/echo-nodejs",
	 *		"logStream": "2019/03/13/[$LATEST]94fa867e5374431291a7fc14e2f56ae7",
	 *		"subscriptionFilters": [
	 *			"LambdaStream_cloudwatchlogs-node"
	 *		],
	 *		"logEvents": [
	 *			{
	 *				"id": "34622316099697884706540976068822859012661220141643892546",
	 *				"timestamp": 1552518348220,
	 *				"message": "REPORT RequestId: 6234bffe-149a-b642-81ff-2e8e376d8aff\tDuration: 46.84 ms\tBilled Duration: 100 ms \tMemory Size: 192 MB\tMax Memory Used: 72 MB\t\n"
	 *			}
	 *		]
	 *	}
	 */
    console.log(ctx.request.body)
});

app.use(cloudWatchLog());
app.use(router.routes());

exports.handler = app.listen();
```

## API

### cloudWatchLog()

Add the bragg CloudWatch Log middleware to the middleware pipeline.

## License

MIT © [Simon](https://github.com/SimonJang)
