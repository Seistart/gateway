import Image from "next/image"
import Link from "next/link"
import LandingCont from "../containers/LandingCont"

const footerItems = [
  {
    title: "Explore Sei",
    links: [
      { name: "Explore all projects", url: "/" },
      { name: "Explore Airdrops", url: "/" },
      { name: "New Projects", url: "/" },
      { name: "Utility Ecosystem Map", url: "/" },
      { name: "NFT Ecosystem map", url: "/" },
    ],
  },
  {
    title: "Community & more",
    links: [
      { name: "Sei Community", url: "/" },
      { name: "Knowledge Center", url: "/" },
      { name: "Sei Videos", url: "/" },
      { name: "Developer Hub", url: "/" },
      { name: "Sei Graveyard", url: "/" },
    ],
  },
  {
    title: "Seistart",
    links: [
      { name: "Add Project", url: "/" },
      { name: "Submit an Article", url: "/" },
      { name: "Promote your Project", url: "/" },
      { name: "About Us", url: "/" },
      { name: "Contact", url: "/" },
    ],
  },
]

export const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className="py-6">
      <div className="grid grid-cols-4 place-items-center gap-4">
        <div className="self-start">
          <Link href="/" className="mr-2">
            <Image
              src="/images/logo_850.png"
              width="80"
              height="80"
              alt="seistart"
            />
          </Link>
        </div>
        {footerItems.map((block) => (
          <div>
            <h2 className="upp pb-4">{block.title}</h2>
            {block.links.map((item) => (
              <p className="mt-4  text-sm">
                <a href={item.url}>{item.name}</a>
              </p>
            ))}
          </div>
        ))}
      </div>
      <LandingCont className="max-w-[65rem] py-2 sm:py-12 sm:pb-4">
        <div className="mt-4 text-left text-xs">
          <p>
            * The Content on this website is for informational purposes only,
            you should not construe any such information or other material as
            legal, tax, investment, financial, or other advice. Token data and
            purchases on our site are processed through partner organizations.
            For any inquiries or assistance regarding purchases, please contact
            our partners directly. ‍
          </p>
        </div>
        <div className="mt-4 text-left text-xs">
          <p>Copyright &copy; {date} SeiStart. All rights reserved.</p>
        </div>
        <div className="mt-4 flex gap-4 text-left text-xs">
          <a href="/privacy-policy">
            <button> Privacy & Cookies</button>
          </a>
          <a href="/terms-conditions">
            <button>Terms & Conditions</button>
          </a>
        </div>
      </LandingCont>
    </footer>
  )
}
