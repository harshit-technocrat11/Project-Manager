import React from 'react'

export default function ProgressBar({progress}) {
   
  return (
    <>
      
      <div className="mt-3">
        <p className="text-sm font-medium">Progress</p>

     
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
          <div
            className={`h-full ${
              progress === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      
      </div>
    </>
  );
}
