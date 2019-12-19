const { convertTree } = require('@kafka-tutorials/yaml-tree')

module.exports = () => convertTree(__dirname);
