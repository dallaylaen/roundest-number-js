'use strict';


/**
 *
 * @param {number} min
 * @param {number} max
 * @param {number} [base]
 * @return {number}
 */
function roundestWithin (min, max, base = 10) {
    // validate, swap, diff sign, etc
    if (min === max)
        return min;
    if (min * max <= 0)
        return 0;
    // min & max are of the same sign now
    if (max < 0)
        return -roundestWithin(-max, -min, base);
    if (min > max)
        return  roundestWithin( max, min, base);

    // Assume scale := base ** power
    // Pick the smallest power such that ceil(min * scale) <= floor(max * scale)
    // (as in: min & max are separated)

    let power = -Math.floor( Math.log(max - min) / Math.log(base) );
    // base ** power should now distinguish max and min

    // decrease scale while the separation holds
    while (Math.ceil( min * base ** power ) <= Math.floor( max * base ** power ))
        power--;
    power++; // take 1 step back

    // Try to avoid precision loss in negative **, positive seems ok
    return power >= 0
        ? Math.ceil( min * base **  power ) / base **  power
        : Math.ceil( min / base ** -power ) * base ** -power;
}

function roundestScale (min, max, parts) {
    if (!Array.isArray(parts))
        parts = [parts, parts];

    const anchor = roundestWithin(min, max);
    const size = max - min;
    const step = roundestWithin(size / (parts[1]+1), size / parts[0]);

    const out = [];
    for (let point = anchor; point > min; point -= step)
        out.unshift(point);
    for (let point = anchor + step; point < max; point += step)
        out.push(point);
    return out;
}


module.exports = { roundestWithin, roundestScale };
