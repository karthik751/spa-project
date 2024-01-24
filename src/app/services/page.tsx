"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CarFormData } from "@/src/lib/store";
import NavBar from "@/src/components/NavBar";
import FilterSection from "@/src/components/FilterSection";

const Services: React.FC = () => {
  const [formData, setFormData] = useState<CarFormData[]>([]);
  const [filteredFormData, setFilteredFormData] = useState<CarFormData[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch form data from the API route
    const fetchData = async () => {
      try {
        const response: CarFormData[] = (await axios.get("/api/getFormData"))
          .data;
        setFormData(response);
        setFilteredFormData(response);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filter when filter state changes
    setFilteredFormData(
      formData.filter((entry) => entry.brand.includes(filter))
    );
  }, [filter, formData]);

  console.log(filter);
  console.log(filteredFormData);

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <NavBar />
      <FilterSection formData={formData} filteredFormData={filteredFormData} />
      {/* <input
        style={{ color: "black" }}
        type="text"
        placeholder="Filter by someField"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      /> */}
    </div>
  );
};

export default Services;
