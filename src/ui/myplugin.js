// const syntax = require('babel-plugin-syntax-dynamic-import')

module.exports = function({ template, types: t }) {
  const buildImport = template(`
  	Promise.resolve().then(() => nodeRequire(SOURCE))
  `)

  return {
    visitor: {
      Import(path) {
        // console.log('Called!', path)
        const newImport = buildImport({
          SOURCE: path.parentPath.node.arguments,
        })
        path.parentPath.replaceWith(newImport)
      },
    },
  }
}
