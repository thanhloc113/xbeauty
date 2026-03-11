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
          media="https://i.pinimg.com/736x/b3/88/b4/b388b419365b411aa8ba4c35a1cf2ecd.jpg"
          ratio="vertical"
          link="/xinh-dep"
          buttonText="Anh ơi"
        />
        <Item
          title="💓Em muốn đi biển 💓"
          media="image/sexy2.jpg"
          ratio="vertical"
          link="/di-bien"
          buttonText="Anh ưi"
        />
        <Item
          title="💖 Em muốn nhận quà 💖"
          media="https://i.pinimg.com/736x/30/aa/cb/30aacb23fd69a74a66038304fef431a2.jpg"
          ratio="vertical"
          link="/nhan-qua"
          buttonText="Anh iu"
        />
    </Gallery>

      </Section>
      

      <Footer />

    </main>
  );
}