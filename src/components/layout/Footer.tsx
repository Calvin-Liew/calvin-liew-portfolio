import Link from 'next/link';
import Container from './Container';
import SocialLinks from '../ui/SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border-light">
      <Container>
        <div className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <SocialLinks variant="footer" />

            {/* Copyright */}
            <div className="text-sm text-muted">
              © {currentYear} Calvin Liew. All rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
