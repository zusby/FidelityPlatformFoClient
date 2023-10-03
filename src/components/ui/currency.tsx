export const formatter = new Intl.NumberFormat("de-DE", {
    style: 'currency',
    currency: 'EUR'
});

interface CurrencyProps {
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
    value
}) => {
    return (
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
    )
}

export default Currency