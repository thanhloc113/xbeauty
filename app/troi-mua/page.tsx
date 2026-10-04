import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WeatherCard from "@/components/WeatherCard";

export default function TroiMua() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero
        as="h1"
        title="Một Chiếc Tiramisu Dâu Và Một Ly Trà Táo Đỏ !!!"
      />

      <div className="mx-auto flex w-full max-w-5xl justify-center mt-5 mb-20">
        <WeatherCard />
      </div>
         



<div className="mx-auto w-full max-w-5xl">
  <div className="mb-4">
    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
      Your Name
    </h2>

    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Liệu rằng một ngày nào đó, chúng ta thể tìm thấy nhau ?
    </p>
  </div>

  <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
    <video
      src="https://archive.org/download/ytsave-you-tube-media-ggdm-n-0-g-oog-your-name-ten-cau-la-gi-viet-sub-your-name-/YTSave_YouTube_Media_GGdmN0G_OOg_Your-Name-T%C3%AAn-C%E1%BA%ADu-L%C3%A0-G%C3%AC-Vi%E1%BB%87t-Sub-YourName-kiminonawa-vietsub_001_720p.mp4"
      preload="metadata"
      poster="https://images5.alphacoders.com/737/thumb-1920-737385.jpg"
      controls
      controlsList="nodownload"
      disablePictureInPicture
      className="h-full w-full object-contain"
    />
  </div>
</div>



      <Footer />
    </main>
  );
}