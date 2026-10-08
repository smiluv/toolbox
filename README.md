# FreeToolBox

Free, private, browser-based tools: finance and tax calculators, unit converters, text and developer utilities, CSS generators, security tools, health calculators, timers and media tools.

Everything runs client-side. There is no sign-up, no backend, and no user input is ever uploaded.

**Live site:** [toolbox.smilu.net](https://toolbox.smilu.net)

## Tech stack

- Plain HTML pages, one file per tool (e.g. `tip-calculator.html`)
- [jQuery 3.7](https://jquery.com/) from a CDN
- [Chart.js](https://www.chartjs.org/) from a CDN, only on pages with charts
- `assets/site.css`: shared styles, including light and dark themes
- `assets/site.js`: shared menu, footer, breadcrumbs, structured data (JSON-LD) and helpers (`num`, `fmt`, `esc`, `drawChart`, `unitConverter`, ...)
- `assets/india-tax.js`: shared India income tax / TDS logic

There is no build step, no bundler and no `package.json`.

## Running locally

Serve the folder with any static web server. Opening files via `file://` partly works, but the self-test needs a real server.

```bash
git clone https://github.com/smiluv/toolbox.git
cd toolbox

# Python
python -m http.server 8080

# or Node
npx serve .
```

Then open http://localhost:8080.

## Project structure

```
index.html                  Home page listing every tool
*-tools.html,
finance-calculators.html,
css-generators.html,
converters-generators.html  Category home pages (one per menu)
<tool-name>.html            One page per tool
assets/                     Shared CSS and JS
selftest.html               Browser-based regression tests
sitemap.xml, robots.txt,
llms.txt                    SEO and AI-crawler metadata
```

## Testing

Open http://localhost:8080/selftest.html. It loads each tested page in an iframe, fills in known inputs and checks the output. Every row should say **PASS**.

If you change calculation logic, add a case to the `TESTS` array in `selftest.html`:

```js
// [page, { inputId: value, ... }, output selector, expected regex]
['tip-calculator.html', { bill: 100, tip: 15, ppl: 1 }, '#total', /^115\.00$/],
```

## Adding a new tool

1. Copy an existing tool page with a similar layout (e.g. `tip-calculator.html`) and rename it, using a lowercase, hyphenated, SEO-friendly filename.
2. Update the `<title>`, `meta description`, `meta keywords`, `<h1>`, lead text and the "about" / FAQ section. The FAQ `<details>` items are turned into structured data automatically.
   Also update the `canonical` link and the `og:url`, `og:title` and `og:description` tags to the new page's URL, title and description. These must stay in the HTML because search engines and social apps read them without running JavaScript.
3. Put inputs inside `<section class="card">` and define a global `calc()` function. `site.js` calls it on load and on every input change.
4. Register the tool in all of these places:
   - The `TOOLS` array in `assets/site.js` (this drives the menu, breadcrumbs and related links)
   - `index.html`
   - The matching category home page (e.g. `finance-calculators.html`)
   - `sitemap.xml`
   - `llms.txt`
5. Add at least one `selftest.html` case if the tool calculates anything.

## Contributing

Contributions are welcome: new tools, bug fixes, accuracy fixes (especially tax rules), accessibility and UI improvements.

1. Fork the repository and create a branch: `git checkout -b feature/my-tool`.
2. Make your changes and follow the guidelines below.
3. Run `selftest.html` and confirm that everything passes.
4. Open a pull request that describes what changed and why. Include a screenshot for UI changes and a source link for tax or rate changes.

### Guidelines

- **Keep it client-side.** No server calls with user data, no tracking of user inputs, no sign-up walls. Every page shows a "Private by design" notice (added by `site.js`). If a tool really must contact another service, say so honestly with `<main class="wrap" data-network="...">`, as `currency-converter.html` does, and never put user input in the page URL.
- **No build tooling.** Plain HTML, CSS and JS that works when served as-is.
- **Reuse before adding.** Check the helpers in `assets/site.js` and the classes in `assets/site.css` before writing new ones. Avoid new dependencies; if one is truly needed, load it from a CDN only on the page that uses it.
- **Escape user input** with `esc()` before inserting it as HTML.
- **Match the existing style:** compact jQuery, ES5-compatible syntax, and comments only where the code can't explain itself.
- **Accessibility:** label every input, keep buttons keyboard-usable, and check both light and dark themes.
- **Cite sources** for tax slabs, GST rates and other regulatory numbers in your pull request.

## Reporting issues

Open an issue with the tool URL, the inputs you used, the result you expected and the result you got.

## License

<!-- TODO: add a LICENSE file (e.g. MIT) and name it here. -->
No license has been chosen yet. Until one is added, all rights are reserved by the author.
