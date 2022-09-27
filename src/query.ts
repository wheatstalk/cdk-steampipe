import * as os from 'os';
import * as execa from 'execa';


export async function queryWithCmd(query: string) {
  const stdout = execa.sync('steampipe', [
    'query',
    '--output=json',
    query,
  ]).stdout;
  return JSON.parse(stdout);
}

export async function queryWithDocker(query: string) {
  const stdout = execa.sync('docker', [
    'run',
    '--rm',
    `--volume=${os.homedir()}/.aws:/home/steampipe/.aws:ro`,
    'steampipe',
    'query',
    '--output=json',
    query,
  ]).stdout;
  return JSON.parse(stdout);
}
