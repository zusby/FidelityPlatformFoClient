import '@fontsource-variable/inter/slnt.css'
import Footer from './components/Footer'
import NavBar from './components/navbar'

export const metadata = {
    title: 'Store',
    description: 'Store',
}

export default function rootLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}