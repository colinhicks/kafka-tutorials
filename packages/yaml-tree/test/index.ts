import { expect } from 'chai';
import { yamlPaths, pathToNs, wrapNs, convertTree } from '../src/index';

describe('site', () => {

    describe('data', () => {
        const sampleDir = 'test/resources/sample-yamls';

        it('finds yamls', (done) => {
            yamlPaths(sampleDir)
                .then((paths) => {
                    expect(paths).to.deep.equal([
                        `${sampleDir}/one.yml`,
                        `${sampleDir}/two.yaml`,
                        `${sampleDir}/sub/four.yml`,
                    ]);

                    done();
                })
                .catch((err) => done(err));
        });

        it('namespaces based on relative path and file name', () => {
            expect(pathToNs('foo/bar/baz.yml', 'foo'))
                .to.include.ordered.members(['bar', 'baz'])
                .but.not.include('foo');
        });

        it('nests object in namespace', () => {
            expect(wrapNs({ baz: { buzz: true } }, ['foo', 'bar']))
                .to.deep.equal({ foo: { bar: { baz: { buzz: true } } } });
        });

        it('resolves yamls in directory tree to namespaced js obj', (done) => {
            convertTree(sampleDir)
                .then((data) => {
                    expect(data).to.deep.equal({
                        one: { foo: ['bar'] },
                        two: { baz: 'buzz' },
                        sub: { four: { quux: true } }
                    });
                    done();
                })
                .catch((err) => done(err));

        })
    });

});
