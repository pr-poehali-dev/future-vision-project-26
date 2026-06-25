import { useIsMobile } from "@/hooks/use-mobile"
import { MobileLayout } from "@/components/MobileLayout"
import { DesktopLayout } from "@/components/DesktopLayout"
import { useTrackVisit } from "@/hooks/use-visitors"

export default function Index() {
  const isMobile = useIsMobile()
  useTrackVisit()

  if (isMobile === undefined) return null

  return isMobile ? <MobileLayout /> : <DesktopLayout />
}