/* eslint-disable react-hooks/exhaustive-deps */
import { locationRef } from "@/app/providers";
import apiServices from "@/services/sevices";
import { SearchError, SearchPlaceResponse } from "@/types/response/SearchPlaceResponse";
import { GeoCode } from "@/types/response/base";
import { requestGEOPermission } from "@/utils/functions";
import Axios, { CancelTokenSource } from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
let _cts: CancelTokenSource | null = Axios.CancelToken.source();
export enum SearchLocationErrorType {
    Warning,
    Error,
}

const useSearchPlace = () => {
    const [suggestionPlaces, setSuggestionPlace] = useState<SearchPlaceResponse[]>([]);
    const [error, setError] = useState<SearchError>();

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const debouncedFunction = useCallback(
        debounce(
            (input?: string, location?: GeoCode | null, cts?: CancelTokenSource) => {
                apiServices
                    .getGeoCode(input, location, { cancelToken: cts?.token })
                    .then((data) => {
                        if (data.results) setSuggestionPlace(data.results);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            },
            300,
            { leading: true },
        ),
        [],
    );

    const onClickDetect = useCallback(async () => {
        if (!locationRef.current) {
            await requestGEOPermission();
        }
        _cts?.cancel();
        _cts = Axios.CancelToken.source();
        if (locationRef.current) {
            debouncedFunction(undefined, locationRef.current, _cts);
            setError(undefined);
            return;
        }
        setError({
            type: SearchLocationErrorType.Error,
            text: "Chúng tôi không thể tim thấy bạn trên bản đồ. Vui lòng thay đổi cài đặt của bạn ở trình duyệt để cho chia sẻ vị trí của bạn.",
        });
    }, []);

    useEffect(() => {
        if (input != "") {
            _cts?.cancel();
            _cts = Axios.CancelToken.source();
            setIsLoading(true);
            debouncedFunction(input, undefined, _cts);
        }
    }, [input]);

    useEffect(() => {
        return () => {
            _cts?.cancel();
            _cts = null;
        };
    }, []);

    return {
        suggestionPlaces,
        setInput,
        input,
        isLoading,
        onClickDetect,
        error,
    };
};

export default useSearchPlace;
