import Image from "next/image"

export default function Team() {
  const arrayToMap = new Array(6).fill(null)
  return (
    <div>
      <h1 className="mb-10 text-3xl font-semibold">SeiStarters</h1>
      <div className="grid grid-cols-6 gap-10">
        {arrayToMap.map(() => (
          <div className="border border-black shadow-bottom-right-2">
            <Image src={"/images/hax.jpg"} alt="hax" width={150} height={150} />
            <div className="flex flex-col gap-2 bg-[#212121] p-2 text-white">
              <p className="text-lg font-bold">Hax Haxo</p>
              <p className="self-end font-light">Head Team</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
