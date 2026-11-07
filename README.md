# Corkathon screen

The big-screen page for Corkathon, run by the UCC Computer Science Society. It carries the sixteen-slide opening talk, then stays on the event poster with a live GMT flip clock on the monitor's screen.

Built with React, Tailwind and Motion on Vite. The clock always shows GMT, including during Irish summer time, and takes the time from the device's clock, so check the system time on the machine running the display.

## Run it

You need [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

Then open http://localhost:4173 and go full screen.

## Present it

| Slide | Link |
|---|---|
| Countdown | `/#countdown` |
| 1. Corkathon 2026 | `/#title` |
| 2. First-hackathon quote | `/#quote` |
| 3. Presenter and CSSoc | `/#presenter` |
| 4. Today's goal | `/#goal` |
| 5. Format and Devpost | `/#format` |
| 6. Judging | `/#judging` |
| 7. Quick housekeeping | `/#housekeeping` |
| 8. Frame: Harry Page | `/#frame` |
| 9. Frame backdrop | `/#frame-backdrop` |
| 10. Frame: Who we are | `/#frame-who` |
| 11. Frame: The challenge | `/#frame-challenge` |
| 12. Frame: What great looks like | `/#frame-directions` |
| 13. Frame: How it's judged | `/#frame-judging` |
| 14. Ignite: Eamon Curtin | `/#ignite` |
| 15. Ignite's challenge | `/#ignite-brief` |
| 16. Let the hacking begin | `/#begin` |
| Deadline countdown | `/#deadlinecountdown` |

Space, Enter, the right arrow, Page Down or a mouse click moves forward. The left arrow or Page Up moves back. Presentation clickers send Page Up and Page Down, so they work with no setup.

Two slides share the poster and flip clock:

- `/#countdown` sits before the title. It counts down to the opening talk at 09:15 GMT on Saturday 7 November 2026 (`Live in HH:MM:SS`), then moves to the title slide on its own. Leave the screen here before the event.
- `/#deadlinecountdown` comes after the talk. It counts down to the end of hacking at 19:00 GMT that day (`Ends in HH:MM:SS`), then shows `Time's up`.

A bare address still opens on the title slide. Every slide also opens from a path, like `/countdown` or `/deadlinecountdown`, as long as the host sends unknown paths to `index.html`; the `#` links always work.

To change either time, edit `TALK_STARTS` or `HACKING_ENDS` in [src/countdown.ts](src/countdown.ts) and the times in its tests.

The talk stops at the clock and does not loop. A refresh stays on the current slide, so reloading during the event will not replay the talk. To replay it, open `/#title`.

## Fill in the slides

All slide copy lives in [src/deck-content.ts](src/deck-content.ts). Replace every line that starts with `Placeholder`. A list can hold any number of points, and a single point renders as one large statement.

Each sponsor slide shows a person and a logo. To swap either, put the file in `src/assets/people/` or `src/assets/logos/`, import it in `deck-content.ts`, and set `photoUrl`, `logoUrl` and `logoAlt`. Always import images: a plain path string works in dev but breaks in the build. Use transparent PNGs, because the tiles are dark. The tests in [tests/e2e/slideshow.e2e.ts](tests/e2e/slideshow.e2e.ts) count the points on each slide and check the image names in `SPONSORS`, so update them when the content changes.

Edits only reach the big screen after a redeploy. See [Deploy it](#deploy-it).

## Set the presenter

Edit [src/presenter.ts](src/presenter.ts). Put the photo in `src/assets/people/` and import it:

```ts
import photo from '#src/assets/people/presenter.png'

export const presenter: Presenter = {
  name: 'Their name',
  photoUrl: photo,
}
```

The photo slot is 4:5. The whole photo shows, sitting on the bottom edge, so a cut-out's flat base lines up with the slot. The "Hi, I'm" tests in [tests/e2e/slideshow.e2e.ts](tests/e2e/slideshow.e2e.ts) use `PRESENTER_TITLE`, so update it and the photo test when the name changes.

## Change the look

Colours, fonts and clock sizes live in [src/theme.css](src/theme.css):

| To change | Edit |
|---|---|
| The poster | `--stage-image` |
| The clock's position | `--glass-x` and `--glass-y` |
| The glass tint | `--color-glass` |
| The digit colour | `--color-numeral` |
| The title background colours | the `RAMP` stops in [src/fluted-field.ts](src/fluted-field.ts) |

The poster is 16:9, so a 16:9 display shows all of it. Other screen shapes crop the edges. A new poster with the monitor in a different spot needs new `--glass-x` and `--glass-y` values, and the same numbers updated in the "sits on the monitor glass" test.

## Deploy it

The live site is [corkathon.evhsync.com](https://corkathon.evhsync.com), hosted on 0xEvanH's Coolify. It does not redeploy on its own, so a push changes nothing on the live site. When your changes are ready, tell 0xEvanH, who will merge them and redeploy.

To build it yourself:

```bash
bun run build
```

This writes a static site to `dist/`. On Coolify, use the Nixpacks build pack with "Is it a static site?" ticked and the publish directory set to `/dist`.

## Test it

```bash
bunx playwright install chromium
bun run check
```

The first command is only needed once. `check` runs the typecheck, the unit tests, then the Playwright tests against a production build.

## Credits

Headings use [Inter Tight](src/assets/fonts/OFL-inter-tight.txt) and the clock digits use [Barlow Semi Condensed](src/assets/fonts/OFL.txt), both under the SIL Open Font License.
