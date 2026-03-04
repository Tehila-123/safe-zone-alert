import { describe, it, expect } from "vitest";

// Basic logic test to verify Vitest configuration
describe("Accident Logic", () => {
    it("should correctly identify active accidents", () => {
        const accidents = [
            { id: 1, status: "New" },
            { id: 2, status: "Resolved" },
            { id: 3, status: "Unit informed" },
        ];

        const activeAccidentsCount = accidents.filter((a) => a.status !== "Resolved").length;
        expect(activeAccidentsCount).toBe(2);
    });

    it("should correctly identify responding units", () => {
        const accidents = [
            { id: 1, status: "New" },
            { id: 2, status: "Resolved" },
            { id: 3, status: "Unit informed" },
        ];

        const respondingUnitsCount = accidents.filter((a) => a.status === "Unit informed").length;
        expect(respondingUnitsCount).toBe(1);
    });
});
