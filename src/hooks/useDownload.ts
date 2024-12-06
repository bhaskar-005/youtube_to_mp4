import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useDownload = async(videoUrl:string, itag:number)=>{
   const {isError, isPending, isSuccess, data, mutate} = useMutation({
    mutationFn:async()=>{
        try {
            const res = await axios.post('/api/download', {
                videoUrl,
                itag
            })
            return res.data
        } catch (error) {
            toast.error(error.message||'error while downloading.')
        }
    }
   })
   return {isError, isPending, isSuccess, data, mutate};
}