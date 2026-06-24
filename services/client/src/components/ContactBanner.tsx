export default function ContactBanner() {
  return (
    <div id="contact" style={{ position: "relative", width: "100%", background: "#000000" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/contact.jpg"
        alt="Contact"
        style={{ width: "100%", height: "900px", objectFit: "fill", display: "block" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
    </div>
  );
}
