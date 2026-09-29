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
          buttonText="Anh ơii"
        />
        <Item
          title="💓Em thích đi biển 💓"
          media="video/video5.mp4"
          ratio="vertical"
          type="video"
          link="/di-bien"
          buttonText="Anh ưii"
          zoomVideo={1.1}
        />
        <Item
          title="💖 Em thích trời mưa 💖"
          media="video/video9.mp4"
          ratio="vertical"
          type="video"
          link="/troi-mua"
          buttonText="Anh uii"
        />
    </Gallery>

      </Section>
      

      <Footer />

    </main>
  );
}