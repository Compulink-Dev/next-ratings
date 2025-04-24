import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Adult Day Care Facility Caregivers",
    icon: "/categories-icons/banks.svg",
    href: "/categories/bank",
  },
  {
    name: "Agency Caregivers",
    icon: "/categories-icons/travel_insurance.svg",
    href: "/categories/travel_insurance_company",
  },
  {
    name: "Assisted Living Facility Caregivers",
    icon: "/categories-icons/car_dealer.svg",
    href: "/categories/car_dealer",
  },
  {
    name: "Certified Nursing Assistants",
    icon: "/categories-icons/furniture_store.svg",
    href: "/categories/furniture_store",
  },
  {
    name: "Family Caregivers",
    icon: "/categories-icons/jewelry_store.svg",
    href: "/categories/jewelry_store",
  },
  {
    name: "Home Health Aides",
    icon: "/categories-icons/clothing_store.svg",
    href: "/categories/clothing_store",
  },
  {
    name: "Hospice And Palliative Caregivers",
    icon: "/categories-icons/electronics_technology.svg",
    href: "/categories/electronics_technology",
  },
  {
    name: "Independent Caregivers",
    icon: "/categories-icons/fitness_nutrition_center.svg",
    href: "/categories/fitness_and_nutrition_service",
  },
  {
    name: "Informal Caregivers",
    icon: "/categories-icons/pet_store.svg",
    href: "/categories/pet_store",
  },
  {
    name: "Non-Medical Caregivers",
    icon: "/categories-icons/energy_supplier.svg",
    href: "/categories/energy_supplier",
  },
  {
    name: "Personal Care Attendants",
    icon: "/categories-icons/real_estate_agents.svg",
    href: "/categories/real_estate_agents",
  },
  {
    name: "Private-Duty Caregivers",
    icon: "/categories-icons/insurance_agency.svg",
    href: "/categories/insurance_agency",
  },
  {
    name: "Senior Facility Caregivers",
    icon: "/categories-icons/bedroom_furniture.svg",
    href: "/categories/bedroom_furniture_store",
  },
  {
    name: "Skilled Nursing Home Caregivers",
    icon: "/categories-icons/activewear.svg",
    href: "/categories/activewear_store",
  },
  {
    name: "Virtual Caregivers",
    icon: "/categories-icons/womens_clothing_store.svg",
    href: "/categories/womens_clothing_store",
  },
  {
    name: "Volunteer Caregivers",
    icon: "/categories-icons/mens_clothing_store.svg",
    href: "/categories/mens_clothing_store",
  },
  //   {
  //     name: "Bicycle Store",
  //     icon: "/categories-icons/bicycle_shop.svg",
  //     href: "/categories/bicycle_store",
  //   },
  //   {
  //     name: "Shoe Store",
  //     icon: "/categories-icons/shoe_store.svg",
  //     href: "/categories/shoe_store",
  //   },
  //   {
  //     name: "Mortgage Broker",
  //     icon: "/categories-icons/mortgage_broker.svg",
  //     href: "/categories/mortgage_broker",
  //   },
  //   {
  //     name: "Appliance Store",
  //     icon: "/categories-icons/appliance_store.svg",
  //     href: "/categories/appliance_store",
  //   },
  //   {
  //     name: "Cosmetics Store",
  //     icon: "/categories-icons/cosmetics_store.svg",
  //     href: "/categories/cosmetics_store",
  //   },
  //   {
  //     name: "Electronics Store",
  //     icon: "/categories-icons/electronic_store.svg",
  //     href: "/categories/electronics_store",
  //   },
  //   {
  //     name: "Garden Center",
  //     icon: "/categories-icons/garden_center.svg",
  //     href: "/categories/garden_center",
  //   },
  //   {
  //     name: "Travel Agency",
  //     icon: "/categories-icons/travel_agency.svg",
  //     href: "/categories/travel_agency",
  //   },
];

export default function CategoryCarousel() {
  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          What kind of assistance are you looking for?
        </h2>
        <div className="flex items-center gap-2">
          <button
            name="scroll-back"
            className="p-2 rounded-full border border-gray-300 disabled:opacity-50"
            disabled
            aria-label="Scroll back"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m3.2 7.987 6.344-6.343.375-.344.687.687-.344.375-5.656 5.625 6 6-.687.72-.375-.345-6-6-.344-.375Z"></path>
            </svg>
          </button>
          <button
            name="scroll-forward"
            className="p-2 rounded-full border border-gray-300"
            aria-label="Scroll forward"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m12.806 7.987-.343.375-6.344 6.344-.719-.718 6-6-5.656-5.626-.344-.375.719-.687 6.687 6.687Z"></path>
            </svg>
          </button>
          <Link
            href="/categories"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
          >
            See more
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <div key={category.name} className="flex-shrink-0 w-24">
              <Link
                href={category.href}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 mb-2">
                  <Image
                    src={category.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm">{category.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
