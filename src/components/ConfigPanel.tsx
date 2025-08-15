import { DEFAULTS } from "../config";

type Config = typeof DEFAULTS;
type Props = {
  config: Config;
  setConfig: (updater: (c: Config) => Config) => void;
};

export default function ConfigPanel({ config, setConfig }: Props) {
  const Row = ({
    label, prop, step = 1
  }: { label: string; prop: keyof Config; step?: number }) => (
    <label className="flex items-center justify-between gap-3 py-1">
      <span className="text-sm text-slate-200">{label}</span>
              <input
          type="number"
          step={step}
          value={config[prop] as number}
          onChange={(e) => setConfig((v) => ({ ...v, [prop]: Number(e.target.value) }))}
          className="input-mobile w-32"
        />
    </label>
  );

  return (
    <div className="glass rounded-xl p-4 sm:p-5 card-hover">
      <div className="font-semibold mb-2">Live Config</div>
      <div className="space-y-3">
        <Row label="Base Retainer (weekly)" prop="baseRetainerWeekly" step={50} />
        <label className="flex items-center justify-between gap-3 py-1">
          <span className="text-sm text-slate-200">Inflation Mode</span>
          <select
            value={config.inflationMode}
            onChange={(e) => setConfig((v) => ({ ...v, inflationMode: e.target.value as "CPI+2" | "Flat5" }))}
            className="input-mobile w-32"
          >
            <option value="CPI+2">CPI + 2%</option>
            <option value="Flat5">Flat 5%</option>
          </select>
        </label>
        <Row label="CPI (e.g., 0.03 = 3%)" prop="cpiRate" step={0.005} />
        <Row label="Buffer weekly" prop="bufferWeekly" step={50} />
        <Row label="Baseline annual gross" prop="baselineAnnualGross" step={10000} />
        <Row label="Projected annual gross" prop="projectedAnnualGross" step={10000} />
        <Row label="Direct savings (year 1)" prop="directSavingsFirstYear" step={1000} />
        <Row label="Tax audit savings" prop="taxAuditSavings" step={1000} />
        <Row label="Intangible assigned value" prop="intangibleAssignedValue" step={1000} />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={config.firstMonthAccommodation}
            onChange={(e) => setConfig((v) => ({ ...v, firstMonthAccommodation: e.target.checked }))}
          />
          Apply first-month $250+$250 accommodation
        </label>
      </div>
    </div>
  );
}
