import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import Button from '@/components/ui/ButtonRef';
import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
    onFilterChange: (filterKey: string, filterValue: string) => void;
}

const Filter: React.FC<FilterProps> = ({
    data,
    name,
    valueKey,
    onFilterChange,
}) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id,
        };

        if (current[valueKey] === id) {
            onFilterChange(valueKey, '');
            query[valueKey] = null;
        } else {
            onFilterChange(valueKey, id);
        }
        const url = qs.stringifyUrl(
            {
                url: '',
                query,
            },
            { skipNull: true }
        );
        navigate(url, { replace: true });
    };


    useEffect(() => {
        const initialValue = searchParams.get(valueKey);
        if (initialValue !== selectedValue) {
            onFilterChange(valueKey, initialValue || '');
        }
    }, [valueKey, searchParams, onFilterChange, selectedValue]);

    return (
        <>
            <div className="mb-8">
                <h3 className="text-lg font-semibold">{name}</h3>
                <hr className="my-4" />
                <div className="flex flex-wrap gap-2">
                    {data.map((filter) => (
                        <div key={filter.id} className="flex items-center">
                            <Button
                                className={cn(
                                    'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                                    selectedValue === filter.id && 'bg-black text-white'
                                )}
                                onClick={() => onClick(filter.id)}
                            >
                                {filter.name}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Filter;
