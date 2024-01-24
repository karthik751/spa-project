"use client";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import { useState } from "react";
import MockData from '../../mock-data/brands.json'
import Form from "@/src/components/Form";
import { Brand } from "@/src/lib/store";

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>({name: '', logo: ''})
  function handleClick(brand: any){
    setSelectedBrand(brand)
  }
  return (
    <div>
      <NavBar />
      <div className="grid gap-2 place-items-center mt-10 mb-6 md:grid-cols-5">
        {
          MockData.brands.map((brand, index) => (
            <div key={index}>
              <Image
                src={brand.logo}
                alt={brand.name}
                className="dark:invert cursor-pointer h-auto w-auto"
                width={100}
                height={24}
                onClick={() => handleClick(brand)}
                priority
              />
            </div>
          ))
        }
      </div>
      {
        selectedBrand.name !== '' && 
        <Form selectedBrand={selectedBrand} />
      }
    </div>
  );
}
