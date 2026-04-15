import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Item from "@/components/Item";
import Section from "@/components/Section";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>

      <Navbar />
      <Hero
        as="h1"
        title="Em bé cần anh giúp gì nè ?"
      />


    <Section>
      <Gallery >
        <Item
          title="💖 Em muốn xinh đẹp 💖"
          media="video/video4.mp4"
          ratio="vertical"
          type="video"
          link="/xinh-dep"
          buttonText="Anh ơii"
        />
        <Item
          title="💓Em muốn đi biển 💓"
          media="video/video5.mp4"
          ratio="vertical"
          type="video"
          link="/di-bien"
          buttonText="Anh ưii"
          zoomVideo={1.1}
        />
        {/* <Item
          title="💖 Em muốn nhận quà 💖"
          media="video/video7.mp4"
          ratio="vertical"
          type="video"
          link="/nhan-qua"
          buttonText="Anh iuu"
        /> */}
    </Gallery>

      </Section>
      

      <Footer />

    </main>
  );
}