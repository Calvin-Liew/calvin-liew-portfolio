import { ExternalLink } from 'lucide-react';
import { Doodle } from '../ui/HandDrawn';

interface MobileCaseStudyCardProps {
  pdfUrl: string;
  title: string;
  fileName: string;
}

export default function MobileCaseStudyCard({ pdfUrl }: MobileCaseStudyCardProps) {
  return (
    <div className="relative bg-paper-deeper border border-border rounded-xl shadow-paper p-8 text-center">
      {/* Doodle */}
      <div className="mb-4 flex justify-center">
        <Doodle
          name="paperplane"
          className="w-12 h-12 text-terracotta"
          color="currentColor"
        />
      </div>

      <h3 className="font-display text-xl text-ink mb-2">
        View full case study
      </h3>
      <p className="text-sm text-ink-soft mb-6">
        Open the complete case study in your browser&apos;s PDF viewer.
      </p>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ink text-paper hover:bg-ink-soft hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-medium"
      >
        View case study
        <ExternalLink className="w-5 h-5" />
      </a>
    </div>
  );
}
