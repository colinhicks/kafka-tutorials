import { parse } from '../src';
import { expect } from 'chai';
import { tutorialV1 } from '../src/adoc';


describe('front matter parsing', () => {

    it('extracts yaml-formatted front matter', () => {
        const { frontMatter } = parse(x => x, `---
foo: bar
baz: ['buzz']
---
quux`);
        expect(frontMatter).to.deep.equal({ foo: 'bar', baz: ['buzz'] });
    });
});

describe('tutorialV1', () => {

    it('parses doc content into data structure', () => {
        const sut = tutorialV1(`= My tutorial

== Try it

=== Set up

[source,sh,foo=bar]
----
mkdir foo && cd foo
----

=== Get

[source]
----
# docker-compose
----

=== Start

[source]
----
docker-compose up
----

== Test it

=== sub 1
[source]
----
foo()
----

=== sub 2

[source]
----
include::resources/foo.sh[]
----

== Go to prod

=== sub 1
...`, __dirname);

        const { kind, dev, test } = sut;

        expect(kind).to.equal('TutorialV1');


        it('dev', () => {
            const { steps, commands } = dev

            expect(steps.map((step) => step.name))
                .to.deep.equal(['Set up', 'Get', 'Start']);


            const [mkdirAndCd] = commands;
            // ampersands should not be converted to entities
            expect(mkdirAndCd.body).to.equal('mkdir foo && cd foo');
            expect(mkdirAndCd.opts).to.deep.equal({ language: 'sh', foo: 'bar' });
        });

        it('test', () => {
            const { commands } = test;
            const [, includedSource] = commands;
            // include should be resolved
            expect(includedSource.body).to.equal('mkdir hello && mkdir -p foo/bar');
        });

    });

});
