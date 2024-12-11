import { Request, Response } from "express";
import { createResponse } from "../utils/createResponse";
import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import Ffmpeg from "fluent-ffmpeg";

export const downloadController: any = async (req: Request, res: Response) => {
  try {
    const { videoUrl, outputFormat = "mp4", resolution = "360" } = req.body;

    if (!videoUrl) {
      return createResponse.error(res, "Missing URL or itag", 400);
    }

    // Validate video URL
    if (!ytdl.validateURL(videoUrl)) {
      return createResponse.error(res, "Invalid YouTube URL", 400);
    }

    const videoInfo = await ytdl.getBasicInfo(videoUrl);
    const videoTitle = videoInfo.videoDetails.title.replace(/[<>:"/\\|?*]/g, "_"); // Sanitize title
    const videoId = videoInfo.videoDetails.videoId;

    const filePath = path.join(__dirname, "..", "..", "downloads");
    const downloadPath = path.join(filePath, `${videoId}.${outputFormat}`); // Ensure downloadPath includes the file name

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    // Download and convert the video using ffmpeg
    Ffmpeg(videoUrl)
      .videoCodec("libx264") // Specify video codec (you can change this)
      .audioCodec("aac")    // Specify audio codec
      .output(downloadPath)
      .format(outputFormat)
      .videoBitrate("1024k") // Adjust bitrate as per resolution
      .audioBitrate("128k")
      .on("end", () => {
        console.log(`Video download and conversion complete: ${downloadPath}`);

        // Set response headers for the download
        res.setHeader("Content-Type", `video/${outputFormat}`);
        res.setHeader("Content-Disposition", `attachment; filename="${videoTitle}.${outputFormat}"`);

        // Stream the video to the client
        const fileStream = fs.createReadStream(downloadPath);
        fileStream.pipe(res);
      })
      .on("error", (err) => {
        console.error("Error during ffmpeg download or conversion:", err.message);
        return res.status(500).json({ error: "Failed to download video", details: err.message });
      })
      .run(); // Start downloading the video

  } catch (error: any) {
    console.error("Error during download:", error.message);
    return createResponse.error(res, "Error while downloading video", 500);
  }
};
