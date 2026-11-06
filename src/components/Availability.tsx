import { montserrat } from "@/app/fonts";
import { AVAILABILITY, LOCATION, VISA } from "@/lib/site";

const Availability = ({ className = "" }: { className?: string }) => (
    <p className={`flex items-start gap-2 text-sm text-gray-200 ${montserrat.className} ${className}`}>
        <span
            aria-hidden="true"
            className="mt-[0.4em] h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]"
        />
        <span>
            {LOCATION} · {VISA} · {AVAILABILITY}
        </span>
    </p>
);

export default Availability;
