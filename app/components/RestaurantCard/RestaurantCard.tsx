import { AttentionSchedule } from "@/app/models/attention-schedule.model";
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
        href={`/restaurants/${id}`}
        className="mt-auto inline-flex text-xs items-center text-white hover:underline"
      >
        Visitar sitio
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link>
    </div>
  );
}
