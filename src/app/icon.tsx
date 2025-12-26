import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#121212',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#a78bfa' }} />
              <stop offset="50%" style={{ stopColor: '#8b5cf6' }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4' }} />
            </linearGradient>
          </defs>
          <path
            d="M70,30 Q65,20 50,20 Q30,20 20,35 L20,65 Q30,80 50,80 Q65,80 70,70 L60,65 Q57,70 50,70 Q38,70 33,60 L33,40 Q38,30 50,30 Q57,30 60,35 Z"
            fill="url(#grad)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
