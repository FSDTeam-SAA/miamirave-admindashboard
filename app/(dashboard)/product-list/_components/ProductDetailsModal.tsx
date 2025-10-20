"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils"; // optional; remove if you don't have it

type Price = { quantity: string; price: string; unit: string };

interface PopulatedRef {
  _id: string;
  name?: string;
  description?: string;
}

interface LabTHC {
  totalTHC?: number;
  thca?: number;
  delta9THC?: number;
}
interface LabCBD {
  totalCBD?: number;
  cbda?: number;
  cbg?: number;
  cbga?: number;
}
interface LabTerpenes {
  totalTerpenes?: number;
  bMyrcene?: number;
  terpinolene?: number;
  ocimene?: number;
  bCaryophyllene?: number;
}
interface LabData {
  thc?: LabTHC;
  cbd?: LabCBD;
  terpenes?: LabTerpenes;
}

interface Product {
  _id: string;
  title: string;
  subTitle: string;
  description: string; // HTML string from API
  totalTHC: number;
  totalCBD: number;
  thcCbdRatio: string;
  totalTerpenes: number;
  totalSize: string;
  strainPrevalence: string;
  unitsInPackage: number;
  strain: string;
  thumbnail: string[]; // array of URLs
  setPrices: Price[];
  topTerpenes?: {
    bCaryophyllene?: number;
    limonene?: number;
    humulene?: number;
    linalool?: number;
  };
  labData?: LabData;
  category?: string | PopulatedRef;
  subcategory?: string | PopulatedRef;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

function formatPct(n?: number) {
  if (n === null || n === undefined) return "—";
  return `${n}%`;
}
function formatMoney(s?: string) {
  if (!s && s !== "0") return "—";
  // keep backend string, but add $ prefix
  return `$${s}`;
}
function getName(val?: string | PopulatedRef) {
  if (!val) return "—";
  return typeof val === "string" ? val : val.name || "—";
}

export default function ProductDetailsModal({
  isOpen,
  onClose,
  product,
}: ProductDetailsModalProps) {
  // Early return if not loaded
  if (!product) return null;

  // images
  const images = product.thumbnail?.length ? product.thumbnail : [];
  const [activeIdx, setActiveIdx] = useState(0);

  // Clamp active index if product changes
  const maxIdx = Math.max(0, images.length - 1);
  const safeActiveIdx = Math.min(activeIdx, maxIdx);

  const hasLab = !!product.labData;
  const hasTopTerps = !!product.topTerpenes;

  const thc = product.labData?.thc;
  const cbd = product.labData?.cbd;
  const terps = product.labData?.terpenes;

  const priceRows = useMemo(() => product.setPrices ?? [], [product.setPrices]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.title}</DialogTitle>
          {product.subTitle && (
            <p className="text-sm text-muted-foreground">{product.subTitle}</p>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Thumbnails */}
          {images.length > 0 ? (
            <div className="space-y-3">
              <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={images[safeActiveIdx]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      className={cn(
                        "relative h-16 w-16 rounded-md overflow-hidden border",
                        i === safeActiveIdx && "ring-2 ring-primary"
                      )}
                      title={`Image ${i + 1}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <Image
                        src={src}
                        alt={`${product.title} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-40 rounded-lg overflow-hidden border bg-muted" />
          )}

          {/* Description (HTML) */}
          {product.description && (
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Description</h3>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Category / Subcategory */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-foreground">
              <span className="text-muted-foreground">Category:</span>{" "}
              {getName(product.category)}
            </p>
            <p className="text-foreground">
              <span className="text-muted-foreground">Subcategory:</span>{" "}
              {getName(product.subcategory)}
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Pricing</h3>
            {priceRows.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {priceRows.map((p, i) => (
                  <div
                    key={`${p.unit}-${p.quantity}-${i}`}
                    className="rounded-md border p-2 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {p.quantity} {p.unit}
                      </span>
                      <span className="font-medium">{formatMoney(p.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No pricing available.</p>
            )}
          </div>

          {/* High-level Potency */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Potency</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-foreground">
                <span className="text-muted-foreground">Total THC:</span>{" "}
                {formatPct(product.totalTHC)}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Total CBD:</span>{" "}
                {formatPct(product.totalCBD)}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">THC:CBD Ratio:</span>{" "}
                {product.thcCbdRatio || "—"}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Total Terpenes:</span>{" "}
                {formatPct(product.totalTerpenes)}
              </p>
            </div>
          </div>

          {/* Lab Data (detailed) */}
          {(hasLab || hasTopTerps) && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Lab Data</h3>

              {/* THC block */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">THC (Total):</span>{" "}
                  {formatPct(thc?.totalTHC)}
                </div>
                <div>
                  <span className="text-muted-foreground">THCA:</span>{" "}
                  {formatPct(thc?.thca)}
                </div>
                <div>
                  <span className="text-muted-foreground">Δ9-THC:</span>{" "}
                  {formatPct(thc?.delta9THC)}
                </div>
              </div>

              {/* CBD block */}
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">CBD (Total):</span>{" "}
                  {formatPct(cbd?.totalCBD)}
                </div>
                <div>
                  <span className="text-muted-foreground">CBDA:</span>{" "}
                  {formatPct(cbd?.cbda)}
                </div>
                <div>
                  <span className="text-muted-foreground">CBG:</span>{" "}
                  {formatPct(cbd?.cbg)}
                </div>
                <div>
                  <span className="text-muted-foreground">CBGA:</span>{" "}
                  {formatPct(cbd?.cbga)}
                </div>
              </div>

              {/* Terpenes block */}
              <div className="grid grid-cols-5 gap-2 text-sm">
                <div className="col-span-1">
                  <span className="text-muted-foreground">Terpenes (Total):</span>{" "}
                  {formatPct(terps?.totalTerpenes)}
                </div>
                <div>
                  <span className="text-muted-foreground">β-Myrcene:</span>{" "}
                  {formatPct(terps?.bMyrcene)}
                </div>
                <div>
                  <span className="text-muted-foreground">Terpinolene:</span>{" "}
                  {formatPct(terps?.terpinolene)}
                </div>
                <div>
                  <span className="text-muted-foreground">Ocimene:</span>{" "}
                  {formatPct(terps?.ocimene)}
                </div>
                <div>
                  <span className="text-muted-foreground">β-Caryophyllene:</span>{" "}
                  {formatPct(terps?.bCaryophyllene)}
                </div>
              </div>

              {/* “Top Terpenes” summary */}
              {hasTopTerps && (
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">b-Caryophyllene:</span>{" "}
                    {formatPct(product.topTerpenes?.bCaryophyllene)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Limonene:</span>{" "}
                    {formatPct(product.topTerpenes?.limonene)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Humulene:</span>{" "}
                    {formatPct(product.topTerpenes?.humulene)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Linalool:</span>{" "}
                    {formatPct(product.topTerpenes?.linalool)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Product Details */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Product Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-foreground">
                <span className="text-muted-foreground">Size:</span> {product.totalSize || "—"}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Strain:</span> {product.strain || "—"}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Provenance:</span>{" "}
                {product.strainPrevalence || "—"}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Units / Package:</span>{" "}
                {product.unitsInPackage ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
