
export type Film = {
    id: number,
    title: string,
    description: string,
    videoUrl:string,
    poster: string,
}

export const ListFilm: Film[] = [
  {
    id: 1,
    title: "Your Name",
    description:
      "Liệu rằng một ngày nào đó, chúng ta có thể tìm thấy nhau?",
    videoUrl:
      "https://archive.org/download/ytsave-you-tube-media-ggdm-n-0-g-oog-your-name-ten-cau-la-gi-viet-sub-your-name-/YTSave_YouTube_Media_GGdmN0G_OOg_Your-Name-T%C3%AAn-C%E1%BA%ADu-L%C3%A0-G%C3%AC-Vi%E1%BB%87t-Sub-YourName-kiminonawa-vietsub_001_720p.mp4",
    poster:
      "https://cdn.wallpapersafari.com/72/21/31ydK2.jpg",
  },

  // Thêm video mới tại đây
  {
    id: 2,
    title: "Gặp Đường Mới Biết Thiệp - Full Mùa 1",
    description: "Bị lão đại quấn lấy",
    videoUrl: "https://archive.org/download/gap-thiep-moi-biet-duong-ss-1/g%E1%BA%B7p%20thi%E1%BB%87p%20m%E1%BB%9Bi%20bi%E1%BA%BFt%20%C4%91%C6%B0%E1%BB%9Dng%20ss1.mp4",
    poster: "https://ik.imagekit.io/7a7njhuhn/asasa.jpg",
  },
    // Thêm video mới tại đây
  {
    id: 3,
    title: "Gặp Đường Mới Biết Thiệp - Full Mùa 2",
    description: "Nhiệm vụ tháng 6: Giả làm bạn gái đại ma vương",
    videoUrl: "https://archive.org/download/gap-duong-moi-biet-thiep-full-ss-2/G%E1%BA%B7p%20%C4%90%C6%B0%E1%BB%9Dng%20M%E1%BB%9Bi%20Bi%E1%BA%BFt%20Thi%E1%BB%87p%20Full%20SS2.mp4",
    poster: "https://ik.imagekit.io/7a7njhuhn/2e1eqw.jpg",
  },
    {
    id: 4,
    title: "Gặp Đường Mới Biết Thiệp - Full Mùa 3",
    description: "Lần này không chạy nữa nhé",
    videoUrl: "https://archive.org/download/gap-duong-moi-biet-thiet-ss-3/G%E1%BA%B7p%20%C4%91%C6%B0%E1%BB%9Dng%20m%E1%BB%9Bi%20bi%E1%BA%BFt%20thi%E1%BB%87t%20SS3.mp4",
    poster: "https://ik.imagekit.io/7a7njhuhn/234234.jpg",
  },
];