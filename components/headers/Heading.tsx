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
      <h1 className="xs:text-3xl text-2xl font-semibold sm:text-4xl">
        <span className="mr-2 bg-primary text-black">{highlighted}</span>
        {headingText}
      </h1>
      {desc && <h2 className="mt-2 font-medium">{desc}</h2>}
    </>
  )
}
