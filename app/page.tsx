import {
  education, experience, leadership, leher, navigation, otherProjects, pathfinding,
  profile, recognition, research, skills, standout,
} from "../content/portfolio";

function DiscoveryFlow() {
  return (
    <figure className="discovery">
      <figcaption>Leher · Product schematic</figcaption>
      <ol>
        <li><strong>Discover</strong><span>Explore early-stage startups</span></li>
        <li><strong>Match</strong><span>Find potential co-founders</span></li>
        <li><strong>Connect</strong><span>Start a conversation</span></li>
      </ol>
    </figure>
  );
}

function PathfindingGrid() {
  return (
    <figure className="path-figure">
      <svg viewBox="0 0 240 120" role="img" aria-label="An illustrative route from the circular start to the square goal, turning around shaded obstacles">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#cad3e3" />
          </pattern>
        </defs>
        <rect width="240" height="120" fill="url(#grid)" />
        <path d="M60 60h40v40H60z M120 20h40v40h-40z M180 80h20v20h-20z" fill="#a9b5ca" />
        <path d="M30 90V50h80v20h100V30" fill="none" stroke="#244ad4" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="30" cy="90" r="5" fill="#244ad4" />
        <rect x="205" y="25" width="10" height="10" fill="#244ad4" />
      </svg>
      <figcaption>
        <span>Illustrative route</span>
        <ul aria-label="Grid legend"><li>● Start</li><li>■ Goal</li><li>▬ Path</li><li className="obstacle">■ Obstacle</li></ul>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="shell masthead" id="top">
        <a className="wordmark" href="#top">{profile.name}</a>
        <nav aria-label="Main navigation">
          <ul>{navigation.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
        </nav>
      </header>
      <main className="shell" id="main">
        <section className="hero" aria-labelledby="name">
          <h1 id="name">{profile.name}</h1>
          <div className="hero-details">
            <p className="subtitle">{profile.subtitle}</p>
            <div>
              <p className="intro">{profile.intro}</p>
              <div className="actions">
                <a className="primary" href="#work">View my work</a>
                <a className="text-link" href="#contact">Get in touch</a>
              </div>
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-heading">
          <h2 id="work-heading">Selected work</h2>
          <article className="lead-project" id="leher">
            <div className="lead-copy">
              <h3>{leher.title}</h3>
              <p className="meta">{leher.context}</p>
              <p>{leher.summary}</p>
              <p>{leher.contribution}</p>
              <dl className="results">
                {leher.results.map(([value, label]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              <p className="meta stack">{leher.stack}</p>
            </div>
            <DiscoveryFlow />
          </article>
          <div className="feature-grid">
            <article className="feature path-card">
              <p className="meta">{pathfinding.context}</p>
              <h3>{pathfinding.title}</h3>
              <PathfindingGrid />
              <p>{pathfinding.summary}</p>
              <p>{pathfinding.contribution}</p>
              <p className="evidence">{pathfinding.result}</p>
            </article>
            <article className="feature standout-card" id="standout">
              <p className="meta">{standout.context}</p>
              <h3>{standout.title}</h3>
              <p>{standout.summary}</p>
            </article>
          </div>
          <div className="compact-grid">
            {otherProjects.map(project => (
              <article key={project.title}>
                <h3>{project.title}</h3>
                <p className="meta">{project.context}</p>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="research" aria-labelledby="research-heading">
          <h2 id="research-heading">Current research</h2>
          <p className="section-context">{research.organization}</p>
          <p className="meta">{research.role}</p>
          <div className="compact-grid research-grid">
            {research.threads.map(thread => (
              <article key={thread.title}>
                <p className="status">In progress</p>
                <h3>{thread.title}</h3>
                <p>{thread.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          <ol className="timeline">
            {experience.map(job => (
              <li key={job.organization}>
                <p className="meta">{job.dates}</p>
                <div>
                  <h3>{job.role}</h3>
                  <p className="organization">{job.organization}</p>
                  <p>{job.summary}</p>
                  {job.project && <a className="text-link" href={job.project.href}>{job.project.label}</a>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="education" aria-labelledby="education-heading">
          <h2 id="education-heading">Education, leadership &amp; recognition</h2>
          <div className="background-grid">
            <div>
              <h3>Education</h3>
              {education.map(item => (
                <div className="entry" key={item.school}><h4>{item.school}</h4><p className="meta">{item.details}</p><p>{item.extra}</p></div>
              ))}
            </div>
            <div>
              <h3>Leadership</h3>
              {leadership.map(item => (
                <div className="entry" key={item.title}><h4>{item.title}</h4><p>{item.summary}</p></div>
              ))}
            </div>
            <div>
              <h3>Recognition</h3>
              <ul className="recognition">{recognition.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Skills</h3>
              <dl className="skills">{skills.map(([label, list]) => <div key={label}><dt>{label}</dt><dd>{list}</dd></div>)}</dl>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell contact" id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Get in touch</h2>
        <address>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <span>{profile.location}</span>
        </address>
      </footer>
    </>
  );
}
