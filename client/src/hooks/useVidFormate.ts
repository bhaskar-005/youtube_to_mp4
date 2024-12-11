import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useVidFormate = () => {
    const {data, isError, isPending, isSuccess, mutate} = useMutation({
        mutationFn: async(url:string)=>{
            try {
                console.log("called -----");
                
                return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/available-formats`,{
                    videoUrl:url
                })
            } catch (error) {
                console.log(error);
                
            }
        },
      })
      return {data, isError, isPending, isSuccess, mutate};
} 

export default useVidFormate;