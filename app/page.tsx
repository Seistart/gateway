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
  const projects = mockProjects(10)
  return (
    <div>
      <div className="flex items-center justify-between border-b border-black bg-[#FFF] px-10 text-black">
        <h1 className="">Seistart</h1>
        <div>
          <Button className="my-0 border-l border-black bg-white py-8 text-black">
            Login
          </Button>
          <Button className="my-0 bg-black py-8 text-white">Open Wallet</Button>
        </div>
      </div>
      <div className="min-h- bg-[#FFFFFF] text-black">
        <div className="flex flex-col gap-3 px-5 py-20 sm:px-12">
          <h1 className="text-3xl font-extrabold sm:w-1/2 sm:text-4xl md:text-6xl">
            Welcome to Seistart –{" "}
            <span className="bg-[#d0b8d0]">Your Gateway</span> to the SEI
            Ecosystem
          </h1>
          <h2 className="text-xl">fr like it is the best</h2>
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
        <div className="bg-[#1a1a1a] px-4 py-4 text-5xl font-bold text-white">
          Seistart offers various projects that are currently getting built
        </div>
      </div>
      <div className="min-h-screen bg-white p-2 text-black sm:p-12">
        <h1 className="text-center text-4xl font-semibold">
          <span className="bg-[#E9C0EA]">Most Popular</span> Projects
        </h1>
        <h2 className="mt-2 text-center font-medium">
          Discover Sei's Popular Projects
        </h2>
        <div className="grid grid-cols-2 gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {projects.map((project) => (
            <div
              className="border border-b-4 border-r-4 border-black p-4 shadow-faded-bottom-right"
              key={project.id}
            >
              {/* <Image src={"/images/noimage.webp"} alt="" width={200} height={200} /> */}
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
                  <Badge className="rounded-full bg-[#E9C0EA]">New</Badge>
                </div>
                <p className="text-sm">Small Description about it</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Project Name</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white px-40 pb-12">
        <h1 className="text-center text-4xl font-semibold text-black">
          Trending Sei Projects
        </h1>
        <div className="flex justify-center gap-4 py-4">
          <Button
            variant={"outline"}
            className="border-none shadow-faded-bottom-right"
          >
            Popular
          </Button>
          <Button className="border border-black shadow-bottom-right">
            Trending
          </Button>
          <Button className="border border-black shadow-bottom-right">
            All Time
          </Button>
          <Button className="border border-black bg-[#E9C0EA] shadow-bottom-right">
            More
          </Button>
        </div>
        <Table className="bg-[#1A1A1A] shadow-table">
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
      <div>
        <h1 className="w-full py-6 text-center text-6xl font-bold">FAQs</h1>
        <div className="flex flex-col px-20">
          <Accordion
            className="grid grid-cols-2 gap-2"
            type="single"
            collapsible
          >
            {faqs.map((faq, index) => (
              <AccordionItem value={`faq-${index}`} key={index}>
                <AccordionTrigger className="text-2xl">
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
