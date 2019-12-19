export { tutorialV1 } from './adoc';
interface EleventyTemplateImpl {
    data(): Promise<object>;
    render(data: object): Promise<string>;
}
interface ParseResult<T> {
    frontMatter: object;
    tree: T;
    raw: string;
}
export declare const parse: <T>(parser: (content: string) => T, raw: string) => ParseResult<T>;
export declare const toEleventy: <T>(parser: (content: string) => T, fileName: string, dir: string, userData?: object) => EleventyTemplateImpl;
