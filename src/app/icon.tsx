import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Favicon — matches the site's `calvin.` logo: handwritten Kalam "c"
// in ink + a small terracotta period, on a cream paper background.

export default async function Icon() {
  const kalamBold = await readFile(
    join(process.cwd(), 'src/app/_fonts/Kalam-Bold.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F8F4EE',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          fontFamily: 'Kalam',
          fontSize: 28,
          lineHeight: 1,
          color: '#1F1A17',
        }}
      >
        <span
          style={{
            display: 'flex',
            transform: 'rotate(-8deg)',
          }}
        >
          <span>c</span>
          <span style={{ color: '#C2410C' }}>.</span>
        </span>
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
