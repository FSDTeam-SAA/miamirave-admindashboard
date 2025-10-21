"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { PromoFormModal } from "./promo-form-modal";
import { DeletePromoModal } from "./delete-promo-modal";
import { CustomPagination } from "@/components/shyard/CustomPagination";
import Link from "next/link";

interface Promo {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
}

interface PromosTableProps {
  promos: Promo[];
  isLoading: boolean;
}

export function PromosTable({ promos, isLoading }: PromosTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Promo | undefined>();
  const [deletePromoId, setDeletePromoId] = useState<string>("");
  const [deletePromoName, setDeletePromoName] = useState<string>("");

  const itemsPerPage = 5;
  const totalItems = promos.length;
  const paginatedPromos = promos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (promo: Promo) => {
    setSelectedPromo(promo);
    setFormModalOpen(true);
  };

  const handleDeleteClick = (promo: Promo) => {
    setDeletePromoId(promo._id);
    setDeletePromoName(promo.name);
    setDeleteModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedPromo(undefined);
    setFormModalOpen(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading promos...</div>;
  }

  if (promos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No promos found</p>
        <Button onClick={handleCreateNew}>Create First Promo</Button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Promo Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date Range
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPromos.map((promo) => (
              <tr key={promo._id} className="border-b last:border-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={promo.image || "/placeholder.svg"}
                        alt={promo.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{promo.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {promo.description.substring(0, 50)}...
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(promo.startDate).toLocaleDateString()} -{" "}
                  {new Date(promo.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Button
                    variant="ghost"

                    size="sm"
                    onClick={() => handleEdit(promo)}
                    title="Edit promo"
                  >
                    <Edit size={18} className="text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(promo)}
                    title="Delete promo"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <PromoFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        promo={selectedPromo}
      />

      <DeletePromoModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        promoId={deletePromoId}
        promoName={deletePromoName}
      />
    </>
  );
}
