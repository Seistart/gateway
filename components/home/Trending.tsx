import Image from "next/image"
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
    <div className="px-40 pb-12">
      <Heading headingText={"Trending Sei Projects"} />
      <div className="flex gap-4">
        <Button className="shadow-faded-bottom-right">Popular</Button>
        <Button variant={"outline"}>Trending</Button>
        <Button variant={"outline"}>All Time</Button>
        <Button className="border border-black bg-[#E9C0EA] shadow-bottom-right">
          More
        </Button>
      </div>
      <Table className="bg-[#1A1A1A border border-white text-white shadow-table">
        <TableCaption>Current Popular Projects on Sei</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24H</TableHead>
            <TableHead>7D</TableHead>
            <TableHead>1M</TableHead>
            <TableHead>Marketcap</TableHead>
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
              <TableCell className="text-[#B75B34]">{item.change7d}</TableCell>
              <TableCell className="text-[#64A46B]">{item.change7d}</TableCell>
              <TableCell>{item.marketCap}</TableCell>
              <TableCell>{item.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
