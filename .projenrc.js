const { typescript } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@wheatstalk/cdk-steampipe',

  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,

  deps: [
    'execa@^4',
  ],

  peerDeps: [
    'aws-cdk',
    'aws-cdk-lib@^2.41.0',
    'aws-sdk',
    'constructs@^10',
  ],

  devDeps: [
    'esbuild',
    'esbuild-runner',
  ],
});

const ignores = [
  '/cdk.out',
  '/cdk.context.json',
];

ignores.forEach(ig => {
  project.addGitIgnore(ig);
  project.addPackageIgnore(ig);
});

project.addTask('synth', {
  exec: 'cdk synth --plugin $PWD/lib/plugin.js --app "esr test/app.ts"',
});

project.synth();