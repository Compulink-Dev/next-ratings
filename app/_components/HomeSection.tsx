import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Find and Review Caregivers
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Helping families find trusted caregivers and share their experiences
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/caregivers"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Browse Caregivers
          </Link>
          <Link
            href="/companies"
            className="border border-red-600 text-red-600 px-6 py-3 rounded-lg font-medium"
          >
            Browse Companies
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <CaregiverCategories />

      {/* Featured Caregivers */}
      <FeaturedCaregivers />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  );
}

const CaregiverCategories = () => {
  const categories = [
    {
      name: "Elderly Care",
      icon: "/icons/elderly-care.svg",
      href: "/categories/elderly-care",
    },
    {
      name: "Special Needs",
      icon: "/icons/special-needs.svg",
      href: "/categories/special-needs",
    },
    {
      name: "Post-Surgery",
      icon: "/icons/post-surgery.svg",
      href: "/categories/post-surgery",
    },
    {
      name: "Child Care",
      icon: "/icons/child-care.svg",
      href: "/categories/child-care",
    },
    {
      name: "Dementia Care",
      icon: "/icons/dementia-care.svg",
      href: "/categories/dementia-care",
    },
    {
      name: "Palliative Care",
      icon: "/icons/palliative-care.svg",
      href: "/categories/palliative-care",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Caregiver Specializations
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 mb-2">
              <Image
                src={category.icon}
                alt={category.name}
                width={48}
                height={48}
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-center font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

const FeaturedCaregivers = () => {
  // This would be replaced with actual data fetching
  const caregivers = [
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 4.9,
      reviews: 42,
      specialty: "Elderly Care",
      image: "/caregivers/sarah-johnson.jpg",
    },
    // ... more caregivers
  ];

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Highly Rated Caregivers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Image
                  src={caregiver.image}
                  alt={caregiver.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{caregiver.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="ml-2 text-gray-600">
                      {caregiver.rating} ({caregiver.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Specialty: {caregiver.specialty}
              </p>
              <Link
                href={`/caregivers/${caregiver.id}`}
                className="text-red-600 font-medium"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Find Caregivers",
      description: "Search by specialty, location, or ratings",
      icon: "🔍",
    },
    {
      title: "Read Reviews",
      description: "See what others say about their experience",
      icon: "📖",
    },
    {
      title: "Leave Feedback",
      description: "Share your experience to help others",
      icon: "✍️",
    },
  ];

  return (
    <section className="py-12 bg-gray-50 rounded-lg my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {steps.map((step, index) => (
          <div key={index} className="text-center p-6">
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "This platform helped me find the perfect caregiver for my mother. The reviews were accurate and very helpful.",
      author: "Maria Gonzalez",
    },
    // ... more testimonials
  ];

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        What Families Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <blockquote className="text-gray-600 italic mb-4">
              "{testimonial.quote}"
            </blockquote>
            <p className="font-medium">— {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
