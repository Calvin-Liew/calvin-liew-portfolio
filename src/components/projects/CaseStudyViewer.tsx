'use client';

import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import MobileCaseStudyCard from './MobileCaseStudyCard';

interface CaseStudyViewerProps {
  fileName: string;
  title: string;
  projectTitle: string;
  fileSize?: string;
}

export default function CaseStudyViewer({
  fileName,
  title,
  fileSize,
}: CaseStudyViewerProps) {
  const pdfUrl = `/case-studies/${fileName}`;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="case-study-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display italic text-3xl sm:text-4xl text-ink leading-tight">
            <span>
              Case study<span className="text-terracotta not-italic">.</span>
            </span>
          </h2>
          {fileSize && (
            <p
              className="text-base text-terracotta inline-block mt-1"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-2deg)',
              }}
            >
              ({fileSize})
            </p>
          )}
        </div>

        <a
          href={pdfUrl}
          download={fileName}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ink text-paper hover:bg-ink-soft hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-medium"
          aria-label={`Download ${title}`}
        >
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="inline sm:hidden">Download</span>
        </a>
      </div>

      {/* Desktop iframe */}
      <div className="hidden md:block relative">
        <div className="relative overflow-hidden rounded-xl border border-border bg-paper-deeper shadow-paper">
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-paper-deeper z-10">
              <div className="text-center">
                <div className="animate-pulse text-terracotta mb-2">
                  <FileText className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-ink-soft">Loading case study...</p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="flex items-center justify-center h-[600px] bg-paper-deeper">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-ink-soft" />
                <p className="text-ink-soft mb-4">
                  Unable to display PDF viewer
                </p>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ink text-paper hover:bg-ink-soft hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-medium"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          )}

          {!hasError && (
            <iframe
              src={pdfUrl}
              title={title}
              className="w-full h-[800px] border-0"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="block md:hidden">
        <MobileCaseStudyCard
          pdfUrl={pdfUrl}
          title={title}
          fileName={fileName}
        />
      </div>
    </div>
  );
}
