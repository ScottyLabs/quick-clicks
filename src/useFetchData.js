import { useEffect, useState } from 'react';
import axios from 'axios'; 

const useFetchData = (url, changingState) => {

    const [dataToReturn, setDataToReturn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.post(url)
          .then((res) => {
            if (res.statusText !== "OK"){ 
                throw Error('Could not fetch data');
            }
            setDataToReturn(res.data);
            setIsLoading(false);
            setError(null);
          })
          .catch(err => {
            setError(err.message);
            setIsLoading(false);
         })
    }, [changingState]);

    return {dataToReturn, isLoading, error};
};

export default useFetchData;
