"use client";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import Bradcrumb from "@/components/shyard/Bradcrumb";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  date: string;
  image: string;
  discription?: string;
}

const mockProducts: Product[] = [
  {
    id: 1140,
    image: "/assets/product.png",
    discription: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    price: 8.0,
    date: "01 july 2025 03:18 AM",
  },
  {
    id: 1140,
    image: "/assets/product.png",
    name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    price: 8.0,
    date: "01 july 2025 03:18 AM",
  },
  {
    id: 1140,
    image: "/assets/product.png",
    name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    price: 8.0,
    date: "01 july 2025 03:18 AM",
  },
  {
    id: 1140,
    image: "/assets/product.png",
    name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    price: 8.0,
    date: "01 july 2025 03:18 AM",
  },
  {
    id: 1140,
    image: "/assets/promo.png",
    name: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    price: 8.0,
    date: "01 july 2025 03:18 AM",
  },
];

export default function PromoViewPage() {
  // const params = useParams();
  // const promoId = params.id;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = mockProducts.length;

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <Bradcrumb pageName="Promo List" subPageName="Promo view" />

      {/* Content */}
      <main className="">
        {/* Promo Card */}
        <div className="mb-8 mt-[60px]  w-[516px] h-[169px]">
          <Image
            src="/assets/promo.png"
            width={1000}
            height={1000}
            alt="logo"
            className="w-full h-full rounded-[20px]"
          />
        </div>

        {/* Promo Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#131313]">
            SUPER SAVING - 18%
          </h2>
          <p className="text-xl text-muted-[#131313] mt-6">Under of products</p>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto rounded-lg border border-border ">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border ">
                <th className="px-6 py-4 text-left text-base font-semibold text-[#2F2F2F]">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-[#2F2F2F]">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-[#2F2F2F]">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-[#2F2F2F]">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-[#2F2F2F]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded " >
                        <Image
                          src={product.image}
                          width={1000}
                          height={1000}
                          alt="logo"
                          className="w-full h-full rounded-[20px]"
                        />
                      </div>
                      <div>
                        <div>

                      {product.name}
                        </div>
                      <span>{product.discription}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-[18px] text-[#3E3E3E]">
                    {product.date}
                  </td>
                  <td className="px-6 py-4 text-[18px] flex gap-2">
                    <button className="text-[#424242] ">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="w-full">
          <CustomPagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
