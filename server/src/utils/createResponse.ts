import { Response } from "express";


export class createResponse {
    //static so that it can be called without creating a new instance
    static error(res:Response, message: string, status: number = 404, otherData?: object){
        return res.status(status).json({
            success:false,
            error_message:message,
            ...otherData
        })
    }

    static message(res:Response, message: string, status: number = 200, otherData?: object){
        return res.status(status).json({
            success:true,
            message:message,
            ...otherData
        })
    }
}