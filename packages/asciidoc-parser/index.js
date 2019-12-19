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
const path = require("path");
const matter = require("gray-matter");
var adoc_1 = require("./adoc");
exports.tutorialV1 = adoc_1.tutorialV1;
;
;
const read = (path) => new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, data) => err
    ? reject(err)
    : resolve(data)));
exports.parse = (parser, raw) => {
    const { data, content } = matter(raw);
    return {
        frontMatter: data,
        tree: parser(content),
        raw,
    };
};
exports.toEleventy = (parser, fileName, dir, userData = {}) => {
    const parsed = read(path.join(dir, fileName))
        .then((ret) => exports.parse(parser, ret));
    return {
        data() {
            return __awaiter(this, void 0, void 0, function* () {
                const { frontMatter, tree } = yield parsed;
                return Object.assign(Object.assign(Object.assign({}, userData), frontMatter), { tree });
            });
        },
        render(_) {
            return __awaiter(this, void 0, void 0, function* () {
                const { raw } = yield parsed;
                return raw;
            });
        }
    };
};
