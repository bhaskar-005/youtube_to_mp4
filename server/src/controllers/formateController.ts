import { Request, Response } from "express";
import { createResponse } from "../utils/createResponse";
import ytdl from 'ytdl-core';

export const formateController:any = async(req:Request, res:Response)=>{
    try {
        const {videoUrl} = req.body;
        
    
        if(!videoUrl){
         return createResponse.error(res, 'missing url.', 404);
        }
    
          
        const videoInfo = await ytdl.getBasicInfo(videoUrl);
        console.log(videoInfo, "----");
        
       
        //TODO add JWT token for more safety
        return createResponse.message(res, 'video info found.', 200, {
          data:{
            videoName:videoInfo.videoDetails.title,
            videoThumbnail:videoInfo.videoDetails.thumbnails[2],
            publishDate:videoInfo.videoDetails.publishDate,
            videoFormates:videoInfo.formats
          }
        });
        
        } catch (error) {
          console.log(error);
          return createResponse.error(res,'someting wrong with the url', 404, {err:error});
        }
}