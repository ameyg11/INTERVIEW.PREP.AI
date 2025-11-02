import React from "react";
import { getInitials } from "../../utils/helper";
// Assuming you have imported icons (e.g., from a library like 'lucide-react' or 'heroicons')
// For this example, I'll use placeholders for Briefcase, CheckCircle, and Calendar icons.
// import { Briefcase, CheckCircle, Calendar } from 'lucide-react'; 

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      // Main Card: Added transition, slightly darker hover shadow, and an explicit hover border
      className="bg-white border border-gray-200 rounded-xl p-3 overflow-hidden cursor-pointer relative group transition duration-300 hover:shadow-lg hover:border-gray-300"
      onClick={onSelect}
    >
      {/* Top Section Container: Role, Icon, and Delete Button */}
      <div
        className="rounded-lg p-4 pb-0 relative"
        style={{
          background: colors.bgcolor, // Sets background from props
        }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 shadow">
            <span className="text-xl font-semibold text-black">
              {getInitials(role)} {/* Abbreviation */}
            </span>
          </div>

          {/* Title and Skills */}
          <div className="flex-grow min-w-0">
            <h2 className="text-lg font-bold text-gray-800 truncate">{role}</h2>{" "}
            <p className="text-sm text-gray-600 truncate mt-1">
              {topicsToFocus}
            </p>
          </div>

          {/* Delete Button (Refined Placement and Hover visibility) */}
          <button
            className="absolute top-2 right-2 p-2 rounded-full bg-rose-50 border border-rose-200 text-rose-600 opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-rose-100 hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation(); // Prevents onSelect from triggering
              onDelete();
            }}
            title="Delete Session"
          >
            {/* Using a placeholder for the Trash Can/Delete Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Separator */}
      <hr className="my-4 border-gray-200" />

      {/* Footer Section: Metadata and Description */}
      <div className="px-1 pb-1">
        {/* Metadata Tags: Using Icons and clearer structure */}
        <div className="flex items-center gap-4">
          
          {/* Experience Tag */}
          <div className="flex items-center text-sm font-medium text-gray-700 whitespace-nowrap">
            {/* Briefcase Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1 text-blue-500"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span className="text-sm">
              {experience} {experience == 1 ? "Year" : "Years"}
            </span>
          </div>

          {/* Q&A Tag */}
          <div className="flex items-center text-sm font-medium text-gray-700 whitespace-nowrap">
            {/* CheckCircle Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1 text-green-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="text-sm">{questions} Q&A</span>
          </div>
          
          {/* Last Updated - Moved to the right for better hierarchy */}
          <div className="ml-auto flex items-center text-xs font-normal text-gray-500 whitespace-nowrap">
            {/* Calendar Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1 text-gray-400"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2 mt-4">{description}</p>
      </div>
    </div>
  );
};

export default SummaryCard;