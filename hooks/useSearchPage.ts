import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useSearchPage = () => {
    const [state, setState] = useState<{ keySearch: string }>({
        keySearch: "",
    });
    const router = useRouter();

    const onChangeSearchValue = (value: string) => {
        setState((prevState) => ({
            ...prevState,
            keySearch: value,
        }));
    };

    const onSearch = () => {
        if (state.keySearch != "") {
            router.push(`${routes.SearchDetail}?searchKey=${state.keySearch}`);
            return;
        }
    };

    return {
        keySearch: state.keySearch,

        onSearch,
        onChangeSearchValue,
    };
};

export { useSearchPage };
