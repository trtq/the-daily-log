import { formatShortDate, formatLongDate, formatTimeAgo } from "./formatTime";

describe("formatShortDate", () => {
  const CURRENT_YEAR = new Date().getFullYear();

  test("same year shows month and day without the year", () => {
    const timestamp = new Date(CURRENT_YEAR, 5, 9).getTime();
    expect(formatShortDate(timestamp)).toBe("Jun 9");
  });

  test("different year includes the year", () => {
    const timestamp = new Date(2020, 5, 9).getTime();
    expect(formatShortDate(timestamp)).toBe("Jun 9, 2020");
  });

  test("December 31st of the current year shows no year", () => {
    const timestamp = new Date(CURRENT_YEAR, 11, 31).getTime();
    expect(formatShortDate(timestamp)).toBe("Dec 31");
  });

  test("single-digit day has no leading zero", () => {
    const timestamp = new Date(2021, 2, 3).getTime();
    expect(formatShortDate(timestamp)).toBe("Mar 3, 2021");
  });
});

describe("formatLongDate", () => {
  test("formats timestamp as uppercase long date", () => {
    const timestamp = new Date(2020, 5, 9).getTime();
    expect(formatLongDate(timestamp)).toBe("TUESDAY, JUNE 9, 2020");
  });
});

describe("formatTimeAgo", () => {
  const FIXED_NOW = new Date("2026-01-01T12:00:00.000Z").getTime();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("exactly 0 seconds (same instant) → 'just now'", () => {
    expect(formatTimeAgo(FIXED_NOW)).toBe("just now");
  });

  test("between 10 and 59 seconds → 'Xs ago'", () => {
    expect(formatTimeAgo(FIXED_NOW - 45_000)).toBe("45s ago");
  });

  test("exactly 1 minute → '1m ago'", () => {
    expect(formatTimeAgo(FIXED_NOW - 60_000)).toBe("1m ago");
  });

  test("between 1 and 23 hours → 'Xh ago'", () => {
    expect(formatTimeAgo(FIXED_NOW - 3 * 3_600_000)).toBe("3h ago");
  });

  test("more than 24 hours → 'Xd ago'", () => {
    expect(formatTimeAgo(FIXED_NOW - 2 * 86_400_000)).toBe("2d ago");
  });

  test("future timestamp is treated as just now", () => {
    expect(formatTimeAgo(FIXED_NOW + 30_000)).toBe("just now");
  });
});
