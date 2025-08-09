import React from "react";

interface CourseProps {
  image: string;
  title: string;
  description: string;
}

const Course: React.FC<CourseProps> = ({ image, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`/${image}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Fallback to a placeholder if image doesn't exist
            const target = e.target as HTMLImageElement;
            target.src = '/Photo.png';
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative p-4 space-y-3">
        <h3 className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300 vietnamese-text">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 vietnamese-text">
          {description}
        </p>
        
        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default Course;
