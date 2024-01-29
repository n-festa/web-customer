import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useParams = <T>(fallbackValue?: T) => {
    const [params, setParams] = useState<T>(fallbackValue as T);
    const searchParams = useSearchParams();

    useEffect(() => {
        let newParams = { ...params };
        searchParams.forEach((value, key, _) => {
            newParams = { ...newParams, [key]: value };
        });
        setParams(newParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return { params };
};

export default useParams;
