import { Loader2Icon } from "lucide-react"

const Loader = () => {
  return (
    <div className="h-[calc(100vh-12rem)] w-full flex items-center justify-center">
        <Loader2Icon className="animate-spin" />
    </div>
  )
}
export default Loader