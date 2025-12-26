import { FileText, ExternalLink } from 'lucide-react';

interface MobileCaseStudyCardProps {
  pdfUrl: string;
  title: string;
  fileName: string;
}

export default function MobileCaseStudyCard({
  pdfUrl,
  title,
  fileName
}: MobileCaseStudyCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg
                 border border-border-light bg-surface p-8
                 text-center"
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="inline-flex items-center justify-center
                        w-16 h-16 rounded-full
                        bg-gradient-to-br from-cosmic-purple/20 to-cosmic-blue/20
                        border border-cosmic-purple/30">
          <FileText className="w-8 h-8 text-cosmic-purple" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold text-primary mb-2">
        View Full Case Study
      </h3>
      <p className="text-secondary text-sm mb-6">
        Open the complete case study in your browser&apos;s PDF viewer
      </p>

      {/* CTA Button */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
                   bg-gradient-to-r from-cosmic-purple to-cosmic-blue
                   hover:from-cosmic-violet hover:to-cosmic-cyan
                   text-white font-medium transition-all duration-300
                   hover:shadow-lg hover:shadow-cosmic-purple/50
                   active:scale-95"
      >
        View Case Study
        <ExternalLink className="w-5 h-5" />
      </a>

      {/* Gradient Border Effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100
                   transition-opacity duration-300 pointer-events-none
                   bg-gradient-to-br from-cosmic-purple/10 via-cosmic-blue/5
                   to-cosmic-cyan/10"
      />
    </div>
  );
}
