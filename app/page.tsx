import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Certifications } from '@/components/sections/Certifications';
import { Labs } from '@/components/sections/Labs';
import { Research } from '@/components/sections/Research';
import { Timeline } from '@/components/sections/Timeline';
import { Contact } from '@/components/sections/Contact';
import {
  getProjects, getExperiences, getCertifications, getLabs,
  getResearch, getTimeline,
} from '@/lib/data';
import { profile } from '@/data/profile';

export default async function Home() {
  const [projects, experiences, certifications, labs, research, timeline] = await Promise.all([
    getProjects(),
    getExperiences(),
    getCertifications(),
    getLabs(),
    getResearch(),
    getTimeline(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats
          projectCount={projects.length}
          experienceCount={experiences.length}
          certCount={certifications.length}
          labsCompleted={labs.totalCompleted}
          githubRepos={profile.stats.githubRepos}
          learningHours={profile.stats.learningHours}
        />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Certifications certifications={certifications} />
        <Labs labs={labs} />
        <Research research={research} />
        <Timeline timeline={timeline} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
