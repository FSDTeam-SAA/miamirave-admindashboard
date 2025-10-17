"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Bradcrumb from "@/components/shyard/Bradcrumb";
import { CustomPagination } from "@/components/shyard/CustomPagination";

type OrderStatus = "Pending" | "Processing" | "Completed" | "Canceled";

interface Order {
  id: string;
  customerId: string;
  productName: string;
  description?: string;
  productImage: string;
  orderId: string;
  totalPrice: string;
  date: string;
  time: string;
  status: OrderStatus;
}

const initialOrders: Order[] = [
  {
    id: "1",
    customerId: "1140",
    productName: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    description: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    productImage: "/assets/product.png",
    orderId: "275936",
    totalPrice: "$250",
    date: "07/05/2025",
    time: "03:18pm",
    status: "Pending",
  },
  {
    id: "2",
    customerId: "1140",
    productName: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    productImage: "/assets/product.png",
    orderId: "275936",
    totalPrice: "$250",
    date: "07/05/2025",
    time: "03:18pm",
    status: "Processing",
  },
  {
    id: "3",
    customerId: "1140",
    productName: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    productImage: "/assets/product.png",
    orderId: "275936",
    totalPrice: "$250",
    date: "07/05/2025",
    time: "03:18pm",
    status: "Completed",
  },
  {
    id: "4",
    customerId: "1140",
    productName: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    productImage: "/assets/product.png",
    orderId: "275936",
    totalPrice: "$250",
    date: "07/05/2025",
    time: "03:18pm",
    status: "Canceled",
  },
  {
    id: "5",
    customerId: "1140",
    productName: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    productImage: "/product-image.png",
    orderId: "275936",
    totalPrice: "$250",
    date: "07/05/2025",
    time: "03:18pm",
    status: "Pending",
  },
  {
    id: "6",
    customerId: "1140",
    productName: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    productImage: "/product-image.png",
    orderId: "275936",
    totalPrice: "$250",
    date: "07/05/2025",
    time: "03:18pm",
    status: "Pending",
  },
  {
    id: "7",
    customerId: "1140",
    productName: "10,000MG Maximum Strength Full Spectrum CBD Topical Cream",
    productImage: "/product-image.png",
    orderId: "275936",
    totalPrice: "$250",
    date: "07/05/2025",
    time: "03:18pm",
    status: "Pending",
  },
];

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Adjust based on your needs
    const totalItems = orders.length

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return "bg-[#AA1757] text-white hover:bg-[#AA1757]/90 w-[130px]";
      case "Processing":
        return "bg-[#E6E6E6] text-gray-700 hover:bg-[#E6E6E6]/90 w-[130px]";
      case "Completed":
        return "bg-[#255C2B] text-white hover:bg-[#255C2B]/90 w-[130px]";
      case "Canceled":
        return "bg-[#B50000] text-white hover:bg-[#B50000]/90 w-[130px]";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Green accent bar */}

      {/* Header */}
      <div className=" py-6">
        <div className="flex items-center justify-between">
          <Bradcrumb pageName="Order" subPageName="" />
          <Button
            size="icon"
            className="bg-[#F0217A] w-[200px] h-[50px] hover:bg-accent-pink/90 text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className=" py-6">
        <div className="overflow-hidden rounded-lg  ">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border ">
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Total Price
                </th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-[#2F2F2F] text-[18px] font-medium text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-6 py-4 text-base text-[#3E3E3E] font-medium text-foreground">
                    {order.customerId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={order.productImage || "/placeholder.svg"}
                          alt={order.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-base text-[#3E3E3E] font-medium text-foreground">
                          {order.productName}
                        </span>
                        <p className="text-base text-[#3E3E3E] font-medium text-foreground">
                          {order.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base text-[#3E3E3E] font-medium text-foreground">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4 text-base text-[#3E3E3E] font-medium text-foreground">
                    {order.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-base text-[#3E3E3E] font-medium text-foreground">
                      {order.date}{" "}
                      <span className="text-muted-foreground">
                        {order.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className={`min-w-[120px] justify-between rounded-md px-4 py-2 text-base text-[#3E3E3E] font-medium font-medium ${getStatusStyles(
                            order.status
                          )}`}
                        >
                          {order.status}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[140px]">
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(order.id, "Pending")
                          }
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(order.id, "Processing")
                          }
                        >
                          Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(order.id, "Completed")
                          }
                        >
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(order.id, "Canceled")
                          }
                        >
                          Canceled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
      </div>
    </div>
  );
}
