"use client";
import { CarFormData } from "@/src/lib/store";
import { useState } from "react";
import Card from "./Card";

interface FormDataEntry {
  brands: string[];
  colors: string[];
  locations: string[];
  [key: string]: string[];
}

export default function FilterSection(props: any) {
  const [filters, setFilters] = useState<FormDataEntry>({
    brands: [],
    colors: [],
    locations: [],
  });

  const handleCheckboxChange = (filterType: string, value: string) => {
    setFilters((prevFilters: FormDataEntry) => {
      const updatedFilters: FormDataEntry = { ...prevFilters };
      const index = updatedFilters[filterType].indexOf(value);
      if (index !== -1) {
        // Remove the selected value if it already exists
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        // Add the selected value if it doesn't exist
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }

      return updatedFilters;
    });
  };

  const extractUniqueValues = (key: string) => {
    return Array.from(
      new Set(filteredFormData.map((entry: any) => entry[key]))
    );
  };

  // Apply filters to formData
  const applyFilters = () => {
    const filteredData = props.formData.filter(
      (entry: { brand: string; color: string; location: string }) => {
        const brandMatch =
          filters.brands.length === 0 || filters.brands.includes(entry.brand);
        const colorMatch =
          filters.colors.length === 0 || filters.colors.includes(entry.color);
        const locationMatch =
          filters.locations.length === 0 ||
          filters.locations.includes(entry.location);

        return brandMatch && colorMatch && locationMatch;
      }
    );

    return filteredData;
  };

  const filteredFormData = applyFilters();
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <h3 className="sr-only">Filter</h3>

                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                      aria-controls="filter-section-0"
                      aria-expanded="false"
                    >
                      <span className="font-medium text-gray-900">Brand</span>
                    </button>
                  </h3>
                  <div className="pt-6" id="filter-section-0">
                    <div className="space-y-4">
                      {extractUniqueValues("brand").map((brand: any) => (
                        <div className="flex items-center" key={brand}>
                          <input
                            id={`filter-brand-${brand}`}
                            name="brand[]"
                            value={brand}
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() =>
                              handleCheckboxChange("brands", brand)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-brand-${brand}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                      aria-controls="filter-section-1"
                      aria-expanded="false"
                    >
                      <span className="font-medium text-gray-900">Color</span>
                    </button>
                  </h3>
                  <div className="pt-6" id="filter-section-1">
                    <div className="space-y-4">
                      {extractUniqueValues("color").map((color: any) => (
                        <div className="flex items-center" key={color}>
                          <input
                            id={`filter-brand-${color}`}
                            name="color[]"
                            value={color}
                            type="checkbox"
                            checked={filters.colors.includes(color)}
                            onChange={() =>
                              handleCheckboxChange("colors", color)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-color-${color}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                      aria-controls="filter-section-2"
                      aria-expanded="false"
                    >
                      <span className="font-medium text-gray-900">
                        Location
                      </span>
                    </button>
                  </h3>
                  <div className="pt-6" id="filter-section-2">
                    <div className="space-y-4">
                      {extractUniqueValues("location").map((location: any) => (
                        <div className="flex items-center" key={location}>
                          <input
                            id={`filter-brand-${location}`}
                            name="location[]"
                            value={location}
                            type="checkbox"
                            checked={filters.locations.includes(location)}
                            onChange={() =>
                              handleCheckboxChange("locations", location)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-location-${location}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {filteredFormData.map((entry: any, index: any) => (
                    <div key={index}>
                      <Card entry={entry} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
