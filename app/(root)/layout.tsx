import { Navbar, Footer } from "@/components"

const RootLayout = async ({children}: {children: React.ReactNode}) => {


  return (
    <div>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}

export default RootLayout