import { useEffect, useState } from 'react';
import axios from 'axios'; 

const useFetchData = (url) => {

    const [dataToReturn, setDataToReturn] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataIsValid, setDataIsValid] = useState(true);

    useEffect(() => {
        axios.post(url)
          .then((res) => {
            if (res.statusText !== "OK"){ 
                throw Error('Could not fetch data');
            }
            setDataToReturn(res.data);
            setIsLoading(false);
            setError(null);
            setDataIsValid(true);
          })
          .catch(err => {
            setError(err.message);
            setIsLoading(false);
         })
    }, [dataIsValid]);

    return {dataToReturn, isLoading, error};
};

export default useFetchData;
