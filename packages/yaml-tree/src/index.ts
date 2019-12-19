import * as fs from 'fs';
import * as _path from 'path';
import * as yaml from 'js-yaml';
import * as globby from 'globby';

const read = (path: string): Promise<string> =>
    new Promise((resolve, reject) =>
        fs.readFile(path, 'utf8', (err, data) => err
            ? reject(err)
            : resolve(data)));

export const yamlPaths = (dir: string): Promise<string[]> =>
    globby(dir, {
        expandDirectories: {
            files: ['*'],
            extensions: ['yaml', 'yml']
        }
    });

export const pathToNs = (path: string, relativeDir: string): string[] => {
    let { dir, name } = _path.parse(_path.relative(relativeDir, path));
    return dir
        .split(_path.sep)
        .concat(name)
        .filter((seg) => seg !== '');
};

export const wrapNs = (data: object, ns: string[] = []): object => {
    let obj: Record<string, object> = {};
    let target = ns.reduce((acc, k) => acc[k] = {}, obj);
    Object.assign(target, data);
    return obj;
}

export const convertTree = async (dir: string): Promise<object> => {
    let paths = await yamlPaths(dir);

    let objs = await Promise.all(
        paths.map((path) => read(path).then((rawYaml) => {
            let ns = pathToNs(path, dir);
            let data = yaml.safeLoad(rawYaml);

            return wrapNs(data, ns);
        }))
    );

    return Object.assign({}, ...objs);
};
