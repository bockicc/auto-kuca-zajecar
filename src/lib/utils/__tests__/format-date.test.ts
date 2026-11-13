import { describe, expect, it } from "vitest";

import { formatLongDate, formatWeekday } from "../format-date";

const cyrillic = /[\u0400-\u04FF]/;

describe("format-date", () => {
  it("formats weekdays in Serbian Latin", () => {
    const label = formatWeekday(1);

    expect(label).toBe("ponedeljak");
    expect(cyrillic.test(label)).toBe(false);
  });

  it("formats long dates in Serbian Latin", () => {
    const label = formatLongDate(new Date(2024, 0, 8));

    expect(label).toContain("januar");
    expect(cyrillic.test(label)).toBe(false);
  });
});