import React from "react";
import { tools } from "@/lib/spiritContent";
import { useLang } from "@/lib/i18n";
import PracticePlaylist from "@/components/PracticePlaylist";

const COVER = "https://media.base44.com/images/public/6aa5ba6278746a9e6313ec62/bc64df6d4_PHOTO-2026-09-20-16-06-55.jpg";

export default function PlaylistHomeCard() {
  const { t } = useLang();
  const playlist = {
    ...tools.anchoring.playlist,
    coverUrl: COVER,
    title: t("ניגונים להאזנה", "Melodies to listen to"),
    note: t("פסקול מלווה לספר, שירים וניגונים לחיזוק הנפש והרוח", "A soundtrack for the book - songs and melodies for soul and spirit"),
  };

  return <PracticePlaylist playlist={playlist} preview className="w-full mt-8" />;
}