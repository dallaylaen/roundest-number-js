
const { expect } = require( 'chai' );
const { roundestScale } = require( '../index' );

describe( 'roundestScale', () => {
    it ('produces some results', done => {
        const scale = roundestScale(1, 10, [5, 6]);
        console.log(scale);
        expect(scale.length).to.be.within(5, 7);
        expect(scale[0]).to.be.within(1, scale[1]);

        done();
    });

    it ('produces some results', done => {
        const scale = roundestScale(2.4, 8.4, [5, 6]);
        console.log(scale);
        expect(scale.length).to.be.within(5, 7);
        expect(scale[0]).to.be.within(1, scale[1]);

        done();
    });

    it ('produces some results', done => {
        const scale = roundestScale(1.00999, 1.01022, 10);
        console.log(scale);
        expect(scale.length).to.be.within(9, 11);
        expect(scale[0]).to.be.within(1, scale[1]);

        done();
    });
})
