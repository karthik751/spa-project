import Image from "next/image";

export default function Card(props: any) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="p-8 rounded-t-lg"
          src={props.entry.photo}
          alt="product image"
          height="120"
          width="120"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.entry.brand}
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Rs. {props.entry.price}
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {props.entry.location}
          </span>
        </div>
      </div>
    </div>
  );
}
