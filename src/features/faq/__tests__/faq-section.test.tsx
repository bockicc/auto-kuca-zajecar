import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { faqEntries } from "../faq-content";
import { FaqSection } from "../faq-section";

describe("FaqSection", () => {
  it("opens the first entry by default and toggles one panel at a time", () => {
    render(<FaqSection />);

    const first = screen.getByRole("button", { name: faqEntries[0].question });
    const second = screen.getByRole("button", { name: faqEntries[1].question });

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(second);

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(second);

    expect(second).toHaveAttribute("aria-expanded", "false");
  });

  it("limits the rendered entries and keeps the first one open", () => {
    render(<FaqSection limit={5} />);

    expect(screen.getAllByRole("button")).toHaveLength(5);
    expect(screen.getByRole("button", { name: faqEntries[0].question })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("does not get stuck when the entry list shrinks", () => {
    const { rerender } = render(<FaqSection limit={5} />);

    fireEvent.click(screen.getByRole("button", { name: faqEntries[4].question }));
    expect(screen.getByRole("button", { name: faqEntries[4].question })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    rerender(<FaqSection limit={3} />);

    expect(screen.getByRole("button", { name: faqEntries[0].question })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});