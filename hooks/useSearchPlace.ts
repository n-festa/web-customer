/* eslint-disable react-hooks/exhaustive-deps */
import { locationRef } from "@/app/providers";
import apiServices from "@/services/sevices";
import { RootState } from "@/store";
import { setUserInfo } from "@/store/reducers/userInfo";
import { SearchError, SearchPlaceResponse } from "@/types/response/SearchPlaceResponse";
import { GeoCode } from "@/types/response/base";
import { storageKeys } from "@/utils/constants";
import { requestGEOPermission } from "@/utils/functions";
import { saveState } from "@/utils/localstorage";
import Axios, { CancelTokenSource } from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
let _cts: CancelTokenSource | null = Axios.CancelToken.source();
export enum SearchLocationErrorType {
    Warning,
    Error,
}

const useSearchPlace = ({ initValue }: { initValue?: string }) => {
    const [suggestionPlaces, setSuggestionPlace] = useState<SearchPlaceResponse[]>([]);
    const [error, setError] = useState<SearchError>();
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.userInfo);
    const [selectedPlace, setSelectedPlace] = useState<SearchPlaceResponse>();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const debouncedFunction = useCallback(
        debounce(
            (input?: string, location?: GeoCode | null) => {
                try {
                    _cts?.cancel();
                    _cts = Axios.CancelToken.source();
                    apiServices
                        .getGeoCode(input, location, { cancelToken: _cts?.token })
                        .then((data) => {
                            if (data.results) setSuggestionPlace(data.results);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                } catch (_) {
                    //
                }
            },
            300,
            { leading: true },
        ),
        [],
    );

    useEffect(() => {
        if (initValue) setInput(initValue);
    }, [initValue]);

    const onClickDetect = useCallback(async () => {
        if (!locationRef.current) {
            await requestGEOPermission();
        }

        if (locationRef.current) {
            debouncedFunction(undefined, locationRef.current);
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
            setIsLoading(true);
            debouncedFunction(input, undefined);
        }
    }, [input]);

    useEffect(() => {
        return () => {
            _cts?.cancel();
            _cts = null;
        };
    }, []);

    const setLocation = (data: SearchPlaceResponse) => {
        const newProfile = {
            ...profile,
            longAddress: data.geometry.location.lng,
            latAddress: data.geometry.location.lat,
            address: data.formatted_address ?? "",
        };
        dispatch(setUserInfo(newProfile));
        saveState(storageKeys.userProfile, newProfile);
    };

    return {
        suggestionPlaces,
        setInput,
        input,
        isLoading,
        onClickDetect,
        error,
        setLocation,
        setSelectedPlace,
        selectedPlace,
        setError,
    };
};

export default useSearchPlace;
