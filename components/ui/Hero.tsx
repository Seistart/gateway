import { TypeAnimation } from "react-type-animation"
import { Button } from "./button"

function Hero() {
  return (
    <div className="flex max-h-screen min-h-[60vh] items-center justify-between bg-background">
      <div className="first-letter: flex w-[60vw] flex-col justify-between gap-3 px-5 py-20 text-3xl font-extrabold sm:pl-12 sm:text-4xl md:text-6xl">
        <h1>Discover and Explore</h1>
        <div className="flex">
          <h1 className="bg-[#d0b8d0]">
            <TypeAnimation
              sequence={[
                "Whats Brewing",
                2000, // wait 1s before replacing "whats brewing" with "nfts"
                "NFTs and DeFi",
                2000,
                "Gaming and AI",
                2000,
              ]}
              wrapper="span"
              speed={10}
              repeat={Infinity}
            />
          </h1>
          <h1>in the</h1>
        </div>
        <h1>SEI Ecosystem</h1>
        <h2 className="text-xl">Here Starts Your Sei Journey</h2>
        <div className="flex gap-6">
          <Button className="border border-black bg-[#CFE3C3] text-[#000] shadow-bottom-right">
            Get Started
          </Button>
          <Button
            className="border border-black bg-[#E4D8D5] text-[#000]
             shadow-bottom-right"
          >
            Browse
          </Button>
        </div>
      </div>
      <div className="block h-[22.5rem] w-full flex-1 bg-[url('/images/header-bg.png')] bg-cover bg-center">
        {/* <img src={"/images/header.png"} className="w-35vw" alt="header" /> */}
      </div>
    </div>
  )
}

export default Hero
