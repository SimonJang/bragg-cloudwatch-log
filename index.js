'use strict';
const zlib = require('zlib');

module.exports = () => {
	return ctx => {
		if (!ctx.path && ctx.req.awslogs && ctx.req.awslogs.data) {
			const payload = Buffer.from(ctx.req.awslogs.data, 'base64');

			const eventData = JSON.parse(zlib.unzipSync(payload).toString());

			ctx.request.body = eventData;

			Object.defineProperty(ctx, 'path', {enumerable: true, value: 'cloudwatch:log'});
			Object.defineProperty(ctx, 'method', {enumerable: true, value: 'post'});
		}
	};
};
