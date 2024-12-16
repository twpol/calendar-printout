import { DateTime } from "https://cdn.jsdelivr.net/npm/luxon@3.5.0/+esm"

const h1 = document.querySelector("body > h1")
const main = document.querySelector("main")

const _params = new URLSearchParams(location.search)
const template = _params.get("template") ?? ""
const config = {
    date: DateTime.fromISO(_params.get("date") ?? DateTime.now().toString()),
    rows: _params.get("rows")?.split(",") ?? [],
    cols: _params.get("cols")?.split(",") ?? [],
    separateRows: _params.get("separateRows")?.split(",") ?? [],
    separateCols: _params.get("separateCols")?.split(",") ?? [],
    highlightRows: _params.get("highlightRows")?.split(",") ?? [],
    highlightCols: _params.get("highlightCols")?.split(",") ?? [],
}
Object.entries(config).forEach((e) => console.debug(e[0], e[1]))

if (/^[a-z-]+$/.test(template)) {
    import(`./templates/${template}.mjs`)
        .catch(() => {
            if (main) main.innerText = `Template not found: ${template}`
        })
        .then((module) => {
            h1?.remove()
            module.default(main, config)
        })
}
