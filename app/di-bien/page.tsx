import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import VideoSlide from "@/components/VideoSlider";
import { SeaVideo } from "@/data/products";

export default function DiBien() {
  return (
    <main>

      <Navbar />
      <Hero
        as="h1"
        title="Đi đi em, đừng do dự trời tối mất !"
      />

         <VideoSlide videos={SeaVideo} />


      

      <Footer />

    </main>
  );
}