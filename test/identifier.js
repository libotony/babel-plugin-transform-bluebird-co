import Bluebird from 'bluebird';
import q from 'q';

export default [
  {
    description: 'should be injected if called built-in `Promise` in argument',
    code: `
      ((a) => a)(Promise)
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if called built-in `Promise.resolve` in argument',
    code: `
      ((a) => a)(Promise.resolve)
    `,
    expected: Bluebird.resolve,
  },
  {
    description: 'should be injected if called built-in `Promise.reject` in argument',
    code: `
      ((a) => a)(Promise.reject)
    `,
    expected: Bluebird.reject,
  },
  {
    description: 'should be injected if called built-in `Promise.all` in argument',
    code: `
      ((a) => a)(Promise.all)
    `,
    expected: Bluebird.all,
  },
  {
    description: 'should be injected if called built-in `Promise.race` in argument',
    code: `
      ((a) => a)(Promise.race)
    `,
    expected: Bluebird.race,
  },
  {
    description: 'should be injected `Promise.settle` non built-in method',
    code: 'Promise.settle',
    expected: Bluebird.settle,
  },
  {
    description: 'should not be injected in binaryExpression(instanceof)',
    code: `
      Promise.resolve() instanceof Promise
    `,
    expected: true,
  },
  {
    description: 'should not be injected in binaryExpression(===)',
    code: `
      Promise === Promise
    `,
    expected: true,
  },
  {
    description: 'should not be injected if `Promise` already imported',
    code: `
      import Promise from 'q'
      ((a) => a)(Promise)
    `,
    expected: q,
  },
];
