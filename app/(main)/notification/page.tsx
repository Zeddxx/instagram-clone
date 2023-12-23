import { Button } from "@/components/ui/button"

const Notification = () => {
  return (
    <section>
      <header className="sticky top-0 inset-0">
        <nav className="flex flex-col justify-end h-[88px] w-full">
          <div className="flex w-full border-b">
            <Button className="flex-1 rounded-none text-muted-foreground" variant="ghost">
              Following
            </Button>

            <Button className="flex-1 rounded-none border-b border-black" variant="ghost">
              You
            </Button>
          </div>
        </nav>
      </header>

      <div className="h-auto w-full">
        <div className="w-full flex items-center border-b">
          <p className="text-sm font-medium py-4 text-gray-700 px-4">Follow requests</p>
        </div>

        <div className="w-full border-b h-auto px-4 pt-2">
          <h1 className="text-sm font-semibold">New</h1>
          <div className="flex items-center w-full h-auto py-4 gap-x-2">
            <div className="h-11 w-11 rounded-full bg-black shrink-0"></div>
            <div className="text-sm text-start flex-1">
              <p><span className="font-bold">sahil</span> liked your photo.</p>
            </div>

            <div className="aspect-square h-11 w-11 bg-black"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Notification