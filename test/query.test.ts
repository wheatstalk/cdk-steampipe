import { queryWithCmd, queryWithDocker } from '../src/query';

test.skip('query with docker', async () => {
  const output = await queryWithDocker('select name from aws_lambda_function');

  expect(output).toEqual(expect.arrayContaining([
    expect.objectContaining({
      name: expect.stringMatching(/.*/),
    }),
  ]));
});

test.skip('query with cmd', async () => {
  const output = await queryWithCmd('select name from aws_lambda_function');

  expect(output).toEqual(expect.arrayContaining([
    expect.objectContaining({
      name: expect.stringMatching(/.*/),
    }),
  ]));
});
