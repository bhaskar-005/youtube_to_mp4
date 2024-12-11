import { createResponse } from "../../../utils/createResponse";
import { NextRequest } from "next/server";
import ytdl from 'ytdl-core';


export async function POST(req:NextRequest) {
  try {
    const {videoUrl} = await req.json();

    if(!videoUrl){
     return createResponse.error('missing url.', 404);
    }

      
    const videoInfo = await ytdl.getInfo(videoUrl);
    console.log(videoInfo, "----");
    
   
    //TODO add JWT token for more safety
    return createResponse.message('video info found.', 200, {
      data:{
        videoName:videoInfo.videoDetails.title,
        videoThumbnail:videoInfo.videoDetails.thumbnails[2],
        publishDate:videoInfo.videoDetails.publishDate,
        videoFormates:videoInfo.formats
      }
    });
    
    } catch (error) {
      console.log(error);
      return createResponse.error('someting wrong with the url', 404, {err:error});
    }
}