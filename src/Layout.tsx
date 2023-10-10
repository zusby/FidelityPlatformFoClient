import '@fontsource-variable/inter/slnt.css'
import Footer from './components/Footer'
import NavBar from './components/navbar'
import ModalProvider from './providers/modal-provider'
import ToastProvider from './providers/toast-provider'

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
            <ToastProvider />
            <ModalProvider />
            {children}
            <Footer />
        </>
    );
}