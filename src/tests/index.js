import React from 'react';
import { createWeeksArray } from '../index';
import { expect } from 'chai';
const { describe, it } = global;

describe('Helper Functions', () => {
  describe('createWeeksArray', () => {
    it('should return an arrays of arrays', () => {
      const weeks = createWeeksArray(31, 0, { 1: { component: <div>First Day</div> } });
      expect(weeks).to.be.a('array');
    });
  });
});
