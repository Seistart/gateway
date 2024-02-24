import { Paintbrush2Icon } from "lucide-react";
import ImageSlider from "./ImageSlider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import CardComponent from "./ui/card";

export const Body = () => {
  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between mb-6">
        <div className="flex items-center mb-6">
          <Button
            variant={"ghost"}
            size="icon"
            className="w-[6rem] h-[6rem] mr-10"
          >
            <Avatar className="w-18 h-18">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-[6rem] h-[6rem] rounded-full"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
          <div>
            <h2 className="text-lg font-bold">Hello, [username]</h2>
            <p className="text-sm text-gray-600">
              A great day to get a new NFT
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-6 items-end">
          <Button variant="outline" className="mr-2">
            Mint NFT
          </Button>
          <Button variant="outline">Search Project</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-start bg-quadiry p-6 pb-2 bg-foreground">
          <div className="flex items-start justify-between mb-0 w-full ">
            <div className="w-12 h-12 bg-tertiary flex items-center justify-center">
              <Button variant={"ghost"} size="icon" className="text-black">
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className="items-start justify-start text-left w-full px-6">
              <h3 className="text-xl font-bold">124k</h3>
              <p className="mb-2 text-sm font-extralight">Artworks</p>
              <Button variant="link" className="m-1 p-2 w-10">
                View All
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start bg-quadiry p-6 pb-2 bg-foreground">
          <div className="flex items-start justify-between mb-0 w-full ">
            <div className="w-12 h-12 bg-tertiary flex items-center justify-center">
              <Button variant={"ghost"} size="icon" className="text-black">
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className="items-start justify-start text-left w-full px-6">
              <h3 className="text-xl font-bold">24k</h3>
              <p className="mb-2 text-sm font-extralight">Sales</p>
              <Button variant="link" className="m-1 p-2 w-10">
                View All
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start bg-quadiry p-6 pb-2 bg-foreground">
          <div className="flex items-start justify-between mb-0 w-full ">
            <div className="w-12 h-12 bg-tertiary flex items-center justify-center">
              <Button variant={"ghost"} size="icon" className="text-black">
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className="items-start justify-start text-left w-full px-6">
              <h3 className="text-xl font-bold">94k</h3>
              <p className="mb-2 text-sm font-extralight">Colections</p>
              <Button variant="link" className="m-1 p-2 w-10">
                View All
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start bg-quadiry p-6 pb-2 bg-foreground">
          <div className="flex items-start justify-between mb-0 w-full ">
            <div className="w-12 h-12 bg-tertiary flex items-center justify-center">
              <Button variant={"ghost"} size="icon" className="text-black">
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className="items-start justify-start text-left w-full px-6">
              <h3 className="text-xl font-bold">164</h3>
              <p className="mb-2 text-sm font-extralight">Projects</p>
              <Button variant="link" className="m-1 p-2 w-10">
                View All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold mb-3">Highlights</h1>
        <Button variant="white" className="w-14 font-bold">
          All
        </Button>
      </div>
      <CardComponent
        title="Anthropomorphic Cats"
        subtitle="Subtitle"
        count={2400}
        imgSrc="/images/image1.png"
        smallImgSrcs={[
          "/images/image1.png",
          "/images/image2.png",
          "/images/image3.png",
        ]}
        buttonLabel="View"
      />

      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold mb-3">Discover</h1>
        <Button variant="white" className="w-14 font-bold">
          All
        </Button>
      </div>
      <ImageSlider />
    </div>
  );
};
