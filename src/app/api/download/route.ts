import { createResponse } from "@/utils/createResponse";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from 'fs'
import { Readable } from "stream";
import path from "path";


export async function POST(req:NextRequest) {
    try {
        const{videoUrl, itag} = await req.json();
        
        if(!videoUrl || !itag){
            return createResponse.error('missing url or itag',404)
        }

        const videoInfo = await ytdl.getBasicInfo(videoUrl);
        const videoTitle = videoInfo.videoDetails.title;
        console.log('video found -',videoTitle);
        
        const selectedFormat = videoInfo.formats.find(format => format.itag === itag);
        console.log('video formate -',selectedFormat);
        const isVideoFormate = videoInfo.formats.filter(f => f.itag === itag);

        if(!isVideoFormate){
            return createResponse.error('Invalid video format', 464);
        }
        
        console.log('starting to write..');
        
        await new Promise((resolve, reject) =>{
            ytdl(videoUrl, {filter:(formate)=> formate.itag === parseInt(itag) })
            .on("progress", (chunkLength, downloaded, total) => {
                const percent = ((downloaded / total) * 100).toFixed(2);
                console.log(`Progress: ${percent}%`);
            })
           .pipe(fs.createWriteStream(path.join('download',`${videoTitle}.mp4`)))
           .on('finish',resolve)
           .on('error', reject)
        })

            const headers = new Headers();
            headers.set('Content-Type', 'video/mp4');
            headers.set('Content-Disposition', `attachment; filename=${videoTitle}.mp4`);

            const fileStream:any = fs.createReadStream(path.join('download',videoTitle + '.mp4'));
        
            // Return the video stream as a Response
            return new Response(fileStream, {
              status: 200,
              headers: headers,
            });

    } catch (error) {
        return createResponse.error('error while downloading',504)
    }
}