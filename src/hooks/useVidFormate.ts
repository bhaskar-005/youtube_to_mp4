import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useVidFormate = () => {
    const {data, isError, isPending, isSuccess, mutate} = useMutation({
        mutationFn: async(url:string)=>{
            try {
                return await axios.post('/api/available-formats',{
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