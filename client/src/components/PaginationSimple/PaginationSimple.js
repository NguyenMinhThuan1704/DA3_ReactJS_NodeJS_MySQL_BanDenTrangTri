import PaginationComp from 'react-bootstrap/Pagination';

function PaginationSimple({ total, pageSize = 10, page, onPageChange, className }) {
    const pageNumber = Math.ceil(total / pageSize);

    // if (pageNumber <= 1) return null;

    const items = [];
    for (let number = 1; number <= pageNumber; number++) {
        items.push(
            <PaginationComp.Item
                key={number}
                active={number === page}
                className="border rounded"
                onClick={() => onPageChange(number)}
            >
                {number}
            </PaginationComp.Item>,
        );
    }

    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < pageNumber) onPageChange(page + 1);
    };

    return (
        <PaginationComp size="lg" className={className}>
            <PaginationComp.Prev className="rounded-left border" disabled={page === 1} onClick={handlePrev} />
            {items}
            <PaginationComp.Next className="rounded-right border" disabled={page === pageNumber} onClick={handleNext} />
        </PaginationComp>
    );
}

export default PaginationSimple;
