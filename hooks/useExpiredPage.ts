import { useRouter } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";
import { routes } from "@/utils/routes";
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const useExpiredPage = (minuteExpired: number) => {
    const router = useRouter();
    useIdleTimer({
        timeout: MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * minuteExpired,
        onIdle: () => router.push(routes.Home),
        debounce: 100,
    });
};
export default useExpiredPage;
