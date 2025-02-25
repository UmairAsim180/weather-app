import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="flex justifyce">
        <div className="location">Lahore</div>
        <div className="temp">31 &deg; C</div>
        <div className="text">Partly Cloudy</div>
        <div className="hi_lo">H:88 &deg; L:18 &deg;</div>
      </section>
    </>
  );
}
