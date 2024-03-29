"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockProjects } from "@/mocks/projects.mocks"
import Image from "next/image"
import Marquee from "react-fast-marquee"
import { TypeAnimation } from "react-type-animation"

const coinData = [
  {
    name: "Sei",
    amount: "$10.25",
    change24h: "0.05%",
    change7d: "2.95%",
    change30d: "45.67%",
    marketCap: "2.15B",
    volume: "$300,000",
  },

  {
    name: "Bitcoin",
    amount: "$10.25",
    change24h: "0.05%",
    change7d: "2.95%",
    change30d: "45.67%",
    marketCap: "2.15B",
    volume: "$300,000",
  },

  {
    name: "Solana",
    amount: "$10.25",
    change24h: "0.05%",
    change7d: "2.95%",
    change30d: "45.67%",
    marketCap: "2.15B",
    volume: "$300,000",
  },

  {
    name: "Ethereum",
    amount: "$10.25",
    change24h: "0.05%",
    change7d: "2.95%",
    change30d: "45.67%",
    marketCap: "2.15B",
    volume: "$300,000",
  },

  {
    name: "Sui",
    amount: "$10.25",
    change24h: "0.05%",
    change7d: "2.95%",
    change30d: "45.67%",
    marketCap: "2.15B",
    volume: "$300,000",
  },
]

const faqs = [
  {
    question: "is it cool",
    answer: "yeah it is the best",
  },
  {
    question: "What is the meaning of life?",
    answer:
      "The answer to this question is subjective and varies from person to person.",
  },
  {
    question: "How do I make a perfect cup of coffee?",
    answer:
      "Start with freshly ground coffee beans, use the right water temperature, and brew it for the optimal time.",
  },
  {
    question: "What are some must-watch movies?",
    answer:
      "Some classics include The Shawshank Redemption, The Godfather, and Forrest Gump.",
  },
  {
    question: "How can I improve my productivity?",
    answer:
      "Focus on time management, prioritize tasks, and take regular breaks to recharge.",
  },
  {
    question: "What is the best way to learn a new language?",
    answer:
      "Practice regularly, immerse yourself in the language, and use various learning resources like books and apps.",
  },
  {
    question: "What are the benefits of meditation?",
    answer:
      "Meditation can reduce stress, improve focus, promote emotional well-being, and enhance self-awareness.",
  },
  {
    question: "How can I start a healthy lifestyle?",
    answer:
      "Eat a balanced diet, exercise regularly, get enough sleep, and manage stress effectively.",
  },
]

export default function HomePage() {
  const projects = mockProjects(8)
  return (
    <div>
      <div className="">
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
        <Marquee className="bg-[#1a1a1a] px-4 py-4 text-5xl font-bold text-white">
          <span className="ml-2">
            Seistart offers various projects that are currently getting built.
          </span>
        </Marquee>
      </div>
      <div className="mb-10 px-40 py-2 sm:py-12">
        <h1 className="text-4xl font-semibold">
          <span className="bg-[#E9C0EA]">Most Popular</span> Projects
        </h1>
        <h2 className="mt-2 font-medium">Discover Sei's Popular Projects</h2>
        <div className="grid grid-cols-2 gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {projects.map((project) => (
            <div
              className="border border-b-4 border-r-4 border-black p-4 shadow-faded-bottom-right"
              key={project.id}
            >
              <Image
                src={"/images/sei.jpg"}
                alt=""
                width={40}
                height={40}
                className="mb-2 rounded-full opacity-80"
              />
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p>sth cool</p>
                  <Badge className="bg-[#E9C0EA]">New</Badge>
                </div>
                <p className="text-sm">Small Description about it</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Project Name</p>
                </div>
              </div>
            </div>
          ))}
          <Button className="border-none text-white shadow-faded-bottom-right">
            Load More
          </Button>
        </div>
      </div>
      <div className="px-40 pb-12">
        <h1 className="text-4xl font-semibold text-black">
          Trending Sei Projects
        </h1>
        <div className="flex gap-4">
          <Button className="shadow-faded-bottom-right">Popular</Button>
          <Button variant={"outline"} className="bg-white shadow-bottom-right">
            Trending
          </Button>
          <Button variant={"outline"} className="bg-white shadow-bottom-right">
            All Time
          </Button>
          <Button className="border border-black bg-[#E9C0EA] shadow-bottom-right">
            More
          </Button>
        </div>
        <Table className="bg-[#1A1A1A] text-white shadow-table">
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
                <TableCell className="text-[#64A46B]">
                  {item.change24h}
                </TableCell>
                <TableCell className="text-[#B75B34]">
                  {item.change7d}
                </TableCell>
                <TableCell className="text-[#64A46B]">
                  {item.change7d}
                </TableCell>
                <TableCell>{item.marketCap}</TableCell>
                <TableCell>{item.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-[#1A1A1A] py-12 text-white">
        <h1 className="w-full py-6 text-center text-6xl font-bold">FAQs</h1>
        <div className="flex flex-col px-20">
          <Accordion
            className="grid grid-cols-2 gap-x-12"
            type="single"
            collapsible
          >
            {faqs.map((faq, index) => (
              <AccordionItem value={`faq-${index}`} key={index}>
                <AccordionTrigger className="text-left text-2xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
