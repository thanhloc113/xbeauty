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
        title={'Chào em bé\nHôm nay em bé thích gì nè ?'}
      />


    <Section>
      <Gallery >
        <Item
          title="💖 Em thích xinh đẹp 💖"
          media="video/video4.mp4"
          ratio="vertical"
          type="video"
          link="/xinh-dep"
          buttonText="Khám phá"
        />

        <Item
          title="💓Em thích đi biển 💓"
          media="video/video5.mp4"
          ratio="vertical"
          type="video"
          link="/di-bien"
          buttonText="Khám phá"
          zoomVideo={1.1}
        />

        <Item
          title="💖 Em thích trời mưa 💖"
          media="video/cauvong2.mp4"
          ratio="vertical"
          type="video"
          link="/troi-mua"
          buttonText="Khám phá"
        />
    </Gallery>

      </Section>
      <Footer />

    </main>
  );
}