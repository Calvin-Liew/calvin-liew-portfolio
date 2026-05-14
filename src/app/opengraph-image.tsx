import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// OG image for social shares. Matches the site's hero: cream paper,
// handwritten "Calvin / Liew." stacked, terracotta period accent.

export const alt = "Calvin Liew — AI Workflows Product Analyst";
// LinkedIn-recommended OG thumbnail size: 1200 x 627 (1.91:1 ratio)
export const size = { width: 1200, height: 627 };
export const contentType = 'image/png';

export default async function Image() {
  const kalamBold = await readFile(
    join(process.cwd(), 'src/app/_fonts/Kalam-Bold.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #F8F4EE 0%, #F1EBDF 60%, #ECE4D4 100%)',
          padding: '60px 80px',
          fontFamily: 'Kalam',
          position: 'relative',
        }}
      >
        {/* Warm light wash, top-left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 700,
            height: 460,
            background:
              'radial-gradient(ellipse at top left, rgba(254, 215, 170, 0.45), transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top-left logo: calvin. */}
        <div
          style={{
            position: 'absolute',
            top: 56,
            left: 80,
            display: 'flex',
            fontSize: 36,
            color: '#1F1A17',
            transform: 'rotate(-3deg)',
            transformOrigin: 'top left',
          }}
        >
          <span>calvin</span>
          <span style={{ color: '#C2410C' }}>.</span>
        </div>

        {/* Eyebrow — slight tilt, centered */}
        <div
          style={{
            display: 'flex',
            fontSize: 38,
            color: '#C2410C',
            transform: 'rotate(-2deg)',
            marginBottom: 18,
          }}
        >
          hi, i&apos;m
        </div>

        {/* Main name on one line: Calvin Liew. — centered, no overflow */}
        <div
          style={{
            display: 'flex',
            fontSize: 156,
            color: '#1F1A17',
            lineHeight: 0.95,
            transform: 'rotate(-1deg)',
          }}
        >
          <span>Calvin Liew</span>
          <span style={{ color: '#C2410C' }}>.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: '#3F3530',
            marginTop: 28,
          }}
        >
          AI Workflows Product Analyst
        </div>

        {/* Accent line — secondary marker, slight tilt */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#C2410C',
            marginTop: 14,
            transform: 'rotate(-1.5deg)',
          }}
        >
          AI agents &middot; data &middot; strategy
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Kalam',
          data: kalamBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
