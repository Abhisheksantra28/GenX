import {
  Code,
  // ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },

  {
    label: "Code Generation",
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/code",
  },

  // {
  //   label: "Image Generation",
  //   icon: ImageIcon,
  //   color: "text-pink-700",
  //   bgColor: "bg-pink-700/10",
  //   href: "/image",
  // },

  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },

  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
];

export const MAX_FREE_COUNTS = 10;

export const CRISP_WEBSITE_ID="39494994-6070-4324-b26d-2801020100d5"
