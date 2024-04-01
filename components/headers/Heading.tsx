interface HeadingProps {
  highlighted?: string
  headingText: string
  desc?: string
}

//we can wrap this in a div but for now i thought
//we could keep it just as text

export default function Heading({
  highlighted,
  headingText,
  desc,
}: HeadingProps) {
  return (
    <>
      <h1 className="text-4xl font-semibold">
        <span className="bg-[#E9C0EA]">{highlighted}</span>
        {headingText}
      </h1>
      {desc && <h2 className="mt-2 font-medium">{desc}</h2>}
    </>
  )
}
