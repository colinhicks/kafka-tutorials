import _asciidoctor = require('@asciidoctor/core');
const asciidoctor = _asciidoctor();
const registry = asciidoctor.Extensions.create();

// pave over weird asciidoctor.js processor api
export const processor = <T extends AbstractBlock>(
    cb: (doc: T) => T
): ProcessorImpl => function() {
    this.process(cb);
};

registry.treeProcessor('disableSourceSubs', processor((doc) => {
    doc.findBy({ style: 'source' })
        .forEach((b) => b.removeSubstitution('specialcharacters'));
    return doc;
}));

interface Template { kind: string }
interface TutorialV1 extends Template {
    dev: TutorialV1Phase;
    test: TutorialV1Phase;
    prod: TutorialV1Phase;
}

interface TutorialV1Step {
    name: string;
    body: string;
}


interface TutorialV1Command {
    opts: object;
    body: string;
}

interface TutorialV1Phase {
    name: string;
    steps: TutorialV1Step[];
    commands: TutorialV1Command[];
}

export const tutorialV1 = (
    str: string,
    baseDir?: string,
): TutorialV1 => {
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
}
