import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function NotificationCard({ notification }) {
  return (
    <div className="flex-center-start gap-x-5">
      <Image
        src={notification.userImg}
        alt="user avatar"
        height={1200}
        width={1200}
        className="aspect-square h-auto w-[75px] rounded-full"
      />

      <p className="text-xl">
        <span className="text-[22px] font-semibold">
          {notification.userName}
        </span>{" "}
        {notification.message}
      </p>

      <div className="flex-center-between mb-7 ml-10 w-max gap-x-6 whitespace-nowrap">
        <p className="text-dark-gray">{notification.date}</p>

        <button>
          <Trash2 size={18} color="#F16365" />
        </button>
      </div>
    </div>
  );
}
