import { registry } from "@web/core/registry";
import { CharField, charField } from "@web/views/fields/char/char_field";

// MM/YYYY: the "/" is set after the month and the format can't be broken
export function formatPeriod(raw, inputType = "") {
    let digits = raw.replace(/\D/g, "");
    // A month can't start with more than 1: 5 -> 05
    if (digits && digits[0] > "1") {
        digits = "0" + digits;
    }
    // Month from 01 to 12: the second digit that makes it invalid is dropped
    if (digits.length >= 2 && (+digits.slice(0, 2) < 1 || +digits.slice(0, 2) > 12)) {
        digits = digits[0] + digits.slice(2);
    }
    digits = digits.slice(0, 6);
    if (digits.length < 2) {
        return digits;
    }
    // Deleting: don't put the "/" back, or it could never be erased
    if (digits.length === 2 && inputType.startsWith("delete")) {
        return digits;
    }
    return digits.slice(0, 2) + "/" + digits.slice(2);
}

export class PeriodField extends CharField {
    static template = "dgii_reports.PeriodField";

    onInput(ev) {
        ev.target.value = formatPeriod(ev.target.value, ev.inputType || "");
    }
}

registry.category("fields").add("dgii_period", {
    ...charField,
    component: PeriodField,
    displayName: "Period (MM/YYYY)",
});
