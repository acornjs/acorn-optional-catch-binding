"use strict"

const assert = require("assert")
const acorn = require("..")

function test(text, expectedResult, additionalOptions) {
  it(text, function () {
    const result = acorn.parse(text, Object.assign({ ecmaVersion: 9, plugins: { optionalCatchBinding: true } }, additionalOptions))
    assert.deepEqual(result, expectedResult)
  })
}
function testFail(text, expectedError, additionalOptions) {
  it(text, function () {
    let failed = false
    try {
      acorn.parse(text, Object.assign({ ecmaVersion: 9, plugins: { optionalCatchBinding: true } }, additionalOptions))
    } catch (e) {
      assert.equal(e.message, expectedError)
      failed = true
    }
    assert(failed)
  })
}

describe("acorn-optional-catch-binding", function () {
  test("try {} catch {}", {
    type: "Program",
    start: 0,
    end: 15,
    body: [
      {
        type: "TryStatement",
        start: 0,
        end: 15,
        block: {
          type: "BlockStatement",
          start: 4,
          end: 6,
          body: []
        },
        handler: {
          type: "CatchClause",
          start: 7,
          end: 15,
          param: null,
          body: {
            type: "BlockStatement",
            start: 13,
            end: 15,
            body: []
          }
        },
        finalizer: null
      }
    ],
    sourceType: "script"
  })
  const content = [
  ]
  const statements = [
  ]
  statements.forEach(statement => {
    const start = statement.s.indexOf("%s")
    content.forEach(c => {
      (c.error ? testFail : test)(
        statement.s.replace("%s", `${c.text}n`),
        c.error ? c.error(start) : statement.ast(c.ast(start))
      )
    })
  })
})
