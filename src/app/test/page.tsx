"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Dynamically import ApexCharts with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// Fetch users directly using fetch API
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export default function TestPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,  // Direct fetch with React Query
  });

  // Setup Mapbox
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // NYC coordinates
      zoom: 9,
    });

    return () => map.remove();
  }, []);

  const chartData = {
    series: [{ name: "Users", data: [users?.length || 0] }],
    options: {
      chart: { type: "bar" },
      xaxis: { categories: ["Total Users"] },
    },
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Full Feature Test Page</h1>

      <Button variant="default">I am a ShadCN Button</Button>

      <div>
        <h2 className="text-xl font-semibold">User List</h2>
        {isLoading && <p>Loading users...</p>}
        {error && <p>Error loading users.</p>}
        {users && (
          <ul className="list-disc list-inside">
            {users.map((user: any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold">ApexCharts: Total Users</h2>
        <Chart options={chartData.options} series={chartData.series} type="bar" width="500" />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Mapbox Test</h2>
        <div ref={mapContainerRef} className="w-full h-[400px] mt-4 rounded border" />
      </div>
    </div>
  );
}
