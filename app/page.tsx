import { Hero } from "@/components/hero";
import { ProfileStatement } from "@/components/profile-statement";
import { ProjectCard } from "@/components/project-card";
import { ExperienceList } from "@/components/experience-list";
import { ContactList } from "@/components/contact-list";
import { Footer } from "@/components/footer";
import { profile } from "@/content/profile";
import { listFeaturedProjects } from "@/lib/content/projects";

export default function Home() {
  const featured = listFeaturedProjects();
  return (
    <main className="mx-auto w-full max-w-[720px] px-6 md:px-8 py-16 md:py-24 space-y-12">
      <Hero
        name={profile.name}
        roleLabel={profile.roleLabel}
        location={profile.location}
        stackLine={profile.stackLine}
      />
      <ProfileStatement>{profile.profileStatement}</ProfileStatement>
      <section aria-labelledby="projects-heading" className="space-y-6">
        <h2 id="projects-heading" className="text-xs font-mono uppercase tracking-wider text-muted">
          Selected projects
        </h2>
        <div className="space-y-6">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <section aria-labelledby="experience-heading" className="space-y-6">
        <h2 id="experience-heading" className="text-xs font-mono uppercase tracking-wider text-muted">
          Experience
        </h2>
        <ExperienceList
          entries={profile.experience}
          careerBreaks={profile.careerBreaks}
        />
      </section>
      <section aria-labelledby="contact-heading" className="space-y-4">
        <h2 id="contact-heading" className="text-xs font-mono uppercase tracking-wider text-muted">
          Contact
        </h2>
        <ContactList links={profile.links} />
      </section>
      <Footer />
    </main>
  );
}
