import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import VideoSlide from "@/components/VideoSlider";
import { SeaVideo } from "@/data/products";
import OceanCard from "@/components/OceanCard";
import WeatherCard from "@/components/WeatherCard";

export default function DiBien() {
  return (
    <main>

      <Navbar />
      <Hero
        as="h1"
        title="Đi đi em, đừng do dự trời tối mất !"
      />

      <VideoSlide videos={SeaVideo} />

      <div className="mx-auto flex w-full max-w-5xl justify-center mt-5 mb-20">
        <WeatherCard />
      </div>

      <div className="mx-auto flex w-full max-w-5xl justify-center mt-5 mb-20">
        <OceanCard/>

      </div>
      
 

      <Footer />

    </main>
  );
}