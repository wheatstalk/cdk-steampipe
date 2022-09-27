import {
  Plugin,
  PluginHost,
  ContextProviderPlugin,
} from 'aws-cdk/lib/api/plugin';
import { CDK_STEAMPIPE_QUERY } from './constants';
import { queryWithCmd } from './query';

/**
 * An AWS CDK Plugin.
 */
export class SteampipePlugin implements Plugin {
  public readonly version = '1';

  init(host: PluginHost) {
    host.registerContextProviderAlpha(
      CDK_STEAMPIPE_QUERY,
      new SteampipeContextProviderPlugin(),
    );
  }
}

export interface SteampipeContextProviderOptions {
  /** The query to run */
  readonly query: string;
}

export class SteampipeContextProviderPlugin implements ContextProviderPlugin {
  getValue(args: SteampipeContextProviderOptions): Promise<any> {
    return queryWithCmd(args.query);
  }
}
