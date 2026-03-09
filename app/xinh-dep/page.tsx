import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Item from "@/components/Item";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import SlideShow from "@/components/SlideShow";
const items = [
  {
    title: "💖 Em muốn xinh đẹp 💖",
    media: "image/sexy3.jpg",
    link: "#",
  },
  {
    title: "💓Em muốn đi biển 💓",
    media: "image/sexy2.jpg",
    link: "#",
  },
  {
    title: "💖 Em muốn nhận quà 💖",
    media: "image/sexy4.jpg",
    link: "#",
  },
  {
    title: "🎥 Video thử",
    media: "image/sexy1.jpg",
    link: "#",
  },
    {
    title: "🎥 Video thử",
    media: "image/sexy1.jpg",
    link: "#",
  },
      {
    title: "🎥 Video thử",
    media: "image/sexy1.jpg",
    link: "#",
  },

];
export default function XinhDep() {
  return (
    <main>

      <Navbar />
        <Hero
          as="p"
          title="Em bé cần anh giúp gì nè ?"
          colors = {["#00b100", "#04b4b4", "#09c466"]}
        />
 
    <Section>
      <SlideShow
        introTitle="Những điều em thích 💕"
        background="#111"
        items={items}
      />

      </Section>
      

      <Footer />

    </main>
  );
}