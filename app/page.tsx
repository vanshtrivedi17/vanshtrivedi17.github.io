import type { Metadata } from "next";
import Image from "next/image";
import DiscoveryFlow from "./components/discovery-flow";
import PathfindingDemo from "./components/pathfinding-demo";
import SectionNav from "./components/section-nav";
import {
  education, experience, leadership, leher, otherProjects, pathfinding,
  profile, recognition, research, skills, xerox,
} from "../content/portfolio";

const title = `${profile.name} | University of Toronto Computer Science`;
const description = `${profile.fullName} studies Computer Science at the University of Toronto and graduated from Fountainhead School in Surat. See his projects and research.`;
const portraitAlt = `Portrait of ${profile.name}`;
const portraitUrl = new URL(profile.portrait.src, profile.site).href;
const socialImage = {
  url: portraitUrl,
  alt: portraitAlt,
  width: profile.portrait.width,
  height: profile.portrait.height,
  type: "image/webp",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: profile.site },
  verification: { google: "vKASKDAfNX52pqbcwr1UmIZ-fbOatsxWXXHZLm52ZCM" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    title,
    description,
    url: profile.site,
    type: "profile",
    siteName: profile.name,
    locale: "en_CA",
    images: [socialImage],
  },
  twitter: { card: "summary", title, description, images: [socialImage] },
};

const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: profile.site,
  name: title,
  description,
  mainEntity: {
    "@type": "Person",
    "@id": new URL("#person", profile.site).href,
    name: profile.name,
    alternateName: profile.fullName,
    url: profile.site,
    image: portraitUrl,
    sameAs: [profile.linkedin],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of Toronto",
      alternateName: ["U of T", "UofT"],
    },
    alumniOf: { "@type": "School", name: "Fountainhead School" },
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage).replace(/</g, "\\u003c") }}
      />
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
              <p className="intro">{profile.bio}</p>
              <p className="intro">{profile.intro}</p>
              <div className="actions">
                <a className="primary" href="#work">View my work</a>
                <a className="text-link" href="#contact">Get in touch</a>
              </div>
            </div>
            <div className="portrait">
              <Image {...profile.portrait} alt={portraitAlt} preload />
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-heading">
          <h2 id="work-heading">Selected work</h2>
          <div className="featured-projects">
            <article className="lead-project" id="leher">
              <div className="lead-copy">
                <div className="leher-identity">
                  <Image src="/leher-logo.webp" alt="" width={64} height={64} />
                  <h3>{leher.title}</h3>
                </div>
                <p className="meta">{leher.context}</p>
                <p>{leher.summary}</p>
                <dl className="results">
                  {leher.results.map(([value, label]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
                <p className="leher-contribution">{leher.contribution}</p>
                <a className="primary leher-visit" href={leher.website}>Visit Website <span aria-hidden="true">↗</span></a>
              </div>
              <figure className="leher-preview">
                <Image src="/leher-homepage.webp" alt="Leher’s public homepage, showing its startup platform and Get Started button" width={1440} height={960} />
                <figcaption>Leher homepage</figcaption>
              </figure>
              <DiscoveryFlow />
            </article>
            <article className="feature path-card" id="pathfinding">
              <p className="meta">{pathfinding.context}</p>
              <h3>{pathfinding.title}</h3>
              <p>{pathfinding.summary}</p>
              <PathfindingDemo />
              <section className="essay-results" aria-labelledby="essay-results-heading">
                <h4 id="essay-results-heading">Extended Essay results</h4>
                <table>
                  <caption>Python measurements averaged across three trials</caption>
                  <thead><tr>
                    <th scope="col">Algorithm</th>
                    <th scope="col">Mean computation time</th>
                    <th scope="col">Mean memory usage</th>
                    <th scope="col">Mean nodes explored</th>
                  </tr></thead>
                  <tbody>
                    {pathfinding.results.map(([algorithm, time, memory, nodes]) => (
                      <tr key={algorithm}><th scope="row">{algorithm}</th><td>{time}</td><td>{memory}</td><td>{nodes}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p>{pathfinding.takeaway}</p>
              </section>
            </article>
          </div>
          <section className="secondary-projects" aria-labelledby="other-work-heading">
            <h3 id="other-work-heading">Other projects</h3>
            <div className="compact-grid">
              {otherProjects.map(project => (
                <article key={project.title}>
                  <h4>{project.title}</h4>
                  <p className="meta">{project.context}</p>
                  <p>{project.summary}</p>
                </article>
              ))}
            </div>
          </section>
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
