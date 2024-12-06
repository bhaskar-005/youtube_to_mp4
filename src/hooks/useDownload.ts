import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

const useDownloadHook = () => {
  const { data, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: async ({ videoUrl, itag }: { videoUrl: string; itag: string }) => {
      try {
        const res = await axios.post('/api/download', {
          videoUrl,
          itag,
        });
        return res;
      } catch (error) {
        toast.error('Error while downloading.');
        throw error; // Ensure the error propagates
      }
    },
  });

  return { data, isError, isPending, isSuccess, mutate };
};

export default useDownloadHook;
