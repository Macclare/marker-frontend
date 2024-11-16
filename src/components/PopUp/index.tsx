import React from "react";

interface Location {
  name: string;
  location: { lat: number; lng: number } | null;
}

const index = ({
  locationData,
  onClick,
}: {
  locationData: Location;
  onClick?: () => void;
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-xs">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Location Details</h2>
      {locationData.location ? (
        <div className="text-gray-600">
          <p className="text-sm mb-1">
            <span className="font-semibold">Name:</span> {locationData.name}
          </p>
          <p className="text-sm mb-1">
            <span className="font-semibold">Latitude:</span> {locationData.location.lat}
          </p>
          <p className="text-sm mb-3">
            <span className="font-semibold">Longitude:</span> {locationData.location.lng}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Location details are unavailable.</p>
      )}
      <button
        onClick={onClick}
        className="w-full mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Location
      </button>
    </div>
  );
};

export default index;
