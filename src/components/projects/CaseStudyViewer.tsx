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
  projectTitle,
  fileSize
}: CaseStudyViewerProps) {
  const pdfUrl = `/case-studies/${fileName}`;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="case-study-section">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-cosmic-purple" />
          <h2 className="text-2xl font-semibold text-primary">
            Case Study
          </h2>
          {fileSize && (
            <span className="text-sm text-secondary">
              ({fileSize})
            </span>
          )}
        </div>

        {/* Download Button */}
        <a
          href={pdfUrl}
          download={fileName}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                     border-2 border-border-light hover:border-cosmic-purple
                     bg-transparent hover:bg-cosmic-purple/5
                     text-foreground font-medium transition-all duration-300
                     hover:shadow-md hover:shadow-cosmic-purple/20
                     active:scale-95"
          aria-label={`Download ${title}`}
        >
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="inline sm:hidden">Download</span>
        </a>
      </div>

      {/* Desktop/Tablet PDF Viewer */}
      <div className="hidden md:block relative">
        <div
          className="relative overflow-hidden rounded-lg
                     border border-border-light
                     hover:border-cosmic-purple/40
                     transition-all duration-300
                     bg-surface"
        >
          {/* Loading Skeleton */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center
                            bg-surface z-10">
              <div className="text-center">
                <div className="animate-pulse text-cosmic-purple mb-2">
                  <FileText className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-secondary">Loading case study...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="flex items-center justify-center h-[600px]
                            bg-surface">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <p className="text-secondary mb-4">
                  Unable to display PDF viewer
                </p>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                             bg-cosmic-purple hover:bg-cosmic-violet
                             text-white font-medium transition-all duration-300
                             hover:shadow-lg hover:shadow-cosmic-purple/50"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
          )}

          {/* PDF Iframe */}
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

      {/* Mobile CTA Card */}
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
