import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "Product Manager",
    feedback:
      "This app has completely transformed how I manage tasks and collaborate with my team. It's fast, easy to use, and keeps everything organized!",
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Example image from randomuser.me
  },
  {
    name: "Jane Smith",
    role: "Freelancer",
    feedback:
      "As a freelancer, staying on top of deadlines is crucial. With this tool, I’ve never missed a deadline, and it helps me stay productive!",
    image: "https://randomuser.me/api/portraits/women/44.jpg", // Example image
  },
  {
    name: "Alex Johnson",
    role: "Developer",
    feedback:
      "I love the simplicity and power of this app. It has the right features for task management and integrates well with my workflow.",
    image: "https://randomuser.me/api/portraits/men/45.jpg", // Example image
  },
];

const Testimonials = () => {
  return (
    <div className="bg-blue-500 p-8 mt-5 shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{testimonial.role}</p>
            <p className="text-gray-600 text-center">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
