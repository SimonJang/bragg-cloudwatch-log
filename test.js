import test from 'ava';
import braggCloudWatchEvents from '.';

const cloudWatchLogsEvent = {
	awslogs: {
		data: 'H4sIAAAAAAAAADVQwW7CMAz9FZQzXePEiZvemNZx4jI4jaIpbQKqRFuWhqEJ8e8LY7tY1rP9/N67st5Pkz34zffJs5K9LDaLj1W1Xi+WFZuz8TL4kGApJRKBBIWU4ON4WIbxfEqT3F6m/Gj7xtnctm0ie8zXMXjbpwXBweTAc27yrTBqRygdGaG4AoPcKWvBgsNWOauFki6dT+dmakN3it04vHbH6MPEyi170FchjOGBst3vq+rLD/G+cWWdu4tVXGgFpJDzAlKjCyI0RiNKQBDECwFGoTakhBCp0QYBVfocuxRHtH1yBoq4Rik1aa3n/zH9GcqAZ9xsgEo0paAnLYr3OrZFimhP+wy9TYVTk1lpmgwbMKJwIGxr6nitmb97WD0Ya1bWLCmdZbNn62Zv/vOcJNTsVg/strv9ALIk+AuhAQAA'
	}
};

const snsRecord = {
	EventVersion: '1.0',
	EventSubscriptionArn: 'arn:aws:sns:EXAMPLE',
	EventSource: 'aws:sns',
	Sns: {
		SignatureVersion: '1',
		Timestamp: '1970-01-01T00:00:00.000Z',
		Signature: 'EXAMPLE',
		SigningCertUrl: 'EXAMPLE',
		MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
		Message: 'Hello from SNS!',
		MessageAttributes: {
			Test: {
				Type: 'String',
				Value: 'TestString'
			},
			TestBinary: {
				Type: 'Binary',
				Value: 'TestBinary'
			}
		},
		Type: 'Notification',
		UnsubscribeUrl: 'EXAMPLE',
		TopicArn: 'arn:aws:sns:EXAMPLE',
		Subject: 'TestInvoke'
	}
};

test('should process a CloudWatch Logs event', t => {
	const ctx = {
		req: cloudWatchLogsEvent,
		request: {}
	};

	braggCloudWatchEvents()(ctx);

	t.deepEqual(ctx, {
		req: {
			awslogs: {
				data: 'H4sIAAAAAAAAADVQwW7CMAz9FZQzXePEiZvemNZx4jI4jaIpbQKqRFuWhqEJ8e8LY7tY1rP9/N67st5Pkz34zffJs5K9LDaLj1W1Xi+WFZuz8TL4kGApJRKBBIWU4ON4WIbxfEqT3F6m/Gj7xtnctm0ie8zXMXjbpwXBweTAc27yrTBqRygdGaG4AoPcKWvBgsNWOauFki6dT+dmakN3it04vHbH6MPEyi170FchjOGBst3vq+rLD/G+cWWdu4tVXGgFpJDzAlKjCyI0RiNKQBDECwFGoTakhBCp0QYBVfocuxRHtH1yBoq4Rik1aa3n/zH9GcqAZ9xsgEo0paAnLYr3OrZFimhP+wy9TYVTk1lpmgwbMKJwIGxr6nitmb97WD0Ya1bWLCmdZbNn62Zv/vOcJNTsVg/strv9ALIk+AuhAQAA'
			}
		},
		request: {
			body: {
				messageType: 'DATA_MESSAGE',
				owner: '333477131547',
				logGroup: '/aws/lambda/access',
				logStream: '2019/10/09/[295]743d7925051940d5aa1a1d4c5da6253d',
				subscriptionFilters: [
					'accessErrorFilter'
				],
				logEvents: [
					{
						id: '35026517540081517687749964431412708219546975222546694145',
						timestamp: 1570643367666,
						message: '2019-10-09T17:49:27.628Z\tc8713f7f-4eaf-407b-a39b-4b1928d12ac9\t{"errorMessage":"400 - Bad Request"}\n'
					}
				]
			}
		},
		path: 'cloudwatch:log',
		method: 'post'
	});
});

test('should ignore SNS events', t => {
	const ctx = {
		req: {
			Records: [snsRecord]
		},
		request: {}
	};

	braggCloudWatchEvents()(ctx);

	t.deepEqual(ctx, {
		req: {
			Records: [snsRecord]
		},
		request: {}
	});
});
