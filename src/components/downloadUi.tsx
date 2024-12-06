"use client";

import { DownloadIcon, LinkIcon, VolumeOff } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import useVidFormate from "@/hooks/useVidFormate";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";
import useDownloadHook from "@/hooks/useDownload";

const InputAndDownload = () => {
  const [videoUrl, setVideoUrl] = React.useState("");
  const [showAll, setShowAll] = useState(false);
  // const [videoFormats, setVideoFormats] = useState([]);
  const { isError, isPending, isSuccess, mutate, data } = useVidFormate();
  const downloadInfo = useDownloadHook();
  const isValidUrl = (url: string) => {
    try {
      new URL(url); // Tries to create a valid URL
      return true; // URL is valid
    } catch (error) {
      return false; // URL is invalid
    }
  };

  const handleFormUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      return;
    }
    if (!isValidUrl(videoUrl)) {
      toast.error("Please enter a valid URL.");
      return;
    }

    const vidFormate = mutate(videoUrl);
    //   console.log(vidFormate);
  };
  // console.log(data?.data);
  console.log(data?.data?.data?.videoFormates);
  const videoFormats = data?.data?.data?.videoFormates || [];

  return (
    <div>
      <form
        className="flex space-x-2 mb-12 bg-green-100 rounded-lg px-5 py-8"
        onSubmit={handleFormUpload}
      >
        <div className="relative flex-grow">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter video URL"
            onChange={(e) => setVideoUrl(e.target.value)}
            className="pl-14 pr-4 py-6 w-full rounded-lg shadow-lg focus:ring-2 focus:ring-green-300 border-darkgreen focus:border-white"
          />
        </div>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-6 shadow-lg transition-transform hover:scale-105"
        >
          Search
        </Button>
      </form>

      <div>
        {isError && <p className="text-red-500">Invalid URL</p>}
        {isPending || downloadInfo?.isPending &&  <p className="text-gray-500">Loading...</p>}
        {isSuccess && (
            <>
            <div 
             className="w-full flex justify-end" 
             onClick={()=>showAll? setShowAll(false):setShowAll(true)}>
              <p className="underline opacity-80 cursor-pointer text-darkgreen ">{showAll?"show less":"show all"}</p>
            </div>
          <div className=" bg-green-100 rounded-lg py-10 flex sm:flex-row flex-col gap-3 w-full  justify-center">
            <div className="flex flex-col sm:w-[40%] w-full items-center">
              <Image
                className="shadow-lg"
                src={data?.data?.data.videoThumbnail.url}
                alt={`thumbnail_${data?.data?.data.videoName}`}
                width={data?.data?.data.videoThumbnail.width}
                height={data?.data?.data.videoThumbnail.height}
              />
              <p className="text-lg text-darkgreen font-semibold my-4">
                {data?.data?.data.videoName}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {videoFormats.length > 0 ? (
                videoFormats
                //   .filter((f: any) => f.qualityLabel)
                  .slice(0, showAll ? videoFormats.length : 4)
                  .map((format: any, index: any) => (
                    <Card
                      key={index}
                      className="flex justify-between w-full gap-5 bg-white shadow-lg rounded-lg px-4 py-2"
                    >
                    <div className="flex justify-between items-center gap-4">
                      <CardTitle className="text-lg text-darkgreen font-semibold">
                        {format.qualityLabel}.{format.container}
                      </CardTitle>
                      <div>
                        {format.audioBitrate ? (
                          <p className=" text-sm text-green-500">
                            Audio: Yes
                          </p>
                        ) : (
                          <p className=" text-sm text-red-500 flex items-center">
                            Audio: No{" "}
                            <VolumeOff className="ml-2 text-sm text-gray-500" />
                          </p>
                        )}
                      </div>
                      </div>
                      <Button
                        className="bg-green-600 text-white flex items-center gap-2"
                        onClick={() => downloadInfo.mutate({videoUrl, itag:format.itag})} 
                      >
                        <DownloadIcon className="text-lg" />
                        Download
                      </Button>
                    </Card>
                  ))
              ) : (
                <p className="text-gray-500">No video formats available.</p>
              )}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputAndDownload;
