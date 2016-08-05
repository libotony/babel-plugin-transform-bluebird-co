// target Promise co

export default (babel) => {
  return ({
    visitor: {
      Program: {
        enter(path, file) {
          file.UNUSE_BLUEBIRD = false;
          for (const node of path.node.body) {
            // found "import Promise"
            const specifiers = node.specifiers || [];
            const localNames = specifiers.map((specifier) => specifier.local.name);
            if (localNames.indexOf('Promise') > -1) {
              file.UNUSE_BLUEBIRD = true;
              return;
            }

            // found "var Promise"
            const declarations = node.declarations || [];
            const declarationIds = declarations.map((declaration) => declaration.id.name);
            if (declarationIds.indexOf('Promise') > -1) {
              file.UNUSE_BLUEBIRD = true;
              return;
            }
          }
        },
      },

      ImportDeclaration(path){
        if(path.node.source.value === 'co'){
          const {
            importDeclaration,
            importSpecifier,
            identifier,
            stringLiteral
          } = babel.types;
          path.replaceWith(importDeclaration([importSpecifier(identifier(path.node.specifiers.length?path.node.specifiers[0].local.name:'co'),identifier('co'))],stringLiteral('bluebird-co')));
        }
      },

      // found "new Promise"
      NewExpression(path, file) {
        if (!file.UNUSE_BLUEBIRD) {
          if (path.get('callee').node.name === 'Promise') {
            path.node.callee = file.addImport('bluebird', 'default', 'Promise');
          }
        }
      },

      // found "foo BinaryExpression Promise(BinaryExpression stands for +-*/%instanceof= etc)"
      // found "Promise()"
      Identifier(path, file) {
        if (!file.UNUSE_BLUEBIRD) {
          if (path.node.name === 'Promise') {
            if(path.parentPath.isBinaryExpression()||path.parentPath.isCallExpression()){
              path.replaceWith(file.addImport('bluebird', 'default', 'Promise'));
            }
          }
        }
      },

      // found "Promise.methods"
      MemberExpression(path, file) {
        if (!file.UNUSE_BLUEBIRD) {
          if(path.node.object.name === 'Promise'){
            const bluebird = file.addImport('bluebird', 'default', 'Promise');
            const {
              memberExpression,
              identifier,
            } = babel.types;
            path.replaceWith(memberExpression(bluebird, identifier(path.node.property.name)));
          }
        }
      },

      // found "var xx = require('xx')"
      VariableDeclarator(path){
        if(path.node.init.type === 'CallExpression'&& path.node.init.callee.name === 'require' && path.node.init.arguments.length && path.node.init.arguments[0].value == 'co'){
          const {
            memberExpression,
            callExpression,
            identifier,
            variableDeclarator,
            stringLiteral
          } = babel.types;
          path.replaceWith(variableDeclarator(identifier(path.node.id.name),memberExpression(callExpression(identifier('require'),[stringLiteral('bluebird-co')]),identifier('co'))));
        }
      }
    },
  });
};
