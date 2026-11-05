# Corkathon clock

A full-screen page for Corkathon, run by the UCC Computer Science Society. It shows the event poster with a live GMT flip clock on the monitor's screen.

Built with plain TypeScript and CSS, with no runtime dependencies. It always shows GMT, including during Irish summer time, and takes the time from the device's clock, so check the system time on the machine running the display.

## Run it

You need [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

Then open http://localhost:4173 and go full screen. The poster is 16:9, so a 16:9 display shows all of it. Other screen shapes crop the edges.

## Build it

```bash
bun run build
```

This writes a static site to `dist/`, ready for any static host.

## Change the look

Everything lives in [src/theme.css](src/theme.css):

| To change | Edit |
|---|---|
| The poster | `--stage-image` |
| The clock's position | `--glass-x` and `--glass-y` |
| The glass tint | `--color-glass` |
| The digit colour | `--color-numeral` |
| The clock's size | `--card-width`, `--card-height` and `--numeral-size` |

A new poster with the monitor in a different spot needs new `--glass-x` and `--glass-y` values. Update the edge numbers in the "sits on the monitor glass" test in [tests/e2e/clock.e2e.ts](tests/e2e/clock.e2e.ts) to match.

## Test it

```bash
bunx playwright install chromium
bun run check
```

The first command is only needed once. `check` runs the typecheck, unit tests, Playwright tests and build.

## Credits

The digits use Barlow Semi Condensed, under the [SIL Open Font License](src/assets/fonts/OFL.txt).
