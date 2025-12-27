import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import ExperienceCard from '@/components/experience/ExperienceCard';
import Education from '@/components/sections/Education';
import { aboutData } from '@/data/about';
import { experiences } from '@/data/experience';
import { Download, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Calvin Liew - Product Analyst and Designer. Learn about my background, skills, and professional experience in data analysis, UI/UX design, and technology.',
};

export default function ProfilePage() {
  return (
    <Section>
      <Container>
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Profile
          </h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-secondary leading-relaxed mb-6">
              {aboutData.introduction}
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
              My Approach
            </h2>
            <p className="text-lg text-secondary leading-relaxed">
              I believe in the power of combining data-driven insights with human-centered design. Whether I'm optimizing software spend at Sanofi, designing interactive data visualizations, or prototyping AI-powered tools, I focus on creating solutions that are both technically sound and deeply user-friendly.
            </p>

            <p className="text-lg text-secondary leading-relaxed mt-4">
              My background in Management Information Technology and Computer Science at the University of Toronto has equipped me with a unique skill set that bridges business strategy, technical implementation, and design thinking.
            </p>
          </div>
        </div>

        {/* Resume Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Resume
          </h2>

          <div className="bg-surface rounded-lg border border-border-light p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cosmic-purple/10 to-cosmic-cyan/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-cosmic-purple" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Calvin Liew - Resume
                </h3>
                <p className="text-secondary mb-4">
                  Download my latest resume to learn more about my experience in product analysis, UI/UX design, and data analytics.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Download Button */}
                  <a
                    href="/resume/resume.pdf"
                    download="CalvinLiew_Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border-light hover:border-cosmic-purple bg-transparent hover:bg-cosmic-purple/5 text-foreground font-medium transition-all duration-300 hover:shadow-md hover:shadow-cosmic-purple/20 active:scale-95"
                    aria-label="Download resume"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Download Resume</span>
                    <span className="inline sm:hidden">Download</span>
                  </a>

                  {/* View Button (Opens in new tab) */}
                  <a
                    href="/resume/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-transparent hover:bg-surface-hover text-secondary hover:text-cosmic-purple font-medium transition-all duration-300"
                    aria-label="View resume in new tab"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="hidden sm:inline">View Resume</span>
                    <span className="inline sm:hidden">View</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutData.skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-lg font-semibold text-primary mb-4 border-b border-border-light pb-2">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="skill">{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-secondary mb-8">
            My professional journey in product analysis, design, and technology.
          </p>

          <div className="space-y-8">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Education />
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto" id="contact">
          <div className="bg-surface rounded-lg p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Let's Connect
            </h2>
            <p className="text-lg text-secondary mb-6">
              I'm always interested in new opportunities, collaborations, and conversations about product, design, and technology. Feel free to reach out!
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-semibold text-primary mb-2">Email</h3>
                <a
                  href={`mailto:${aboutData.email}`}
                  className="text-cosmic-purple hover:text-cosmic-cyan transition-colors"
                >
                  {aboutData.email}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-3">Connect Online</h3>
                <div className="flex flex-wrap gap-4">
                  {aboutData.socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target={link.platform !== 'Email' ? '_blank' : undefined}
                      rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 text-cosmic-purple hover:text-cosmic-cyan font-medium transition-colors"
                    >
                      <span>{link.platform}</span>
                      {link.platform !== 'Email' && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
