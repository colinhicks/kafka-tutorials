"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const _path = require("path");
const yaml = require("js-yaml");
const globby = require("globby");
const read = (path) => new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, data) => err
    ? reject(err)
    : resolve(data)));
exports.yamlPaths = (dir) => globby(dir, {
    expandDirectories: {
        files: ['*'],
        extensions: ['yaml', 'yml']
    }
});
exports.pathToNs = (path, relativeDir) => {
    let { dir, name } = _path.parse(_path.relative(relativeDir, path));
    return dir
        .split(_path.sep)
        .concat(name)
        .filter((seg) => seg !== '');
};
exports.wrapNs = (data, ns = []) => {
    let obj = {};
    let target = ns.reduce((acc, k) => acc[k] = {}, obj);
    Object.assign(target, data);
    return obj;
};
exports.convertTree = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    let paths = yield exports.yamlPaths(dir);
    let objs = yield Promise.all(paths.map((path) => read(path).then((rawYaml) => {
        let ns = exports.pathToNs(path, dir);
        let data = yaml.safeLoad(rawYaml);
        return exports.wrapNs(data, ns);
    })));
    return Object.assign({}, ...objs);
});
