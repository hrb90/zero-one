const { computeObjective } = require('../src/util');


const SMALL_EXACT = solver => test('solves a small exact decision problem', () => {
  /*
  a + b = 1
  a + c + d = 2
  b + d = 1
  */
  let vars = [ { id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' } ];
  let constraints = [
    { variables: { a: 1, b: 1 }, type: 'eq', value: 1 },
    { variables: { a: 1, c: 1, d: 1 }, type: 'eq', value: 2 },
    { variables: { b: 1, d: 1 }, type: 'eq', value: 1 }
  ];

  let solution = solver(vars, constraints, null, {});
  expect(solution.a).toBeTruthy();
  expect(solution.b).toBeFalsy();
  expect(solution.c).toBeFalsy();
  expect(solution.d).toBeTruthy();
});

const THREE_COLOR_K4 = solver => test('correctly finds no solution to a small SAT instance', () => {
  // Tries to find a 3-coloring of the complete graph on 4 vertices.
  // The first letter of the variable name represents the vertex, and the second represents the color.

  let vars = [{ id: 'ar' }, { id: 'ag' }, { id: 'ab' },
              { id: 'br' }, { id: 'bg' }, { id: 'bb' },
              { id: 'cr' }, { id: 'cg' }, { id: 'cb' },
              { id: 'dr' }, { id: 'dg' }, { id: 'db' }];

  let constraints = [
    { variables: { ar: 1, ag: 1, ab: 1 }, type: 'min', value: 1 },
    { variables: { br: 1, bg: 1, bb: 1 }, type: 'min', value: 1 },
    { variables: { cr: 1, cg: 1, cb: 1 }, type: 'min', value: 1 },
    { variables: { dr: 1, dg: 1, db: 1 }, type: 'min', value: 1 },
    { variables: { ar: 1, br: 1 }, type: 'max', value: 1 },
    { variables: { ar: 1, cr: 1 }, type: 'max', value: 1 },
    { variables: { ar: 1, dr: 1 }, type: 'max', value: 1 },
    { variables: { br: 1, cr: 1 }, type: 'max', value: 1 },
    { variables: { br: 1, dr: 1 }, type: 'max', value: 1 },
    { variables: { cr: 1, dr: 1 }, type: 'max', value: 1 },
    { variables: { ag: 1, bg: 1 }, type: 'max', value: 1 },
    { variables: { ag: 1, cg: 1 }, type: 'max', value: 1 },
    { variables: { ag: 1, dg: 1 }, type: 'max', value: 1 },
    { variables: { bg: 1, cg: 1 }, type: 'max', value: 1 },
    { variables: { bg: 1, dg: 1 }, type: 'max', value: 1 },
    { variables: { cg: 1, dg: 1 }, type: 'max', value: 1 },
    { variables: { ab: 1, bb: 1 }, type: 'max', value: 1 },
    { variables: { ab: 1, cb: 1 }, type: 'max', value: 1 },
    { variables: { ab: 1, db: 1 }, type: 'max', value: 1 },
    { variables: { bb: 1, cb: 1 }, type: 'max', value: 1 },
    { variables: { bb: 1, db: 1 }, type: 'max', value: 1 },
    { variables: { cb: 1, db: 1 }, type: 'max', value: 1 }
  ];

  let solution = solver(vars, constraints, null, {});

  expect(solution).toBeFalsy();
});

const SMALL_OPT = solver => test('solves a small optimization problem', () => {
  // Maximize 2a + 2b - 5c + 3d + e - f + 5g + h + i
  // Subject to
  // 2a + 2b - 3c <= 2
  // 2d + 2e - 3f <= 2
  // 2g + 2h - 3i <= 2
  // a + b + d + e + g + h <= 2
  let vars = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' },
              { id: 'f' }, { id: 'g' }, { id: 'h' }, { id: 'i' }];

  let constraints = [
    { variables: { a: 2, b: 2, c: -3}, type: "max", value: 2 },
    { variables: { d: 2, e: 2, f: -3}, type: "max", value: 2 },
    { variables: { g: 2, h: 2, i: -3}, type: "max", value: 2 },
    { variables: { a: 1, b: 1, d: 1, e: 1, g: 1, h: 1}, type: "max", value: 2 }
  ];

  let objective = {
    variables: { a: 2, b: 2, c: -5, d: 3, e: 1, f: -1, g: 5, h: 1, i: 1},
    type: "max"
  };

  let solution = solver(vars, constraints, objective, {});

  expect(computeObjective(objective.variables, solution)).toBe(9);
});

// 30 variables, 55 constraints
const THREE_COLOR_PETERSEN = solver => test('three-colors the Petersen graph', () => {
  let vars = [ { id: 'xmstwdoozswzyyzaor' },
  { id: 'mnmhgowleecwsgewmogvi' },
  { id: 'mxdpqaesczkjonfypsyvi' },
  { id: 'evunttopwcgqjqjjor' },
  { id: 'mrukyklvuvvaodsi' },
  { id: 'gmrrpvydgqjruqmi' },
  { id: 'gjovjcmskbvcawlye' },
  { id: 'ixfiglrrbemtor' },
  { id: 'enryoujmjlrywzmi' },
  { id: 'kpnhshjygadkrtqpvi' },
  { id: 'huahpjqggtxafumzpvi' },
  { id: 'hwfbroumvmutlxyaemi' },
  { id: 'srbwfaezftajlatgvi' },
  { id: 'yoprwlvlloumeeahmi' },
  { id: 'cwrpxgsynuqgvefhzdvi' },
  { id: 'tggjmsddiykgvi' },
  { id: 'xdtnxtiemauiouvjk' },
  { id: 'jgytsbhviliegwzmi' },
  { id: 'tsigkznkvpjykqdgvi' },
  { id: 'dzgekwvazyvnekkervn' },
  { id: 'qbswvcqkwtbjoeark' },
  { id: 'eiheesfabnivygb' },
  { id: 'kookeoukubor' },
  { id: 'gtpxtkwvwhvqwipb' },
  { id: 'uafykkcwcswqeguiccwhfr' },
  { id: 'hqxgdoyhjhgzmlik' },
  { id: 'pbqssojtwvdcdyrji' },
  { id: 'dvvuzdyqkwkcjvvidcjifr' },
  { id: 'edgkusoopfykkvjpdsi' },
  { id: 'psrnhmpscnxonlhwb' } ];

  let constraints = [ { variables:
     { xmstwdoozswzyyzaor: 1,
       huahpjqggtxafumzpvi: 1,
       qbswvcqkwtbjoeark: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { mnmhgowleecwsgewmogvi: 1,
       hwfbroumvmutlxyaemi: 1,
       eiheesfabnivygb: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { mxdpqaesczkjonfypsyvi: 1,
       srbwfaezftajlatgvi: 1,
       kookeoukubor: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { evunttopwcgqjqjjor: 1,
       yoprwlvlloumeeahmi: 1,
       gtpxtkwvwhvqwipb: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { mrukyklvuvvaodsi: 1,
       cwrpxgsynuqgvefhzdvi: 1,
       uafykkcwcswqeguiccwhfr: 1 },
    type: 'eq',
    value: 1 },
  { variables: { gmrrpvydgqjruqmi: 1, tggjmsddiykgvi: 1, hqxgdoyhjhgzmlik: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { gjovjcmskbvcawlye: 1,
       xdtnxtiemauiouvjk: 1,
       pbqssojtwvdcdyrji: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { ixfiglrrbemtor: 1,
       jgytsbhviliegwzmi: 1,
       dvvuzdyqkwkcjvvidcjifr: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { enryoujmjlrywzmi: 1,
       tsigkznkvpjykqdgvi: 1,
       edgkusoopfykkvjpdsi: 1 },
    type: 'eq',
    value: 1 },
  { variables:
     { kpnhshjygadkrtqpvi: 1,
       dzgekwvazyvnekkervn: 1,
       psrnhmpscnxonlhwb: 1 },
    type: 'eq',
    value: 1 },
  { variables: { xmstwdoozswzyyzaor: 1, mnmhgowleecwsgewmogvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { huahpjqggtxafumzpvi: 1, hwfbroumvmutlxyaemi: 1 },
    type: 'max',
    value: 1 },
  { variables: { qbswvcqkwtbjoeark: 1, eiheesfabnivygb: 1 },
    type: 'max',
    value: 1 },
  { variables: { xmstwdoozswzyyzaor: 1, mrukyklvuvvaodsi: 1 },
    type: 'max',
    value: 1 },
  { variables: { huahpjqggtxafumzpvi: 1, cwrpxgsynuqgvefhzdvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { qbswvcqkwtbjoeark: 1, uafykkcwcswqeguiccwhfr: 1 },
    type: 'max',
    value: 1 },
  { variables: { xmstwdoozswzyyzaor: 1, gmrrpvydgqjruqmi: 1 },
    type: 'max',
    value: 1 },
  { variables: { huahpjqggtxafumzpvi: 1, tggjmsddiykgvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { qbswvcqkwtbjoeark: 1, hqxgdoyhjhgzmlik: 1 },
    type: 'max',
    value: 1 },
  { variables: { mnmhgowleecwsgewmogvi: 1, mxdpqaesczkjonfypsyvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { hwfbroumvmutlxyaemi: 1, srbwfaezftajlatgvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { eiheesfabnivygb: 1, kookeoukubor: 1 },
    type: 'max',
    value: 1 },
  { variables: { mnmhgowleecwsgewmogvi: 1, gjovjcmskbvcawlye: 1 },
    type: 'max',
    value: 1 },
  { variables: { hwfbroumvmutlxyaemi: 1, xdtnxtiemauiouvjk: 1 },
    type: 'max',
    value: 1 },
  { variables: { eiheesfabnivygb: 1, pbqssojtwvdcdyrji: 1 },
    type: 'max',
    value: 1 },
  { variables: { mxdpqaesczkjonfypsyvi: 1, evunttopwcgqjqjjor: 1 },
    type: 'max',
    value: 1 },
  { variables: { srbwfaezftajlatgvi: 1, yoprwlvlloumeeahmi: 1 },
    type: 'max',
    value: 1 },
  { variables: { kookeoukubor: 1, gtpxtkwvwhvqwipb: 1 },
    type: 'max',
    value: 1 },
  { variables: { mxdpqaesczkjonfypsyvi: 1, ixfiglrrbemtor: 1 },
    type: 'max',
    value: 1 },
  { variables: { srbwfaezftajlatgvi: 1, jgytsbhviliegwzmi: 1 },
    type: 'max',
    value: 1 },
  { variables: { kookeoukubor: 1, dvvuzdyqkwkcjvvidcjifr: 1 },
    type: 'max',
    value: 1 },
  { variables: { evunttopwcgqjqjjor: 1, mrukyklvuvvaodsi: 1 },
    type: 'max',
    value: 1 },
  { variables: { yoprwlvlloumeeahmi: 1, cwrpxgsynuqgvefhzdvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { gtpxtkwvwhvqwipb: 1, uafykkcwcswqeguiccwhfr: 1 },
    type: 'max',
    value: 1 },
  { variables: { evunttopwcgqjqjjor: 1, enryoujmjlrywzmi: 1 },
    type: 'max',
    value: 1 },
  { variables: { yoprwlvlloumeeahmi: 1, tsigkznkvpjykqdgvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { gtpxtkwvwhvqwipb: 1, edgkusoopfykkvjpdsi: 1 },
    type: 'max',
    value: 1 },
  { variables: { mrukyklvuvvaodsi: 1, kpnhshjygadkrtqpvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { cwrpxgsynuqgvefhzdvi: 1, dzgekwvazyvnekkervn: 1 },
    type: 'max',
    value: 1 },
  { variables: { uafykkcwcswqeguiccwhfr: 1, psrnhmpscnxonlhwb: 1 },
    type: 'max',
    value: 1 },
  { variables: { gmrrpvydgqjruqmi: 1, ixfiglrrbemtor: 1 },
    type: 'max',
    value: 1 },
  { variables: { tggjmsddiykgvi: 1, jgytsbhviliegwzmi: 1 },
    type: 'max',
    value: 1 },
  { variables: { hqxgdoyhjhgzmlik: 1, dvvuzdyqkwkcjvvidcjifr: 1 },
    type: 'max',
    value: 1 },
  { variables: { gmrrpvydgqjruqmi: 1, enryoujmjlrywzmi: 1 },
    type: 'max',
    value: 1 },
  { variables: { tggjmsddiykgvi: 1, tsigkznkvpjykqdgvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { hqxgdoyhjhgzmlik: 1, edgkusoopfykkvjpdsi: 1 },
    type: 'max',
    value: 1 },
  { variables: { gjovjcmskbvcawlye: 1, enryoujmjlrywzmi: 1 },
    type: 'max',
    value: 1 },
  { variables: { xdtnxtiemauiouvjk: 1, tsigkznkvpjykqdgvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { pbqssojtwvdcdyrji: 1, edgkusoopfykkvjpdsi: 1 },
    type: 'max',
    value: 1 },
  { variables: { gjovjcmskbvcawlye: 1, kpnhshjygadkrtqpvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { xdtnxtiemauiouvjk: 1, dzgekwvazyvnekkervn: 1 },
    type: 'max',
    value: 1 },
  { variables: { pbqssojtwvdcdyrji: 1, psrnhmpscnxonlhwb: 1 },
    type: 'max',
    value: 1 },
  { variables: { ixfiglrrbemtor: 1, kpnhshjygadkrtqpvi: 1 },
    type: 'max',
    value: 1 },
  { variables: { jgytsbhviliegwzmi: 1, dzgekwvazyvnekkervn: 1 },
    type: 'max',
    value: 1 },
  { variables: { dvvuzdyqkwkcjvvidcjifr: 1, psrnhmpscnxonlhwb: 1 },
    type: 'max',
    value: 1 } ];

  expect(solver(vars, constraints, null, {})).toBeTruthy();
});

module.exports = {
  SMALL_EXACT,
  THREE_COLOR_K4,
  SMALL_OPT,
  THREE_COLOR_PETERSEN
};
