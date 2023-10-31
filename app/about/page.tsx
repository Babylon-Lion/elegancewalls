import Image from 'next/image';
import about from '../../public/elegance-walls-store.jpg';
function page() {
  return (
    <div className="px-4 py-9 2xl:container md:px-6 md:py-12 lg:px-20 lg:py-16 2xl:mx-auto">
      <p className="cursor-pointer pb-2 text-sm font-normal leading-3 text-indigo-700 hover:text-indigo-800">
        About
      </p>
      <div className="flex flex-col gap-12 sm:gap-10 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-6/12">
          <h2 className="w-full text-3xl font-bold leading-9 lg:text-4xl lg:leading-10">
            Your Journey to Exquisite Interiors Begins Here
          </h2>
          <p className="mt-6 text-base font-normal leading-6 text-gray-600">
            Elegance Wallpaper is a leading provider of high-quality interior design products and
            services. We offer a wide range of wallcoverings, including wallpaper, commercial grade
            vinyl, custom printed murals, and more, as well as expert design consultations to help
            bring your vision to life. At Elegance Wallpaper we're passionate about creating
            beautiful and functional spaces that reflect your unique style and personality. With a
            commitment to quality, creativity, and customer service, we strive to exceed your
            expectations and help you transform your space into something truly remarkable.
          </p>
        </div>
        <div className="relative w-full lg:w-6/12">
          <Image src={about} alt="people discussing on board" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>

      <div className="relative mt-24">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
          <div className="z-20 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5V21"
                stroke="white"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 5V14"
                stroke="white"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 4.99984C5.93464 4.08371 7.19124 3.57056 8.5 3.57056C9.80876 3.57056 11.0654 4.08371 12 4.99984C12.9346 5.91598 14.1912 6.42913 15.5 6.42913C16.8088 6.42913 18.0654 5.91598 19 4.99984"
                stroke="white"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 14.0001C5.93464 13.084 7.19124 12.5708 8.5 12.5708C9.80876 12.5708 11.0654 13.084 12 14.0001C12.9346 14.9162 14.1912 15.4294 15.5 15.4294C16.8088 15.4294 18.0654 14.9162 19 14.0001"
                stroke="white"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <svg
            className="z-20"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="#1F2937" />
            <path
              d="M26 15V19C26 19.2652 26.1054 19.5196 26.2929 19.7071C26.4804 19.8946 26.7348 20 27 20H31"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 30V31C31 31.5304 30.7893 32.0391 30.4142 32.4142C30.0391 32.7893 29.5304 33 29 33H19C18.4696 33 17.9609 32.7893 17.5858 32.4142C17.2107 32.0391 17 31.5304 17 31V30"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 26H33M15 26H18H15ZM22.5 26H25.5H22.5Z"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 22V17C17 16.4696 17.2107 15.9609 17.5858 15.5858C17.9609 15.2107 18.4696 15 19 15H26L31 20V22"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            className="z-20 hidden sm:block"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="#1F2937" />
            <path
              d="M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 33V31C15 29.9391 15.4214 28.9217 16.1716 28.1716C16.9217 27.4214 17.9391 27 19 27H23C24.0609 27 25.0783 27.4214 25.8284 28.1716C26.5786 28.9217 27 29.9391 27 31V33"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 15.1301C28.8604 15.3504 29.623 15.8508 30.1676 16.5524C30.7122 17.254 31.0078 18.117 31.0078 19.0051C31.0078 19.8933 30.7122 20.7562 30.1676 21.4578C29.623 22.1594 28.8604 22.6598 28 22.8801"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33 33.0001V31.0001C32.9949 30.1173 32.6979 29.2609 32.1553 28.5645C31.6126 27.8682 30.8548 27.3708 30 27.1501"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <hr className="absolute top-2/4 z-10 w-full bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
        <div>
          <p className="mt-6 text-xl font-semibold leading-5 text-gray-800 lg:text-2xl lg:leading-6">
            We Ship to all North America
          </p>
          <p className="mt-6 text-base font-normal leading-6 text-gray-600">
            At Elegance Wallpaper, we're proud to offer seamless service to all of North America.
            Whether you're in the bustling cities of the United States, the serene landscapes of
            Canada, or anywhere in between, our commitment to excellence knows no borders. We're
            dedicated to delivering our high-quality interior design products and services to your
            doorstep, ensuring that your vision for stunning spaces transcends geographical
            boundaries.
          </p>
        </div>
        <div>
          <p className="mt-6 text-xl font-semibold leading-5 text-gray-800 lg:text-2xl lg:leading-6">
            High Quality Wallcoverings
          </p>
          <p className="mt-6 text-base font-normal leading-6 text-gray-600">
            At Elegance Wallpaper, our mission is simple yet profound: to provide you with the
            finest high-quality wallcoverings that transform your living spaces into works of art.
            Our extensive selection, ranging from elegant wallpaper to durable commercial-grade
            vinyl and custom printed murals, reflects our unwavering dedication to excellence. With
            an unwavering commitment to quality, creativity, and superior customer service, we're
            your trusted partner in elevating your interior design to the highest level of
            sophistication
          </p>
        </div>
        <div className="hidden sm:block">
          <p className="mt-6 text-xl font-semibold leading-5 text-gray-800 lg:text-2xl lg:leading-6">
            Most Advanced Technology
          </p>
          <p className="mt-6 text-base font-normal leading-6 text-gray-600">
            Elegance Wallpaper: Where Design Meets Innovation Powered by the Most Advanced Web
            Technology, AI, and Augmented Reality. We're at the forefront of interior design with
            the most advanced technology, including cutting-edge web solutions and edge services
            that make browsing seamless and lightning-fast. Our integration of artificial
            intelligence and augmented reality takes your design journey to new heights, allowing
            you to visualize and customize your spaces like never before. From innovative wallpaper
            production methods to state-of-the-art digital printing, we embrace technology to
            deliver you products that are both visually stunning and built to last. Discover the
            future of interior design with Elegance Wallpaper.
          </p>
        </div>
      </div>
      <div className="relative mt-8 block sm:hidden">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
          <svg
            className="z-20"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="#1F2937" />
            <path
              d="M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 33V31C15 29.9391 15.4214 28.9217 16.1716 28.1716C16.9217 27.4214 17.9391 27 19 27H23C24.0609 27 25.0783 27.4214 25.8284 28.1716C26.5786 28.9217 27 29.9391 27 31V33"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 15.1301C28.8604 15.3504 29.623 15.8508 30.1676 16.5524C30.7122 17.254 31.0078 18.117 31.0078 19.0051C31.0078 19.8933 30.7122 20.7562 30.1676 21.4578C29.623 22.1594 28.8604 22.6598 28 22.8801"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33 33.0001V31.0001C32.9949 30.1173 32.6979 29.2609 32.1553 28.5645C31.6126 27.8682 30.8548 27.3708 30 27.1501"
              stroke="white"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <hr className="absolute top-2/4 z-10 w-full bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:hidden sm:grid-cols-3 sm:gap-8">
        <div>
          <p className="mt-6 text-xl font-semibold leading-5 text-gray-800 lg:text-2xl lg:leading-6">
            400k User
          </p>
          <p className="mt-6 text-base font-normal leading-6 text-gray-600">.</p>
        </div>
      </div>

      <div className="mt-16 flex flex-col justify-between gap-16 md:gap-14 lg:mt-20 lg:flex-row">
        <div className="w-full lg:w-6/12">
          <h2 className="text-3xl font-bold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
            Our Mission
          </h2>
          <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600 lg:w-10/12 xl:w-9/12">
            At Elegance Wallpaper, our mission is to transcend the ordinary and elevate interior
            design into an art form. We are dedicated to providing our valued customers with the
            highest quality wallcoverings and interior design solutions. We believe that every space
            has the potential to become a masterpiece, a reflection of individuality, and a source
            of inspiration. With a commitment to quality, creativity, and customer service, we
            strive to exceed expectations and empower our clients to transform their spaces into
            something truly remarkable.
          </p>
          <p className="mt-10 w-full text-base font-normal leading-6 text-gray-600 lg:w-10/12 xl:w-9/12">
            Our relentless pursuit of innovation drives us to integrate cutting-edge web technology,
            artificial intelligence, and augmented reality to offer an unparalleled design
            experience. We aspire to not only meet the evolving needs of our customers but also to
            set new standards in the interior design industry. Our passion for creating beautiful
            and functional spaces that reflect unique styles and personalities defines our purpose,
            and we are dedicated to being your trusted partner in the journey to design excellence.
          </p>
        </div>
        <div className="w-full lg:w-6/12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12">
            {/* <!-- Team Card --> */}
            <div className="flex p-4 shadow-md">
              <div className="mr-6">
                <svg
                  className="mr-6"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 15C20.4853 15 22.5 12.9853 22.5 10.5C22.5 8.01472 20.4853 6 18 6C15.5147 6 13.5 8.01472 13.5 10.5C13.5 12.9853 15.5147 15 18 15Z"
                    stroke="#1F2937"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25.5 28.5C27.9853 28.5 30 26.4853 30 24C30 21.5147 27.9853 19.5 25.5 19.5C23.0147 19.5 21 21.5147 21 24C21 26.4853 23.0147 28.5 25.5 28.5Z"
                    stroke="#1F2937"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 28.5C12.9853 28.5 15 26.4853 15 24C15 21.5147 12.9853 19.5 10.5 19.5C8.01472 19.5 6 21.5147 6 24C6 26.4853 8.01472 28.5 10.5 28.5Z"
                    stroke="#1F2937"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="">
                <p className="text-xl font-semibold leading-5 text-gray-800 lg:text-2xl lg:leading-6">
                  Team
                </p>
                <p className="mt-2 text-base font-normal leading-6 text-gray-600">
                  At Elegance Wallpaper, our team is a collective of passionate designers,
                  technologists, and customer service experts, united by a shared dedication to
                  turning design dreams into reality. With creativity at our core and a commitment
                  to excellence, we work tirelessly to provide top-notch interior design solutions
                  and exceptional customer experiences.
                </p>
              </div>
            </div>

            {/* <!-- Press Card --> */}
            <div className="flex p-4 shadow-md">
              <div className="mr-6">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.5 7.5H7.5C5.84315 7.5 4.5 8.84315 4.5 10.5V25.5C4.5 27.1569 5.84315 28.5 7.5 28.5H28.5C30.1569 28.5 31.5 27.1569 31.5 25.5V10.5C31.5 8.84315 30.1569 7.5 28.5 7.5Z"
                    stroke="#1F2937"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.5 10.5L18 19.5L31.5 10.5"
                    stroke="#1F2937"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="">
                <p className="text-xl font-semibold leading-5 text-gray-800 lg:text-2xl lg:leading-6">
                  Press
                </p>
                <p className="mt-2 text-base font-normal leading-6 text-gray-600">
                  Explore what the world is saying about Elegance Wallpaper in our Press section –
                  where our innovative designs and cutting-edge technology capture the spotlight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
