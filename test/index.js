/*global describe it*/
import assert from 'assert';
import { transform } from 'babel-core';
import NewExpression from './newexpression';
import MemberExpression from './memberexpression';
import Identifier from './identifier';
import RequireOrImport from './requireorimport';
import vm from 'vm';

// target
import plugin from '../src';

// environment
const options = {
  plugins: [
    'transform-es2015-modules-commonjs',
    'transform-es2015-destructuring',
    plugin
  ],
};
const vmGlobal = {
  require: (name) => require(name),
  Promise, // fix "returnValue === Promise" always false
};

// specs
describe('babel-plugin-transform-bluebird-co', () => {
  it('noop', () => {
    const result = transform('', options);
    assert(result.code === '"use strict";');
  });

  describe('NewExpression', () => {
    NewExpression.forEach((test) => {
      it(test.description, () => {
        const result = transform(test.code, options);
        const returnValue = vm.runInNewContext(result.code, vmGlobal);
        assert(returnValue instanceof test.expected);
      });
    });
  });

  describe('MemberExpression', () => {
    MemberExpression.forEach((test) => {
      it(test.description, () => {
        const result = transform(test.code, options);
        const returnValue = vm.runInNewContext(result.code, vmGlobal);
        assert(returnValue instanceof test.expected);
      });
    });
  });

  describe('Identifier', () => {
    Identifier.forEach((test) => {
      it(test.description, () => {
        const result = transform(test.code, options);
        const returnValue = vm.runInNewContext(result.code, vmGlobal);
        assert(returnValue === test.expected);
      });
    });
  });

  describe('Require Or Import', () => {
    RequireOrImport.forEach((test) => {
      it(test.description, () => {
        const result = transform(test.code, options);
        const returnValue = vm.runInNewContext(result.code, vmGlobal);
        assert(returnValue === test.expected);
      });
    });
  });
});
