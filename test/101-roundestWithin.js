
const { expect } = require('chai');
const { roundestWithin } = require('../index');

describe('roundestWithin', function () {
    const cases = [
        [-1, 2, 0],
        [0, 100, 0],

        [1, 2, 1],
        [1.9, 2, 2],
        [-1.1, -0.9, -1],
        [1.08, 1.11, 1.1],
        [2.9999, 3.0001, 3],

        [79, 131, 100],
        [799, 801, 800],

        [2, 5, 2],
        [6, 9, 6],
    ];

    for (const [a, b, expected] of cases) {
        it(`finds ${expected} in [${a}, ${b}]`, done => {
            const res = roundestWithin(a, b);
            console.log([a, b], '->', res);
            expect(res).to.be.within(a, b);
            expect(('' + res).replace(/0+$/, '').length)
                .to.be.within(0, Math.min(('' + a).length, ('' + b).length));
            expect(res).to.equal(expected);
            done();
        });
    }
});
