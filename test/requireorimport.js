import {co} from 'bluebird-co';

export default [
  {
    description: 'should not be injected if require("co")',
    code: `
      var co = require('co');

      ((a) => a)(co);

    `,
    expected: co,
  },
  {
    description: 'should not be injected if import from "co"',
    code: `
      import co from 'co';

      ((a) => a)(co);

    `,
    expected: co,
  }
];
