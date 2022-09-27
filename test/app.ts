import { App, aws_ssm, Stack } from 'aws-cdk-lib';
import { SteampipeContextQuery } from '../src';

const app = new App();

const stack = new Stack(app, 'MyStack', {
  // Provide environment information.
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// Run a Steampipe query. This query will run only once and store its result
// in the cdk.context.json so that your CDK app can remain deterministic.
const rows = SteampipeContextQuery.execute(stack, 'Query', 'select name from aws_lambda_function');

// Note: The CDK Plugin API doesn't currently allow you to use the CDK CLI's
// credentials, so Steampipe will try to find credentials its own way.

// Use the value returned from the query programmatically:
rows.forEach((row, i) => {
  // Do something with each row.
  new aws_ssm.StringParameter(stack, `Lambda${i}Name`, {
    stringValue: row.name,
  });
});

app.synth();