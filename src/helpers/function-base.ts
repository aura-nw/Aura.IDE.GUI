var esprima = require('esprima')

export class FunctionBase {
  static findDeclarations(code: any) {
    var ast = esprima.parse(code)

    var funcDecls: any = []
    var globalVarDecls: any = []
    var funcStack: any = []
    function visitEachAstNode(root: any, enter: any, leave: any) {
      function visit(node: any) {
        function isSubNode(key: any) {
          var child = node[key]
          if (child === null) return false
          var ty = typeof child
          if (ty !== 'object') return false
          if (child.constructor === Array) return key !== 'range'
          if (key === 'loc') return false
          if ('type' in child) {
            if (child.type in esprima.Syntax) return true
            debugger
            throw new Error('unexpected')
          } else {
            return false
          }
        }
        enter(node)
        var keys = Object.keys(node)
        var subNodeKeys = keys.filter(isSubNode)
        for (var i = 0; i < subNodeKeys.length; i++) {
          var key = subNodeKeys[i]
          visit(node[key])
        }
        leave(node)
      }
      visit(root)
    }
    function myEnter(node: any) {
      if (node.type === 'FunctionDeclaration') {
        var current = {
          name: node.id.name,
          params: node.params.map(function (p: any) {
            return p.name
          }),
          variables: [],
        }
        funcDecls.push(current)
        funcStack.push(current)
      }
      if (node.type === 'VariableDeclaration') {
        var foundVarNames = node.declarations.map(function (d: any) {
          return d.id.name
        })
        if (funcStack.length === 0) {
          globalVarDecls = globalVarDecls.concat(foundVarNames)
        } else {
          var onTopOfStack = funcStack[funcStack.length - 1]
          onTopOfStack.variables = onTopOfStack.variables.concat(foundVarNames)
        }
      }
    }
    function myLeave(node: any) {
      if (node.type === 'FunctionDeclaration') {
        funcStack.pop()
      }
    }
    visitEachAstNode(ast, myEnter, myLeave)
    return {
      vars: globalVarDecls,
      funcs: funcDecls,
    }
  }
}
