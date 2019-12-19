const { toEleventy, tutorialV1 } = require('@kafka-tutorials/asciidoc-parser');

module.exports = toEleventy(tutorialV1, 'test.adoc', __dirname);
