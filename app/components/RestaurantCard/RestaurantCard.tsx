import { AttentionSchedule } from "@models";
import Link from "next/link";
import React from "react";

interface Props {
  readonly name: string;
  readonly address: string;
  readonly id: string;
  readonly slug?: string;
  readonly phone: string;
  readonly attentionSchedule: AttentionSchedule[];
}

export default function RestaurantCard({
  name,
  address,
  id,
  slug,
  attentionSchedule,
  phone,
}: Props) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 ">
          <a href="#">
            <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          <svg
            className="w-[18px] h-[18px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M17 16h-1V2a1 1 0 1 0 0-2H2a1 1 0 0 0 0 2v14H1a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM5 4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4Zm0 5V8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Zm6 7H7v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm2-7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1Zm0-4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1Z" />
          </svg>
        </div>
        <Link
          href={`/private/restaurants/${id}`}
          className="font-normal text-xs text-white "
        >
          Editar
        </Link>
      </div>
      <div className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
        <p className="mb-1">
          <span className="font-bold">Horario de atención</span>
        </p>
        {attentionSchedule?.map((schedule) => {
          return (
            <div
              key={schedule.id}
              className="flex justify-between items-center"
            >
              <p>{schedule.day}:</p>
              <p>
                {schedule.start} - {schedule.end}
              </p>
            </div>
          );
        })}

        <div className="mt-3">
          <p>
            <span className="font-bold">Dirección:</span> {address}
          </p>
          <p>
            <span className="font-bold">Teléfono:</span> {phone}
          </p>
        </div>
      </div>
      <Link
        href={`/reserve/${slug}`}
        className="mt-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Ver sitio
      </Link>
    </div>
  );
}
