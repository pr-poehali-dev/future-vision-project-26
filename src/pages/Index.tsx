import { useIsMobile } from "@/hooks/use-mobile"
import { MobileLayout } from "@/components/MobileLayout"
import { DesktopLayout } from "@/components/DesktopLayout"

export default function Index() {
  const isMobile = useIsMobile()

  if (isMobile === undefined) return null

  return isMobile ? <MobileLayout /> : <DesktopLayout />
}
