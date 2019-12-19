"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _asciidoctor = require("@asciidoctor/core");
const asciidoctor = _asciidoctor();
const registry = asciidoctor.Extensions.create();
// pave over weird asciidoctor.js processor api
exports.processor = (cb) => function () {
    this.process(cb);
};
registry.treeProcessor('disableSourceSubs', exports.processor((doc) => {
    doc.findBy({ style: 'source' })
        .forEach((b) => b.removeSubstitution('specialcharacters'));
    return doc;
}));
exports.tutorialV1 = (str, baseDir) => {
    const doc = asciidoctor.load(str, {
        base_dir: baseDir,
        safe: 'unsafe',
        extension_registry: registry,
    });
    const [dev, test, prod] = doc
        .getSections()
        .map((section) => ({
        name: section.getName(),
        steps: section
            .getSections()
            .map((subSection) => ({
            name: subSection.getName(),
            body: subSection.getContent(),
        })),
        commands: section
            .findBy({ style: 'source' })
            .map((block) => ({
            body: block.getContent(),
            opts: block.getAttributes()
        })),
    }));
    return {
        kind: 'TutorialV1',
        dev,
        test,
        prod,
    };
};
