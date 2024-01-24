"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Brand, CarFormData } from "../lib/store";
import { saveFormData } from "../lib/actions";
import axios from "axios";

interface BrandComponentProps {
  selectedBrand: Brand; // Assuming Brand is a type you've defined
}

const Form: React.FC<BrandComponentProps> = ({ selectedBrand }: any) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<CarFormData>({
    brand: selectedBrand.name,
    model: "",
    color: "",
    owners: 0,
    year: 0,
    transmission: "",
    insurance: 0,
    fitments: "",
    kms: 0,
    photo: "",
    fuel: "",
    body: "",
    location: "",
    price: 0,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      setImage(selectedFile);
      setFormData((prevValues) => ({
        ...prevValues,
        [name]: `/${selectedFile.name}`,
      }));
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const saveToJson = async () => {
    try {
      saveImageToPublicFolder(image);
      await axios.post("/api/saveFormData", formData);
      // Handle success or navigate to a new page
    } catch (error) {
      console.error("Error saving form data:", error);
      // Handle error
    }
  };

  const saveImageToPublicFolder = async (image: any): Promise<string> => {
    try {
      const newFormData = new FormData();
      newFormData.append("image", image);
      const response: any = await axios.post("/api/upload", {
        method: "POST",
        body: newFormData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const result = await response.json();
      return result.imageUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Dispatch the saveFormDataAsync action
    dispatch(saveFormData(formData));
    saveToJson();
    setFormData({
      brand: selectedBrand.name,
      model: "",
      color: "",
      owners: 0,
      year: 0,
      transmission: "",
      insurance: 0,
      fitments: "",
      kms: 0,
      photo: "",
      fuel: "",
      body: "",
      location: "",
      price: 0,
    });
  };

  // Your JSX code for the form...

  return (
    <form className="mx-16 my-10" onSubmit={handleFormSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Brand
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={selectedBrand.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="model"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Model
          </label>
          <input
            type="text"
            name="model"
            id="model"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fiesta"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="color"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Color
          </label>
          <input
            type="text"
            name="color"
            id="color"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Red"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="owners"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            No of Owners
          </label>
          <input
            type="text"
            name="owners"
            id="owners"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="3"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="year"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Year of Manufacture
          </label>
          <input
            type="text"
            name="year"
            id="year"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="2024"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="transmission"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Transmission
          </label>
          <input
            type="text"
            name="transmission"
            id="transmission"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Automatic"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="insurance"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Insurance valid upto
          </label>
          <input
            type="text"
            name="insurance"
            id="insurance"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="2030"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="fitments"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            External Fitments
          </label>
          <input
            type="text"
            name="fitments"
            id="fitments"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Yes"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="kms"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Kms
          </label>
          <input
            type="text"
            name="kms"
            id="kms"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="84033"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="photo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Image.png"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="fuel"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fuel Type
          </label>
          <input
            type="text"
            name="fuel"
            id="fuel"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Petrol"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Body Type
          </label>
          <input
            type="text"
            name="body"
            id="body"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sedan"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cuddalore"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="900000"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
