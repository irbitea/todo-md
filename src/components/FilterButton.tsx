interface IFilterButtonProps {
    name: string;
    isActive: boolean;
    onClick: () => void;
}

function FilterButton({ name, isActive, onClick }: IFilterButtonProps) {
    return (
        <button onClick={onClick} className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`}>
            {name}
        </button>
    );
}

export default FilterButton;
