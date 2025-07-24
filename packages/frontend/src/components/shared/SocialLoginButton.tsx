import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface Props {
  icon: ReactNode
  text: string
  onClick?: () => void
}

export function SocialLoginButton({ icon, text, onClick }: Props) {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
    >
      {icon}
      {text}
    </Button>
  )
}