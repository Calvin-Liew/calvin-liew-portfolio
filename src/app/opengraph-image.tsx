import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// OG image for social shares. Matches the site's hero: cream paper,
// handwritten "Calvin / Liew." stacked, terracotta period accent.

export const alt = "Calvin Liew — AI Workflows Product Analyst";
export const size = { width: 1200, height: 630 };
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

        {/* Spacer */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: '#C2410C',
            transform: 'rotate(-3deg)',
            transformOrigin: 'top left',
            marginBottom: 0,
          }}
        >
          hi, i&apos;m
        </div>

        {/* Calvin — top of stacked name */}
        <div
          style={{
            display: 'flex',
            fontSize: 180,
            color: '#1F1A17',
            lineHeight: 0.95,
            transform: 'rotate(-1.5deg)',
            transformOrigin: 'top left',
            marginLeft: -6,
            marginBottom: -16,
          }}
        >
          Calvin
        </div>

        {/* Liew. — offset right, with terracotta period */}
        <div
          style={{
            display: 'flex',
            fontSize: 170,
            color: '#1F1A17',
            lineHeight: 0.95,
            marginLeft: 140,
          }}
        >
          <span>Liew</span>
          <span style={{ color: '#C2410C' }}>.</span>
        </div>

        {/* Tagline below */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#3F3530',
            marginTop: 22,
            marginLeft: 24,
          }}
        >
          AI Workflows Product Analyst
        </div>

        {/* Bottom-right marker phrase */}
        <div
          style={{
            position: 'absolute',
            right: 70,
            bottom: 50,
            display: 'flex',
            fontSize: 28,
            color: '#3F3530',
            transform: 'rotate(-2deg)',
            transformOrigin: 'bottom right',
          }}
        >
          AI agents, data, strategy
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
