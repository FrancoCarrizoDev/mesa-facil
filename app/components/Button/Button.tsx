type ButtonProps = {
  readonly onClick: () => void;
  readonly text: string;
  readonly type: "button" | "submit" | "reset" | undefined;
};

export default function Button({ onClick, text, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="text-white text-sm border rounded-md text-md px-4 py-2 bg-blue-chill-400"
    >
      {text}
    </button>
  );
}
