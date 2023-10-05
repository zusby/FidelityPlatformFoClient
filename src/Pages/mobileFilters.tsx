import Button from "@/components/ui/ButtonRef";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
    sizes: Size[];
    colors: Color[];
    selectedFilters: { colorID: string; sizeID: string };
    onFilterChange: (filterKey: string, filterValue: string) => void;
}

const MobileFilter: React.FC<MobileFiltersProps> = ({
    sizes,
    colors,
    onFilterChange
}) => {

    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);




    const handleFilterChange = (filterKey: string, filterValue: string) => {
        onFilterChange(filterKey, filterValue);
    };

    return (
        <>
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                Filters
                <Plus size={20} />
            </Button>

            <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                {/* background  */}
                <div className="fixed inset-0 bg-black bg-opacity-25" />

                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl ">
                        <div className="flex items-center justify-end px-4">
                            <IconButton icon={<X size={15} />} onClick={onClose} />
                        </div>

                        <div className="p-4">
                            <Filter
                                valueKey="sizeID"
                                name="Sizes"
                                data={sizes}
                                onFilterChange={handleFilterChange}
                            />
                            <Filter
                                valueKey="colorID"
                                name="Colors"
                                data={colors}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    </Dialog.Panel>

                </div>

            </Dialog>
        </>
    )
}


export default MobileFilter;