import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import VideoSlide from "@/components/VideoSlider";
import { SeaVideo } from "@/data/products";
import OceanCard from "@/components/OceanCard";




export default function DiBien() {
  return (
    <main>

      <Navbar />
      <Hero
        as="h1"
        title="Mọi nỗi buồn sẽ theo sóng biển cuốn vào đại dương xanh !"
        videoSrc="https://archive.org/download/snaptik.vn_7671896936160529671/snaptik.vn_7671896936160529671.mp4"
      />

      <VideoSlide videos={SeaVideo} />

      {/* <div className="mx-auto flex w-full max-w-5xl justify-center mt-5 mb-20">
        <WeatherCard />
      </div> */}

      <div className="mx-auto flex w-full max-w-5xl justify-center mt-5 mb-20">
        <OceanCard/>

      </div>
      
 

      <Footer />

    </main>
  );
}