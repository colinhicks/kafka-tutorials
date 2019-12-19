/// <reference types="@asciidoctor" />
export declare const processor: <T extends AbstractBlock>(cb: (doc: T) => T) => ProcessorImpl;
interface Template {
    kind: string;
}
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
export declare const tutorialV1: (str: string, baseDir?: string | undefined) => TutorialV1;
export {};
