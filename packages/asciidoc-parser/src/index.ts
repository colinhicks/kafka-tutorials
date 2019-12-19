import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';

export { tutorialV1 } from './adoc';

interface EleventyTemplateImpl {
    data(): Promise<object>;
    render(data: object): Promise<string>;
};

interface ParseResult<T> {
    frontMatter: object;
    tree: T;
    raw: string;
};

const read = (path: string): Promise<string> =>
    new Promise((resolve, reject) =>
        fs.readFile(path, 'utf8', (err, data) => err
            ? reject(err)
            : resolve(data)));

export const parse = <T>(parser: (content: string) => T, raw: string): ParseResult<T> => {
    const { data, content } = matter(raw);
    return {
        frontMatter: data,
        tree: parser(content),
        raw,
    };
};

export const toEleventy = <T>(
    parser: (content: string) => T,
    fileName: string,
    dir: string,
    userData: object = {}
): EleventyTemplateImpl => {

    const parsed = read(path.join(dir, fileName))
        .then((ret) => parse(parser, ret));

    return {
        async data() {
            const { frontMatter, tree } = await parsed;

            return {
                ...userData,
                ...frontMatter,
                tree
            };
        },

        async render(_: object) {
            const { raw } = await parsed;
            return raw;
        }
    };
};
