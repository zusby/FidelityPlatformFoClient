import { Link } from "react-router-dom";
import Container from "./ui/container";
import MainNav from "./MainNav";
import { getCategories } from "@/actions/get-categories";
import { useEffect, useState } from "react";
import { Category } from "@/types";
import NavbarActions from "./navbar-actions";

const NavBar = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px6 lg:px-8 flex h-16 items-center">
                    <Link to="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">STORE</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarActions />

                </div>
            </Container>
        </div>
    )
}

export default NavBar;