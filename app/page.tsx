import Image from "next/image";
import DiscoveryFlow from "./components/discovery-flow";
import PathfindingDemo from "./components/pathfinding-demo";
import SectionNav from "./components/section-nav";
import {
  education, experience, leadership, leher, otherProjects, pathfinding,
  profile, recognition, research, skills, standout, xerox,
} from "../content/portfolio";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead">
        <div className="shell masthead-inner">
          <a className="wordmark" href="#top">{profile.name}</a>
          <SectionNav />
        </div>
      </header>
      <main className="shell" id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="name">
          <h1 id="name"><span>{profile.name}</span></h1>
          <div className="hero-details">
            <div className="hero-copy">
              <p className="subtitle">{profile.subtitle}</p>
              <p className="intro">{profile.intro}</p>
              <div className="actions">
                <a className="primary" href="#work">View my work</a>
                <a className="text-link" href="#contact">Get in touch</a>
              </div>
            </div>
            <div className="portrait">
              <Image src="/linkedin-portrait.webp" alt="Vansh Trivedi" width={560} height={700} preload />
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
            </div>
            <DiscoveryFlow />
          </article>
          <div className="feature-grid">
            <article className="feature path-card">
              <p className="meta">{pathfinding.context}</p>
              <h3>{pathfinding.title}</h3>
              <p>{pathfinding.summary}</p>
              <p>{pathfinding.contribution}</p>
              <p className="evidence">{pathfinding.result}</p>
              <PathfindingDemo />
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
                <div className="entry" key={item.school}><h4>{item.school}</h4><p className="meta">{item.details}</p><p className="meta">{item.extra}</p></div>
              ))}
            </div>
            <div>
              <h3>Leadership</h3>
              {leadership.map(item => (
                <article className="entry leadership-entry" key={item.title}>
                  <h4>{item.title}</h4>
                  <p className="meta">{item.context}</p>
                  <p className="achievement">{item.metric}</p>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
            <div>
              <h3>Recognition</h3>
              <div className="xerox">
                <p className="achievement">{xerox.amount}</p>
                <h4>{xerox.title}</h4>
                <p className="meta">{xerox.context}</p>
              </div>
              <ul className="recognition">{recognition.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Skills</h3>
              <dl className="skills">{skills.map(([label, list]) => <div key={label}><dt>{label}</dt><dd className="meta">{list}</dd></div>)}</dl>
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
