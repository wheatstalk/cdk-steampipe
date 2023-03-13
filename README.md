# CDK Steampipe

Run Steampipe queries in your AWS CDK app to lookup account resources in an
idiomatic way.

> Warning: This project depends on **alpha** features in the AWS CDK.
> Please treat this project as only a proof of concept.

## Usage

First, [install Steampipe](https://steampipe.io/downloads) and Steampipe's
`aws` plugin to your environment and add `@wheatstalk/cdk-steampipe` to your
project dependencies.

Then add `@wheatstalk/cdk-steampipe/lib/plugin` to your `cdk.json` as a plugin.

```json
{
  "app": "npx ts-node bin/app.ts",
  "plugin": ["@wheatstalk/cdk-steampipe/lib/plugin"]
}
```

And in your App, use `SteampipeContextQuery.execute` to execute Steampipe
queries:

```ts
import { App, aws_ssm, Stack } from 'aws-cdk-lib';
import { SteampipeContextQuery } from '@wheatstalk/cdk-steampipe';

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
```
