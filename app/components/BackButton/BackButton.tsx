export default function BackButton({
  onClick,
}: {
  readonly onClick: () => void;
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="text-white text-sm border rounded-md text-md px-4 py-2 bg-gray-500"
    >
      VOLVER
    </button>
  );
}
