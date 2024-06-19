import { useEffect } from 'react';
import PaginationComp from 'react-bootstrap/Pagination';
import { useSearchParams } from 'react-router-dom';

function Pagination({ total, pageSize = 10, className }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageNumber = Math.ceil(total / pageSize);

    useEffect(() => {
        if (!searchParams.has('page')) {
            setSearchParams((params) => {
                params.set('page', 1 + '');
                return params;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const items = [];
    for (let number = 1; number <= pageNumber; number++) {
        items.push(
            <PaginationComp.Item
                key={number}
                active={number === Number(searchParams.get('page'))}
                className="border rounded"
                onClick={() => handleClick(number)}
            >
                {number}
            </PaginationComp.Item>,
        );
    }
    const handleClick = (number) => {
        setSearchParams((params) => {
            params.set('page', number.toString());
            return params;
        });
    };

    const handlePrev = () => {
        setSearchParams((params) => {
            params.set('page', (Number(searchParams.get('page')) - 1).toString());
            return params;
        });
    };

    const handleNext = () => {
        setSearchParams((params) => {
            params.set('page', (Number(searchParams.get('page')) + 1).toString());
            return params;
        });
    };

    return (
        <PaginationComp size="lg" className={className}>
            <PaginationComp.Prev
                className="rounded-left border"
                disabled={Number(searchParams.get('page')) === 1}
                onClick={handlePrev}
            />
            {items}
            <PaginationComp.Next
                className="rounded-right border"
                disabled={Number(searchParams.get('page')) === pageNumber}
                onClick={handleNext}
            />
        </PaginationComp>
    );
}

export default Pagination;