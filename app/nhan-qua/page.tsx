import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Item from "@/components/Item";
import Section from "@/components/Section";
import Footer from "@/components/Footer";

export default function NhanQua() {
  return (
    <main>

      <Navbar />

  
    <Section>
      <Gallery >
        <Item
          title="💖 Em muốn xinh đẹp 💖"
          media="image/sexy3.jpg"
          ratio="vertical"
          link="#"
          buttonText="Anh ơi"
        />
        <Item
          title="💓Em muốn đi biển 💓"
          media="image/sexy2.jpg"
          ratio="vertical"
          link="#"
          buttonText="Anh ưi"
        />
        <Item
          title="💖 Em muốn nhận quà 💖"
          media="image/sexy4.jpg"
          ratio="vertical"
          link="#"
          buttonText="Anh iu"
        />
    </Gallery>

      </Section>
      

      <Footer />

    </main>
  );
}