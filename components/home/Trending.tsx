import Image from "next/image"
import LandingCont from "../containers/LandingCont"
import Heading from "../headers/Heading"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { coinData } from "./constants/mockdata"

export function Trending() {
  return (
    <LandingCont className="overflow-hidden">
      <Heading highlighted={"Trending"} headingText={"Sei Projects"} />
      <div className="flex flex-wrap gap-4">
        <Button className="shadow-faded-bottom-right">Popular</Button>
        <Button variant={"outline"}>Trending</Button>
        <Button variant={"outline"}>All Time</Button>
        <Button className="border">More</Button>
      </div>
      <Table className="border border-white text-white shadow-table">
        <TableCaption>Current Popular Projects on Sei</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24H</TableHead>
            <TableHead className="hidden">7D</TableHead>
            <TableHead className="hidden">1M</TableHead>
            <TableHead className="hidden">Marketcap</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coinData.map((item, index) => (
            <TableRow key={index} className="font-semibold">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/images/sei.jpg"}
                    alt=""
                    width={23}
                    height={23}
                    className="rounded-full"
                  />
                  <p>{item.name}</p>
                </div>
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell className="text-[#64A46B]">{item.change24h}</TableCell>
              <TableCell className="hidden text-[#B75B34]">
                {item.change7d}
              </TableCell>
              <TableCell className="hidden text-[#64A46B]">
                {item.change7d}
              </TableCell>
              <TableCell className="hidden">{item.marketCap}</TableCell>
              <TableCell>{item.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </LandingCont>
  )
}
