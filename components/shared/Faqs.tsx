import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

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

export function Faqs() {
  return (
    <div className="bg-[#1A1A1A] py-12 text-white">
      <h1 className="mb-10 mt-6 w-full text-center text-6xl font-bold">FAQs</h1>
      <div className="px-4 sm:px-20">
        <Accordion
          className="grid grid-cols-1 lg:grid-cols-3"
          type="single"
          collapsible
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`faq-${index}`}
              key={index}
              className="border border-white"
            >
              <AccordionTrigger className="px-2 text-left text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-2 text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
