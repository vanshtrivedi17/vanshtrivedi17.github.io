# Vansh Trivedi

Computer Science at the University of Toronto, St. George

[**Visit the portfolio ↗**](https://vanshtrivedi17.github.io/) · [View deployments](https://github.com/vanshtrivedi17/vanshtrivedi17.github.io/actions/workflows/deploy-pages.yml)

---

## Selected work

| Project | What’s inside |
| --- | --- |
| [Leher](https://vanshtrivedi17.github.io/#leher) | A startup networking platform I founded that reached **100+ users** and secured **8+ startup partnerships**. |
| [Comparing Pathfinding Algorithms on a Changing Grid](https://vanshtrivedi17.github.io/#pathfinding) | My completed IB Computer Science Extended Essay and a browser demo comparing Dijkstra, A*, and D* Lite after an obstacle blocks the route. |

## Run locally

The site uses Next.js, TypeScript, and Tailwind CSS. With Node.js 22 and npm installed, run:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

| To update | Go to |
| --- | --- |
| Portfolio copy, projects, education, and links | [`content/portfolio.ts`](content/portfolio.ts) |
| Pathfinding demo | [`app/components/pathfinding-demo.tsx`](app/components/pathfinding-demo.tsx) |
| Public images | [`public/`](public/) |

Keep source PDFs, private records, and credentials outside the repository. Add images only when they’re approved for public use.

## Check and deploy

```sh
npm run lint
npm run typecheck
npm run build
```

The build exports the site to `out/`. The [GitHub Pages workflow](.github/workflows/deploy-pages.yml) publishes it to the root URL on pushes to the default branch and can also run manually.
