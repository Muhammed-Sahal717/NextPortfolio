import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Sahal - System Architect Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      // The Visual Design (HTML/CSS)
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505", // Your Black
          position: "relative",
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.3,
          }}
        />

        {/* Main Content Box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #84cc16", // Lime Border
            backgroundColor: "#000000",
            padding: "40px 80px",
            boxShadow: "15px 15px 0px #84cc16", // Hard Shadow
            zIndex: 10,
          }}
        >
          {/* Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              color: "#84cc16", // Lime Text
              fontSize: 24,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#84cc16",
                borderRadius: "50%",
              }}
            />
            System Online
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 130,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "white",
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              marginBottom: "20px",
            }}
          >
            SAHAL.
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 40,
              fontFamily: "monospace",
              color: "#a1a1aa", // Zinc-400
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Full Stack Architect
          </div>
        </div>

        {/* Decorative Corner Text */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            fontSize: 20,
            fontFamily: "monospace",
            color: "#52525b",
          }}
        >
          NEXT.JS 15 • SUPABASE • AI
        </div>
      </div>
    ),
    // Image Options
    {
      ...size,
    }
  );
}
