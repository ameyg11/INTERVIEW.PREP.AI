import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative">
      <div className="container mx-auto px-10 md:px-0">
        {/* HEADER */}
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  {/* ✅ Fixed wrong dash in text-2xl */}
                  <h2 className="text-2xl font-medium">{role}</h2>

                  <p className="text-sm text-gray-900 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TAGS */}
          <div className="flex items-center gap-3 mt-4">
            {/* ✅ Fixed py-l → py-1 */}
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        {/* BLOB ANIMATION BACKGROUND */}
        <div className="overflow-hidden absolute top-0 right-0 w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1"></div>
          <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2"></div>
          <div className="w-16 h-16 bg-cyan-300 blur-[65px] animate-blob3"></div>
          <div className="w-16 h-16 bg-fuchsia-200 blur-[65px] animate-blob1"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
