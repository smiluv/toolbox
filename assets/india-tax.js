/* India income tax rules, shared by the income tax and TDS calculators.
   Slabs, rebate, surcharge and cess as per Finance Act 2025 (FY 2025-26, carried into FY 2026-27).
   Update these numbers after each Union Budget. */
var INDIA = {
  slabs: {
    new: [[0, 0], [400000, 5], [800000, 10], [1200000, 15], [1600000, 20], [2000000, 25], [2400000, 30]],
    below60: [[0, 0], [250000, 5], [500000, 20], [1000000, 30]],
    senior: [[0, 0], [300000, 5], [500000, 20], [1000000, 30]],
    superSenior: [[0, 0], [500000, 20], [1000000, 30]]
  },
  stdDed: { new: 75000, old: 50000 },
  rebate: { new: [1200000, 60000], old: [500000, 12500] }, // section 87A: [max taxable income, max rebate]
  surcharge: [[5000000, 10], [10000000, 15], [20000000, 25], [50000000, 37]], // new regime caps at 25%
  cess: 4
};

// Progressive tax: slabs = [[from, rate%], ...] sorted. parts = [from, to, rate, income in slab, tax].
function slabTax(inc, slabs) {
  var tax = 0, parts = [];
  slabs.forEach(function (s, k) {
    var to = k + 1 < slabs.length ? slabs[k + 1][0] : Infinity, part = Math.min(inc, to) - s[0];
    if (part > 0) { var t = part * s[1] / 100; tax += t; parts.push([s[0], to, s[1], part, t]); }
  });
  return { tax: tax, parts: parts };
}

// regime: 'new' | 'old'. o: { age: 'below60'|'senior'|'superSenior', salaried: bool, deductions: total allowed deductions }
function indiaTax(gross, regime, o) {
  var std = o.salaried ? INDIA.stdDed[regime] : 0, taxable = Math.max(gross - std - (o.deductions || 0), 0);
  var slabs = regime === 'new' ? INDIA.slabs.new : INDIA.slabs[o.age || 'below60'], rb = INDIA.rebate[regime];
  var afterRebate = function (inc) {
    var t = slabTax(inc, slabs).tax;
    if (inc <= rb[0]) return Math.max(t - rb[1], 0);
    return regime === 'new' ? Math.min(t, inc - rb[0]) : t; // new regime: marginal relief just above 12 lakh
  };
  var s = slabTax(taxable, slabs), tax = afterRebate(taxable), rate = 0, prev = 0, T = 0;
  INDIA.surcharge.forEach(function (b) { if (taxable > b[0]) { prev = rate; rate = regime === 'new' ? Math.min(b[1], 25) : b[1]; T = b[0]; } });
  // Marginal relief: tax + surcharge may not exceed the tax at the threshold plus the income above it.
  var sc = rate ? Math.max(Math.min(tax * (1 + rate / 100), afterRebate(T) * (1 + prev / 100) + taxable - T) - tax, 0) : 0;
  var cess = (tax + sc) * INDIA.cess / 100;
  return { taxable: taxable, std: std, slabTax: s.tax, rebate: s.tax - tax, surcharge: sc, cess: cess, total: tax + sc + cess, parts: s.parts,
    marginal: s.parts.length ? s.parts[s.parts.length - 1][2] : 0 };
}
