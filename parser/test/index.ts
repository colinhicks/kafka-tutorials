import { sanity } from '../src';
import { expect } from 'chai';

describe('sanity', () => {

    it('exists', () => expect(sanity()).to.equal('foo'))
})
