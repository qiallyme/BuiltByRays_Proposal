// calculation.ts

export type Config = {
  baseRetainerWeekly: number;
  inflationMode: "CPI+2" | "Flat5" | "None";
  cpiRate: number;
  bufferWeekly: number;
  bufferTargetMonthly: number;
  baselineAnnualGross: number;
  projectedAnnualGross: number;
  growthBonusRate: number;
  directSavingsFirstYear: number;
  directSavingsRate: number;
  taxAuditSavings: number;
  intangibleAssignedValue: number;
  intangibleRate: number;
  intangiblePayoutYears: number;
  totalWeeks: number;
  firstMonthAccommodation: boolean;
};

type ModuleKey = "retainer" | "buffer" | "performance" | "direct" | "indirect";

export type ModuleTotals = Record<ModuleKey, number> & { all: number };
export type ModulePay = Record<ModuleKey, number>;

export type RowModular = {
  week: number;
  date: string;                  // YYYY-MM-DD
  pay: ModulePay;                // paid this week per module
  weeklyTotal: number;           // sum of pay
  remaining: ModuleTotals;       // remaining balances after this week
  remainingAll: number;
};

// Back-compat row (mapped from modular results)
export type Row = {
  week: number;
  date: string;
  BR: number;                    // pay.retainer
  BUF: number;                   // pay.buffer
  projectedBonus: number;        // pay.performance
  directOneTime: number;         // pay.direct + pay.indirect (adapter)
  total: number;                 // weeklyTotal
  cumulative: number;            // running sum of total
};

export function computeScheduleModular(cfg: Config) {
  const clamp2 = (n: number) => Math.round(n * 100) / 100;
  const infRate =
    cfg.inflationMode === "CPI+2"
      ? cfg.cpiRate + 0.02
      : cfg.inflationMode === "Flat5"
      ? 0.05
      : 0;

  // ----- Module Totals -----
  // Retainer: week-by-week with accommodation + inflation after week 52
  let retainerTotal = 0;
  for (let w = 1; w <= cfg.totalWeeks; w++) {
    let br = cfg.baseRetainerWeekly;
    if (w > 52 && infRate > 0) br = Math.round(br * (1 + infRate));
    if (cfg.firstMonthAccommodation && w <= 4) br = 250;
    retainerTotal += br;
  }
  retainerTotal = clamp2(retainerTotal);

  // Buffer: weekly for first 4 weeks, capped at monthly target
  const bufferRaw = cfg.bufferWeekly * 4;
  const bufferTotal = clamp2(Math.min(bufferRaw, cfg.bufferTargetMonthly));

  // Performance: projected delta * rate * 18 months
  const growthAnnual = Math.max(
    0,
    (cfg.projectedAnnualGross - cfg.baselineAnnualGross) * cfg.growthBonusRate
  );
  const performanceTotal = clamp2(growthAnnual * 1.5);

  // Direct savings: year-1 savings * payout rate
  const directTotal = clamp2(cfg.directSavingsFirstYear * cfg.directSavingsRate);

  // Indirect (intangibles): assigned value * rate, paid over N years; take 1.5y
  const intangiblePool = cfg.intangibleAssignedValue * cfg.intangibleRate;
  const intangiblePerYear = intangiblePool / Math.max(1, cfg.intangiblePayoutYears);
  const indirectTotal = clamp2(intangiblePerYear * 1.5);

  const moduleTotals: ModuleTotals = {
    retainer: retainerTotal,
    buffer: bufferTotal,
    performance: performanceTotal,
    direct: directTotal,
    indirect: indirectTotal,
    all: 0,
  };
  moduleTotals.all = clamp2(
    moduleTotals.retainer +
      moduleTotals.buffer +
      moduleTotals.performance +
      moduleTotals.direct +
      moduleTotals.indirect
  );

  // Flat weekly target (will shrink at the end as balances hit zero)
  const weeklyBase = clamp2(moduleTotals.all / cfg.totalWeeks);

  // ----- Build schedule -----
  const rows: RowModular[] = [];
  const remaining: ModuleTotals = { ...moduleTotals };

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  for (let w = 1; w <= cfg.totalWeeks; w++) {
    const date = new Date(start);
    date.setDate(start.getDate() + (w - 1) * 7);
    const dateStr = date.toISOString().slice(0, 10);

    // If we're near the end, don't overcharge past remaining
    const remainingSum =
      remaining.retainer +
      remaining.buffer +
      remaining.performance +
      remaining.direct +
      remaining.indirect;
    const thisWeekTarget = Math.min(weeklyBase, clamp2(remainingSum));

    // Proportional weights by remaining balances
    const weights: Record<ModuleKey, number> = {
      retainer: remaining.retainer,
      buffer: remaining.buffer,
      performance: remaining.performance,
      direct: remaining.direct,
      indirect: remaining.indirect,
    };
    const weightSum = Object.values(weights).reduce((s, v) => s + v, 0) || 1;

    const pay: ModulePay = {
      retainer: clamp2((weights.retainer / weightSum) * thisWeekTarget),
      buffer: clamp2((weights.buffer / weightSum) * thisWeekTarget),
      performance: clamp2((weights.performance / weightSum) * thisWeekTarget),
      direct: clamp2((weights.direct / weightSum) * thisWeekTarget),
      indirect: clamp2((weights.indirect / weightSum) * thisWeekTarget),
    };

    // Cap by remaining per module
    (Object.keys(pay) as ModuleKey[]).forEach((k) => {
      if (pay[k] > remaining[k]) pay[k] = clamp2(remaining[k]);
    });

    // Fix rounding so totals match the target exactly
    const paidSum = clamp2(
      pay.retainer + pay.buffer + pay.performance + pay.direct + pay.indirect
    );
    let diff = clamp2(thisWeekTarget - paidSum);
    if (Math.abs(diff) >= 0.01) {
      // nudge the largest-remaining module
      const order: ModuleKey[] = (["retainer", "performance", "direct", "indirect", "buffer"] as ModuleKey[]).sort(
        (a, b) => remaining[b] - remaining[a]
      );
      const k = order[0];
      pay[k] = clamp2(Math.max(0, Math.min(remaining[k], pay[k] + diff)));
    }

    // Decrement remaining
    (Object.keys(pay) as ModuleKey[]).forEach((k) => {
      remaining[k] = clamp2(remaining[k] - pay[k]);
    });
    remaining.all = clamp2(
      remaining.retainer +
        remaining.buffer +
        remaining.performance +
        remaining.direct +
        remaining.indirect
    );

    rows.push({
      week: w,
      date: dateStr,
      pay,
      weeklyTotal: clamp2(
        pay.retainer + pay.buffer + pay.performance + pay.direct + pay.indirect
      ),
      remaining: { ...remaining },
      remainingAll: remaining.all,
    });

    if (remaining.all <= 0.005) break; // stop early if fully paid
  }

  // Aggregate totals actually paid (in case we stopped early)
  const paidTotals: ModuleTotals = {
    retainer: 0,
    buffer: 0,
    performance: 0,
    direct: 0,
    indirect: 0,
    all: 0,
  };
  for (const r of rows) {
    paidTotals.retainer += r.pay.retainer;
    paidTotals.buffer += r.pay.buffer;
    paidTotals.performance += r.pay.performance;
    paidTotals.direct += r.pay.direct;
    paidTotals.indirect += r.pay.indirect;
  }
  paidTotals.retainer = clamp2(paidTotals.retainer);
  paidTotals.buffer = clamp2(paidTotals.buffer);
  paidTotals.performance = clamp2(paidTotals.performance);
  paidTotals.direct = clamp2(paidTotals.direct);
  paidTotals.indirect = clamp2(paidTotals.indirect);
  paidTotals.all = clamp2(
    paidTotals.retainer +
      paidTotals.buffer +
      paidTotals.performance +
      paidTotals.direct +
      paidTotals.indirect
  );

  return {
    rows,
    moduleTotals,   // planned totals
    paidTotals,     // actual totals from generated schedule
    weeklyBase,     // target weekly payment before tail-end shrink
  };
}

// ---------- Back-compat adapter ----------
// Keeps your existing UI working by mapping modular -> legacy fields.
export function computeSchedule(cfg: Config) {
  const mod = computeScheduleModular(cfg);

  const weeks: Row[] = [];
  let run = 0;

  for (const r of mod.rows) {
    const BR = round2(r.pay.retainer);
    const BUF = round2(r.pay.buffer);
    const projectedBonus = round2(r.pay.performance);
    const directOneTime = round2(r.pay.direct + r.pay.indirect);
    const total = round2(r.weeklyTotal);
    run = round2(run + total);

    weeks.push({
      week: r.week,
      date: r.date,
      BR,
      BUF,
      projectedBonus,
      directOneTime,
      total,
      cumulative: run,
    });
  }

  // Legacy-style totals
  const totals = {
    paid: weeks.reduce((s, x) => s + x.total, 0),
    base: weeks.reduce((s, x) => s + x.BR, 0),
    buf: weeks.reduce((s, x) => s + x.BUF, 0),
    proj: weeks.reduce((s, x) => s + x.projectedBonus, 0),
    one: weeks.reduce((s, x) => s + x.directOneTime, 0),
    EB18_total: mod.moduleTotals.performance + mod.moduleTotals.direct + mod.moduleTotals.indirect,
  };

  return {
    weeks,
    totals,
    spreadPerWeek: round2((totals.proj + totals.one) / (cfg.totalWeeks || 1)), // synthetic for legacy UI
    EB18_total: totals.EB18_total,
    // You also have access to the modular details if you import computeScheduleModular
  };
}

export function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}
