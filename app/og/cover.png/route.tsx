import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#080b12',
          color: '#f5f7fa',
          padding: '56px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background decoration */}

        <div
          style={{
            position: 'absolute',
            top: '-250px',
            right: '-200px',
            width: '850px',
            height: '850px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, #172e52 0%, #080b12 70%)',
          }}
        />

        {/* Top branding */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              border: '1px solid #365d94',
              backgroundColor: '#14243d',
              color: '#93c5fd',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            EM
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
              }}
            >
              Eddy Mouity
            </div>

            <div
              style={{
                fontSize: '18px',
                color: '#a1aaba',
              }}
            >
              Independent Software Developer
            </div>
          </div>
        </div>

        {/* Main content */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '60px',
              fontWeight: 700,
              letterSpacing: '-3px',
              lineHeight: 1.15,
            }}
          >
            Building software
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '60px',
              fontWeight: 700,
              letterSpacing: '-3px',
              lineHeight: 1.15,
              color: '#93c5fd',
            }}
          >
            that makes a difference.
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '24px',
              fontSize: '23px',
              color: '#a1aaba',
              lineHeight: 1.5,
              maxWidth: '950px',
            }}
          >
            Custom web applications, backend systems,
            APIs and digital solutions for businesses.
          </div>

          {/* Technology tags */}

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px',
            }}
          >
            {[
              'Node.js',
              'TypeScript',
              'Go',
              'Java',
              'Spring Boot',
              'React',
            ].map((technology) => (
              <div
                key={technology}
                style={{
                  display: 'flex',
                  border: '1px solid #293548',
                  borderRadius: '9px',
                  padding: '10px 18px',
                  backgroundColor: '#101722',
                  color: '#cbd5e1',
                  fontSize: '17px',
                }}
              >
                {technology}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #202a3a',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '20px',
              color: '#93c5fd',
              fontWeight: 600,
            }}
          >
            www.eddymouity.dev
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#a1aaba',
              fontSize: '18px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#34d399',
              }}
            />

            Based in South Korea
          </div>
        </div>
      </div>
    ),

    {
      width: 1200,
      height: 630,
    },
  );
}
