import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import { aboutData } from '@/data/about';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Calvin Liew, a Product Manager and Designer building intelligent products at the intersection of technology, design, and business strategy.',
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              About Me
            </h1>

            <div className="prose prose-lg max-w-none mb-12">
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

            {/* Skills Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-8">
                Skills & Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {aboutData.skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-200 pb-2">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-surface rounded-lg p-8 mt-12">
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
                    className="text-accent hover:text-primary transition-colors"
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
                        className="inline-flex items-center gap-2 text-accent hover:text-primary font-medium transition-colors"
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
    </>
  );
}
