# Kilowhat?

Energy and emissions for AI tools and web pages, calculated with Software Carbon Intensity (SCI).

## Pages

- **SCI**: the formula and what each part means
- **AI tools**: one method for all AI tools and how to use less, with a page each for
  - **Claude**: where to get token numbers, the assumptions, and a calculator
  - **Gemini**: Google's own energy figure per prompt
  - **Figma**: AI credits
  - **Notion**: AI credits, and no sustainability reporting
- **Web**: one method for every website and how to make pages lighter, with a page each for Wagtail, WordPress and Umbraco
- **Hosting**: what green hosting means, how to check a host, and how to use less

## Run locally

```sh
nvm use
npm install
npm run dev
```

## Your own Claude Code usage

```sh
npm run usage            # all months
npm run usage 2026-10    # one month
```

The script sums the tokens in `~/.claude/projects/**/*.jsonl` per month and model family, and prints the totals. Nothing is sent anywhere. Enter the numbers into the calculator under AI tools → Claude.

## Assumptions

All energy factors live in `src/lib/ai-energy.js`. Anthropic publishes no energy figures, so they are estimates. Change them there and the tables and the calculator follow.

All source links live in `src/lib/sources.js`. Pages link to them inline and list the ones they use at the bottom.

## Build

```sh
npm run build    # static export to out/
npm run budget   # fails if a page weighs more than 220 kB gzipped
```

Set `BASE_PATH=/kilowhat` when publishing under a subfolder.
