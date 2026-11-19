# Vansh Trivedi’s portfolio

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Update portfolio copy and links in `content/portfolio.ts`. The project diagrams live in `app/page.tsx`.

```sh
npm run lint
npm run typecheck
npm run build
```

The production build exports to `out/`. To preview the production layout, run `python3 -m http.server 4173 --directory out` and open http://localhost:4173.

The GitHub Pages workflow builds on pushes to the default branch and supports manual runs from that branch. Select **GitHub Actions** in the repository’s **Settings → Pages** before the first deployment. The workflow uploads `out/` to the account Pages repository, `vanshtrivedi17.github.io`.

Keep source PDFs, academic records, private contact information, and credentials outside the repository. Only add media approved for public use.
