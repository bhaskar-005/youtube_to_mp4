"use server";
import NavFooterLayout from "../components/navFooterLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
// import AdSection from './components/AdSection'
import {
  Search,
  Download,
  Music,
  Video,
  LinkIcon,
  CheckCircle,
  HelpCircle,
  Shield,
  AlertCircle,
  Lock,
  PlayCircle,
  Globe,
  Smartphone,
} from "lucide-react";
import InputAndDownload from "../components/downloadUi";

export default async function HomePage() {
  return (
    <NavFooterLayout>
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-darkgreen">
          Download Videos with Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Enter a valid URL or search for videos to start downloading.
        </p>
       <div>
        <InputAndDownload/>
       </div>

        {/* How to Download Steps */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-6 text-darkgreen opacity-80">
            Download Videos With FastYouTubeMP4
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard
              icon={<LinkIcon size={40} />}
              title="1. Paste URL"
              description="Copy the video link from platforms like YouTube, Vimeo, or TikTok."
            />
            <FeatureCard
              icon={<CheckCircle size={40} />}
              title="2. Verify"
              description="Confirm the video details and select your preferred format."
            />
            <FeatureCard
              icon={<Download size={40} />}
              title="3. Download"
              description="Click download and save your video to enjoy offline."
            />
          </div>
        </div>

        <div id="about" className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-6 text-darkgreen opacity-80">
            About FastYouTubeMP4
          </h2>
          <p className="text-start text-gray-500">
            With FastYouTubeMP4, you can download and convert videos from
            countless online sources like YouTube, Twitter, Facebook, OK.ru,
            TikTok, and more. Its simple functionality requires you to paste the
            video URL, select your desired format, and click download. This
            user-friendly tool provides a straightforward way to acquire videos
            from the web.
          </p>
        </div>

        <br />
        <div id="how-to-download" className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-darkgreen opacity-80">
            How to download YouTube videos?
          </h2>
          <p className="text-start text-gray-500">
            1. Go to YouTube.com and search for a video you would like to
            download. Then copy the video URL from the browser address bar
            (youtube.com/watch?v=id).
            <br />
            <br />
            2. Paste the video URL in our YouTube Converter, and click on start
            <br />
            <br />
            3.choose your preferred download format. You can choose between MP3
            or MP4.
            <br /> <br />
            4. The conversion of the video will start, and it may take some
            time. Please note that it is only possible to download YouTube
            videos with a maximum length of 60 minutes. As soon as the
            conversion is completed you will be able to download the converted
            video.
            <br />
            <br />
            With the usage of FastYouTubeMP4 you are accepting our{" "}
            <strong>Terms of Use</strong>. We appreciate that you've chosen our
            MP3/MP4 Downloader.
          </p>
        </div>

        <div className="mt-10">
          <h2
            id="faq"
            className="text-2xl font-bold text-center mb-6 text-darkgreen opacity-80"
          >
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "Is downloading YouTube videos legal?",
                answer:
                  "Downloading videos is legal for personal, non-commercial use. Always respect copyright and content creator rights.",
              },
              {
                question: "Are there any video length limitations?",
                answer:
                  "Our service supports videos up to 60 minutes long. Longer videos may require splitting into multiple downloads.",
              },
              {
                question: "Do I need to create an account?",
                answer:
                  "No account required. You can download videos instantly without any registration.",
              },
              {
                question: "What video qualities are available?",
                answer:
                  "We offer multiple quality options from 360p to 1080p, depending on the original video's resolution.",
              },
              {
                question: "Can I download entire playlists?",
                answer:
                  "Currently, our service supports individual video downloads. Playlist downloading is a feature we're working on.",
              },
            ].map((faq, index) => (
              <div key={index} className="text-start">
                <h2 className="font-semibold text-gray-500">{faq.question}</h2>
                <p className="text-gray-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div>
          <p className="text-gray-500"></p>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-10">
          <FeatureCard 
            icon={<Download size={40} />}
            title="Fast Downloads"
            description="Get your favorite videos in seconds"
          />
          <FeatureCard 
            icon={<Video size={40} />}
            title="Multiple Formats"
            description="Choose from various video qualities"
          />
          <FeatureCard 
            icon={<Music size={40} />}
            title="Audio Extraction"
            description="Download audio-only versions"
          />
        </div> */}
      </div>
    </NavFooterLayout>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 hover:bg-green-50 border-[1px] border-green-200 cursor-pointer flex items-center flex-col gap-2 rounded-lg shadow-lg transition-all hover:shadow-2xl ">
      <div className="text-green-800 mb-4 bg-green-100 p-4 rounded-full">
        {icon}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-darkgreen">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
