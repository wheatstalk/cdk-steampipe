import { ContextProvider } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDK_STEAMPIPE_QUERY } from './constants';

export interface SteampipeContextQueryProps {
  /**
   * Run this Steampipe query.
   * @example `select name from aws_lambda_function `
   */
  readonly query: string;
}

/**
 * Provides the results of a Steampipe query.
 */
export class SteampipeContextQuery extends Construct {
  /**
   * Execute a Steampipe query and return the results.
   */
  public static execute(scope: Construct, id: string, query: string): Record<string, any>[] {
    const { value } = new SteampipeContextQuery(scope, id, { query });
    return value;
  }

  public readonly value: Record<string, any>[];

  constructor(scope: Construct, id: string, props: SteampipeContextQueryProps) {
    super(scope, id);

    const res = ContextProvider.getValue(this, {
      provider: 'plugin',
      props: {
        pluginName: CDK_STEAMPIPE_QUERY,
        query: props.query,
      },
      dummyValue: [],
    });

    if (!Array.isArray(res.value)) {
      throw new Error('Context provided an unexpected value.');
    }

    this.value = res.value;
  }
}
