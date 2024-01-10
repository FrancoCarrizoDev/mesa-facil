export default function EmptyDinnerReserve() {
  return (
    <div className="flex flex-col w-full px-4 py-3 rounded-md bg-white shadow-md hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-600">
              No tienes reservas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
