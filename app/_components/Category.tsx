"use client";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { ChartArea } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  companies?: any[]; // You might want to create a proper type for companies
}

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div
      className="relative h-[200px] w-full rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${category.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white flex items-center justify-between w-full">
        <div className="">
          <p className="text-xs">
            {category.companies?.length || 0}{" "}
            {category.companies?.length === 1 ? "Company" : "Companies"}
          </p>
          <p className="font-bold text-2xl">{category.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <ChartArea size={16} />
          <p className="text-xs">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

const CategorySkeleton = () => {
  return <Skeleton className="h-[200px] w-full rounded-lg" />;
};

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container pt-8 pb-12">
      <div className="flex items-center justify-between">
        <Title
          title="Top Categories"
          subtitle="View the most reviewed categories"
        />
        <Button
          variant={"outline"}
          className="border-red-900 text-color hover:bg-color hover:text-white"
        >
          View all
        </Button>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p>No categories found. Please check back later.</p>
          </div>
        ) : (
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;
