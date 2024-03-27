type ButtonProps = {
    content: string;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
};

const Button = ({ content, className, onClick, disabled }: ButtonProps) => {
    return (
        <button onClick={onClick} className={className} disabled={disabled}>
            {content}
        </button>
    );
};

export default Button;