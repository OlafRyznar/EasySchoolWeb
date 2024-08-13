import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Mission Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to make high-quality education accessible to everyone, everywhere. We strive to empower learners with the tools and knowledge they need to succeed.
          </p>
        </section>

        {/* Values Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-gray-700">
            Integrity, Excellence, and Inclusivity guide everything we do. We are committed to fostering a learning environment that values each individual and encourages personal growth.
          </p>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
          <p className="text-lg text-gray-700">
            Our team is made up of dedicated professionals who are passionate about education and committed to providing the best learning experience. Each member brings unique expertise and a shared vision for the future of education.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
