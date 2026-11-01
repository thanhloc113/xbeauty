
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SpecialDay = {
  date: string;
  title: string;
  description: string;
};

type MusicTrack = {
  src: string;
  title: string;
  artist: string;
};

type DreamyExperienceProps = {
  videoSrc?: string;
  posterSrc?: string;
  specialDays?: SpecialDay[];
  musicTracks?: {
    morning: MusicTrack;
    noon: MusicTrack;
    evening: MusicTrack;
    lateNight: MusicTrack;
  };
};

const DEFAULT_SPECIAL_DAYS: SpecialDay[] = [
  {
    date: "01-01",
    title: "Tết Dương lịch",
    description: "Chào đón một năm mới với những khởi đầu mới.",
  },
  {
    date: "02-14",
    title: "Ngày Valentine",
    description: "Ngày dành cho tình yêu và những điều ngọt ngào.",
  },
  {
    date: "04-30",
    title: "Ngày Giải phóng miền Nam",
    description: "Kỷ niệm ngày đất nước thống nhất.",
  },
  {
    date: "05-01",
    title: "Ngày Quốc tế Lao động",
    description: "Tôn vinh những đóng góp của người lao động.",
  },
  {
    date: "09-02",
    title: "Ngày Quốc khánh Việt Nam",
    description: "Kỷ niệm ngày Quốc khánh của Việt Nam.",
  },
  {
    date: "10-20",
    title: "Ngày Phụ nữ Việt Nam",
    description: "Dành những yêu thương đến một nửa thế giới.",
  },
  {
    date: "11-20",
    title: "Ngày Nhà giáo Việt Nam",
    description: "Tri ân những người gieo mầm tri thức.",
  },
  {
    date: "12-25",
    title: "Lễ Giáng sinh",
    description: "Mùa lễ hội của yêu thương và sẻ chia.",
  },
  {
    date: "2027-02-06",
    title: "Tết Nguyên Đán Đinh Mùi",
    description: "Chào đón năm mới âm lịch và sum họp gia đình.",
  },
];

const QUOTES = [
  {
    text: "Every day is a new beginning.",
    translation: "Mỗi ngày đều là một khởi đầu mới.",
  },
  {
    text: "Collect moments, not things.",
    translation: "Hãy lưu giữ những khoảnh khắc, không chỉ những món đồ.",
  },
  {
    text: "Bloom at your own pace.",
    translation: "Hãy nở hoa theo nhịp điệu của riêng mình.",
  },
  {
    text: "Somewhere, something wonderful is waiting.",
    translation: "Ở đâu đó, những điều tuyệt vời đang chờ đợi.",
  },
  {
    text: "Let life surprise you.",
    translation: "Hãy để cuộc sống mang đến những bất ngờ.",
  },
  {
    text: "You deserve all the little things that make you happy.",
    translation: "Em xứng đáng với tất cả những điều nhỏ bé khiến em hạnh phúc.",
  },
  {
    text: "Take your time. Beautiful things take time.",
    translation: "Cứ từ từ thôi. Những điều đẹp đẽ luôn cần thời gian.",
  },
];

const DEFAULT_MUSIC = {
  morning: {
    src: "https://ik.imagekit.io/7a7njhuhn/M%E1%BB%98T-TRI%E1%BB%86U-LIKE-x-LE-TOUR-DE-TRANCE-%C4%90EN-x-ORJAN-NILSEN-VIETZ-REMIX.m4a",
    title: "MỘT TRIỆU LIKE x LE TOUR DE TRANCE (ĐEN x ORJAN NILSEN)",
    artist: "Daily Moments",
  },
  noon: {
    src: "https://ik.imagekit.io/7a7njhuhn/%C4%90%E1%BA%A1i-s%C6%A1n-Ng%E1%BB%8Dn-n%C3%BAi-l%E1%BB%9Bn-V%C6%B0%C6%A1ng-Du%E1%BB%87-Tr%C3%A1c-%E5%A4%A7%E5%B1%B1-%E7%8E%8B%E7%9D%BF%E5%8D%93_006_128k.m4a",
    title: "Đại Sơn - Vương Duệ Trác | 大山 - 王睿卓",
    artist: "Daily Moments",
  },
  evening: {
    src: "https://ik.imagekit.io/7a7njhuhn/B%C3%A8o-D%E1%BA%A1t-M%C3%A2y-Tr%C3%B4i-Phi%C3%AAn-B%E1%BA%A3n-%C4%90i%E1%BB%87n-%E1%BA%A2nh-Vietnamese-Folk-Epic_008_128k.m4a",
    title: "Bèo dạt mây trôi - Epic music",
    artist: "Daily Moments",
  },
    lateNight: {
    src: "https://ik.imagekit.io/7a7njhuhn/Hello-em-c%C3%B3-kh%E1%BB%8Fe-kh%C3%B4ng.m4a",
    title: "Hello em có khỏe không ? - Dfoxie37 & Myhoa & Tuann",
    artist: "Daily Moments",
  },
};

const TIME_ZONE = "Asia/Ho_Chi_Minh";
const DAY_MS = 86400000;

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

function getDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
  };
}

function getEvents(year: number, specialDays: SpecialDay[]) {
  return specialDays.flatMap((item) => {
    const parts = item.date.split("-").map(Number);

    const eventYear = parts.length === 3 ? parts[0] : year;
    const month = parts.length === 3 ? parts[1] : parts[0];
    const day = parts.length === 3 ? parts[2] : parts[1];

    if (eventYear !== year) return [];

    const dateKey =
      `${eventYear}-${formatNumber(month)}-${formatNumber(day)}`;

    const timestamp = Date.parse(`${dateKey}T00:00:00+07:00`);

    if (!Number.isFinite(timestamp)) return [];

    const validDate = new Date(timestamp).toLocaleDateString(
      "en-CA",
      { timeZone: TIME_ZONE }
    );

    if (validDate !== dateKey) return [];

    return [{ ...item, timestamp }];
  });
}

function getMusicPeriod(date: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_ZONE,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(date)
  );

  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "noon";
   if (hour >= 17 && hour < 22) return "evening";

  return "lateNight";
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${formatNumber(remainingSeconds)}`;
}

export default function DreamyExperience({
  videoSrc = "/videos/background.mp4",
  posterSrc = "",
  specialDays = DEFAULT_SPECIAL_DAYS,
  musicTracks = DEFAULT_MUSIC,
}: DreamyExperienceProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Đồng hồ Việt Nam.
  useEffect(() => {
    const updateTime = () => setNow(new Date());

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateParts = useMemo(() => {
    if (!now) return null;
    return getDateParts(now);
  }, [now]);

  // Quote cố định theo ngày.
  const quote = useMemo(() => {
    if (!dateParts) return QUOTES[0];

    const dateKey = Math.floor(
      Date.UTC(
        dateParts.year,
        dateParts.month - 1,
        dateParts.day
      ) / DAY_MS
    );

    return QUOTES[
      ((dateKey % QUOTES.length) + QUOTES.length) %
        QUOTES.length
    ];
  }, [dateParts]);

  // Ngày đặc biệt tiếp theo.
  const upcomingEvent = useMemo(() => {
    if (!dateParts) return null;

    const todayTimestamp = Date.parse(
      `${dateParts.year}-${formatNumber(dateParts.month)}-${formatNumber(dateParts.day)}T00:00:00+07:00`
    );

    const events = [
      ...getEvents(dateParts.year, specialDays),
      ...getEvents(dateParts.year + 1, specialDays),
    ];

    return (
      events
        .filter((event) => event.timestamp >= todayTimestamp)
        .sort((a, b) => a.timestamp - b.timestamp)[0] ?? null
    );
  }, [dateParts, specialDays]);

  const daysUntil = useMemo(() => {
    if (!dateParts || !upcomingEvent) return null;

    const todayTimestamp = Date.parse(
      `${dateParts.year}-${formatNumber(dateParts.month)}-${formatNumber(dateParts.day)}T00:00:00+07:00`
    );

    return Math.round(
      (upcomingEvent.timestamp - todayTimestamp) / DAY_MS
    );
  }, [dateParts, upcomingEvent]);

  // Nhạc theo khung giờ.
  const musicPeriod = useMemo(() => {
    if (!now) return "morning" as const;
    return getMusicPeriod(now);
  }, [now]);

  const activeTrack = musicTracks[musicPeriod];

  // Dừng bài cũ khi đổi khung giờ.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [activeTrack.src]);

// Theo dõi trạng thái và tiến trình audio.
const syncCurrentTime = (audio: HTMLAudioElement) => {
  setCurrentTime(audio.currentTime || 0);
};

const syncDuration = (audio: HTMLAudioElement) => {
  setDuration(
    Number.isFinite(audio.duration) ? audio.duration : 0
  );
};

const handleAudioPlay = () => {
  setIsPlaying(true);
};

const handleAudioPause = () => {
  setIsPlaying(false);
};

const handleAudioEnded = () => {
  setIsPlaying(false);
};

const toggleMusic = async () => {
  const audio = audioRef.current;

  if (!audio) return;

  try {
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }

    setIsPlaying(!audio.paused);
  } catch (error) {
    setIsPlaying(false);
    console.error("Audio playback error:", error);
  }
};


  if (!now || !dateParts) {
    return (
      <section className="flex h-[70dvh] w-full items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-pink-200" />
      </section>
    );
  }

  return (
    <section className="relative isolate flex h-[70dvh] w-full flex-col overflow-hidden bg-black text-white">

      {/* VIDEO BACKGROUND */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        src={videoSrc}
        // poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* BLACK OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/30 to-black/75" />

      <div className="absolute inset-0 -z-10 bg-black/10" />

      {/* CONTENT CONTAINER */}
      <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col px-5 py-4 sm:px-10 sm:py-5 lg:px-16">


      {/* DATE - UPCOMING EVENT - CLOCK */}
      <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-5">
        {/* DATE */}
        <div className="flex min-w-0 flex-col gap-1 text-left">
          <span className="truncate text-[8px] font-medium tracking-[2px] text-pink-200 sm:text-xs sm:tracking-[3px]">
            Hôm Nay:{" "}<br/>
            {now
              .toLocaleDateString("vi-VN", {
                weekday: "long",
                timeZone: TIME_ZONE,
              })
              .toUpperCase()}
          </span>

          <span className="text-[10px] font-light tracking-wider text-white/90 sm:text-base">
            {now.toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: TIME_ZONE,
            })}
          </span>
        </div>

        {/* UPCOMING SPECIAL DAY */}
        <div className="flex min-w-0 w-[160px] sm:w-[240px] flex-col items-center gap-1.5 rounded-xl border border-white/20 bg-black/25 px-2 py-2 sm:px-5 sm:py-2.5 text-center backdrop-blur-md">
          <span className="whitespace-nowrap text-[7px] font-medium tracking-[1.5px] text-pink-200 sm:text-[9px] sm:tracking-[2px]">
            SPECIAL DAY IS COMING
          </span>

          {upcomingEvent && daysUntil !== null ? (
            <>
              <span className="w-full truncate text-[10px] font-medium sm:text-sm">
                {upcomingEvent.title}
              </span>

              {/* EVENT DESCRIPTION */}
              <p className="w-full text-[8px] leading-relaxed text-white/75 line-clamp-2 sm:text-[10px]">
                {upcomingEvent.description}
              </p>

              <span className="whitespace-nowrap text-[8px] text-white/75 sm:text-xs">
                {new Date(upcomingEvent.timestamp).toLocaleDateString(
                  "vi-VN",
                  { timeZone: TIME_ZONE }
                )}

                <span className="mx-1.5 text-pink-200">✧</span>

                <span className="font-medium text-pink-200">
                  {daysUntil === 0
                    ? "Hôm nay"
                    : `Còn ${daysUntil} ngày`}
                </span>
              </span>
            </>
          ) : (
            <span className="text-[9px] text-white/70">
              No upcoming event
            </span>
          )}
        </div>

        {/* CLOCK */}
        <div className="flex min-w-0 flex-col items-end gap-1 text-right">
          <div className="whitespace-nowrap font-light tabular-nums tracking-[1px] text-white text-xl sm:text-4xl lg:text-5xl sm:tracking-[2px]">
            {now.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
              timeZone: TIME_ZONE,
            })}
          </div>

          <span className="text-[7px] uppercase tracking-[2px] text-pink-200/80 sm:text-[9px] sm:tracking-[3px]">
            Create wonderful things of your own.
          </span>
        </div>
      </div>


        {/* MAIN CONTENT AREA */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-evenly gap-2 py-3 text-center">

          {/* GREETING */}
          <div className="flex shrink-0 flex-col items-center gap-2">

            {/* <span className="text-[8px] tracking-[4px] text-pink-200 sm:text-[10px]">
              A LITTLE MESSAGE FOR YOU
            </span> */}

            <h1 className="font-serif text-2xl font-normal italic leading-snug text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
              Chào em bé
              <br />
              Hôm nay em bé thích gì nè?
            </h1>

            <div className="flex items-center gap-3 text-pink-200">
              <span className="h-px w-8 bg-pink-200/50" />
              <span className="text-sm">✧</span>
              <span className="h-px w-8 bg-pink-200/50" />
            </div>
          </div>

          {/* DAILY QUOTE */}
          <div className="flex w-full max-w-[650px] shrink-0 flex-col items-center gap-1 px-2">

            <blockquote className="font-serif text-xs italic leading-relaxed text-white drop-shadow-md sm:text-base lg:text-lg">
              “{quote.text}”
            </blockquote>

            <p className="text-[9px] font-light leading-relaxed text-white/80 sm:text-xs">
              {quote.translation}
            </p>
          </div>

        </div>

        {/* MUSIC PLAYER */}
        <div className="mx-auto w-full max-w-[540px] shrink-0">

        <audio
          ref={audioRef}
          src={activeTrack.src}
          preload="auto"
          loop
          onTimeUpdate={(event) => {
            syncCurrentTime(event.currentTarget);
          }}
          onLoadedMetadata={(event) => {
            syncDuration(event.currentTarget);
            syncCurrentTime(event.currentTarget);
          }}
          onDurationChange={(event) => {
            syncDuration(event.currentTarget);
          }}
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
          onEnded={handleAudioEnded}
          onSeeked={(event) => {
            syncCurrentTime(event.currentTarget);
          }}
        />

          <div className="rounded-2xl border border-white/20 bg-black/30 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:px-5 sm:py-3">

            {/* TRACK INFORMATION */}
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xl text-pink-100 sm:h-10 sm:w-10">
                ♫
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">

                <span className="text-[8px] tracking-[2px] text-pink-200">
                  {musicPeriod === "morning"
                    ? "Một ngày mới tràn đầy hứng khởi"
                    : musicPeriod === "noon"
                      ? "Thư giãn nạp năng lượng"
                      : musicPeriod === "evening" 
                        ? "Khoảnh khắc nhẹ nhàng dành riêng cho em" 
                         : "Mọi chuyện rồi sẽ ổn thôi" }
                </span>

                <strong className="truncate text-[11px] font-medium sm:text-sm">
                  {activeTrack.title}
                </strong>

                <span className="truncate text-[9px] text-white/60">
                  {activeTrack.artist}
                </span>

              </div>

              <button
                type="button"
                onClick={toggleMusic}
                aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-sm text-white transition-all hover:scale-105 hover:bg-pink-200/30 active:scale-95"
              >
                {isPlaying ? "Ⅱ" : "▶"}
              </button>

            </div>

         
          {/* MUSIC PROGRESS */}
          <div className="mt-2 flex items-center gap-3">
            <span className="min-w-[32px] text-[9px] tabular-nums text-white/70">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => {
                const audio = audioRef.current;

                if (!audio) return;

                const seekTime = Number(event.currentTarget.value);

                audio.currentTime = seekTime;
                setCurrentTime(seekTime);
              }}
              disabled={!duration}
              aria-label="Tiến trình phát nhạc"
              className="h-1 min-w-0 flex-1 cursor-pointer accent-pink-200"
            />

            <span className="min-w-[32px] text-right text-[9px] tabular-nums text-white/70">
              {formatTime(duration)}
            </span>
          </div>
          
          </div>
        </div>

      </div>
    </section>
  );
}
