"use strict"

module.exports = function (acorn) {
  const tt = acorn.tokTypes

  acorn.plugins.optionalCatchBinding = function (instance) {
    instance.extend("parseTryStatement", function (_superF) {
      return function(node) {
        this.next()
        node.block = this.parseBlock()
        node.handler = null
        if (this.type === tt._catch) {
          let clause = this.startNode()
          this.next()
          if (this.eat(tt.parenL)) {
            clause.param = this.parseBindingAtom()
            this.enterLexicalScope()
            this.checkLVal(clause.param, "let")
            this.expect(tt.parenR)
          } else {
            clause.param = null
            this.enterLexicalScope()
          }
          clause.body = this.parseBlock(false)
          this.exitLexicalScope()
          node.handler = this.finishNode(clause, "CatchClause")
        }
        node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null
        if (!node.handler && !node.finalizer) {
          this.raise(node.start, "Missing catch or finally clause")
        }
        return this.finishNode(node, "TryStatement")
      }
    })
  }
  return acorn
}
