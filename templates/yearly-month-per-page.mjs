import { DateTime, Interval } from "https://cdn.jsdelivr.net/npm/luxon@3.5.0/+esm"

/** @type {(main: HTMLElement, _: { date: DateTime, rows: string[], cols: string[], separateRows: string[], separateCols: string[], highlightRows: string[], highlightCols: string[] }) => void} */
export default function (main, { date, rows, cols, separateRows, separateCols, highlightRows, highlightCols }) {
    for (let month = 1; month <= 12; month++) {
        const dateMonth = date.set({ month, day: 1 })

        const table = document.createElement("table")
        table.classList.add("yearly-month-per-page")

        const colGroup = document.createElement("colgroup")
        for (const rowValue of rows) {
            const col = document.createElement("col")
            col.classList.add("rows")
            col.classList.toggle("separate", separateCols.includes(rowValue))
            col.classList.toggle("highlight", highlightCols.includes(rowValue))
            col.classList.add(rowValue)
            colGroup.appendChild(col)
        }
        for (const colValue of cols) {
            const col = document.createElement("col")
            col.classList.add("cols")
            col.classList.toggle("separate", separateCols.includes(colValue))
            col.classList.toggle("highlight", highlightCols.includes(colValue))
            colGroup.appendChild(col)
        }
        table.appendChild(colGroup)

        const thead = document.createElement("thead")
        const row = document.createElement("tr")
        const cell = document.createElement("th")
        cell.colSpan = rows.length
        cell.textContent = dateMonth.toFormat("MMMM yyyy")
        row.appendChild(cell)
        for (const colValue of cols) {
            const cell = document.createElement("th")
            cell.textContent = colValue
            row.appendChild(cell)
        }
        thead.appendChild(row)
        table.appendChild(thead)

        const lastValueRows = cols.map(() => "")
        const tbody = document.createElement("tbody")
        const daysInMonth = Interval.fromDateTimes(dateMonth, dateMonth.plus({ months: 1 })).length("days")
        for (let day = 1; day <= daysInMonth; day++) {
            const dateDay = dateMonth.set({ day })

            const row = document.createElement("tr")
            for (const [rowIndex, rowValue] of Object.entries(rows)) {
                const value = dateDay.toFormat(rowValue)
                row.classList.toggle("highlight", highlightRows.includes(value))
                const cell = document.createElement("th")
                if (lastValueRows[rowIndex] !== value) {
                    cell.textContent = value
                    lastValueRows[rowIndex] = value
                }
                row.appendChild(cell)
            }
            row.classList.toggle(
                "separate",
                separateRows.some((sr) => lastValueRows.includes(sr))
            )

            for (const colValue of cols) {
                const cell = document.createElement("td")
                row.appendChild(cell)
            }

            tbody.appendChild(row)
        }
        table.appendChild(tbody)

        main.appendChild(table)
    }
}
