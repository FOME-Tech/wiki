# CLAUDE.md

This is the source for the FOME wiki (wiki.fome.tech), built with Docusaurus. See `README.md` for setup, and
`docs/98-How-to-edit-wiki.md` for the contributor guide, including the "Feature page conventions" that feature
and sensor pages follow.

## Pages describe the firmware, so check them against it

Every claim about what the ECU does has to match the firmware source: the FOME firmware repo
(github.com/FOME-Tech/fome-fw). It's a separate repo, usually checked out next to this one at `../fome-fw`. If
it isn't there, ask where it is. Don't write behaviour from memory or from other pages.

- TunerStudio labels, dialogs and units are in `firmware/tunerstudio/tunerstudio.template.ini`, and field help
  text is in `firmware/integration/fome_config.txt`.
- For anything bigger than a small fix, work from the fome-fw checkout. There, the `/wiki` command explains how
  to find the pages a firmware change affects, and the `wiki-chunk` agent writes or revises a page against the code.

## Links

- Internal links are absolute site paths with no number prefixes and no `.md`, e.g.
  `/Limits-And-Protections/Fault-Codes`.
- TunerStudio links here only through the `/r/<slug>` short links in `docusaurus.config.ts`. If you move or rename
  a page, repoint its short link and fix inbound links. Old URLs don't get redirects.

## Check before finishing

Run `npx markdownlint <file>` and `node scripts/linkValidator.js '<file>'` on each changed page (`npm ci` once
first). If pages moved or short links changed, also run `npm run build`.
