// DisplayGeneratedTrips.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TripCard = ({ trip }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          {trip.tripDetails.location} - {trip.tripDetails.duration}
        </h2>
        <p className="text-gray-600 mt-1">
          Travelers: <span className="font-medium">{trip.tripDetails.travelers}</span> | Budget: <span className="font-medium">{trip.tripDetails.budget}</span>
        </p>
        {trip.recommendationDisclaimer && (
          <p className="text-sm text-gray-500 mt-2">{trip.recommendationDisclaimer}</p>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b">
        {['overview', 'hotels', 'itinerary'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p>
              <strong>Location:</strong> {trip.tripDetails.location}
            </p>
            <p>
              <strong>Duration:</strong> {trip.tripDetails.duration}
            </p>
            <p>
              <strong>Travelers:</strong> {trip.tripDetails.travelers}
            </p>
            <p>
              <strong>Budget:</strong> {trip.tripDetails.budget}
            </p>
          </div>
        )}

        {activeTab === 'hotels' && trip.hotels && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trip.hotels.map((hotel, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                {hotel.hotelImageURL && (
                  <img
                    src={hotel.hotelImageURL}
                    alt={hotel.hotelName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{hotel.hotelName}</h3>
                  <p className="text-gray-500">{hotel.hotelAddress}</p>
                  <p className="text-gray-500 mt-1">Price: ${hotel.price} per night</p>
                  <p className="text-gray-500">Rating: {hotel.rating}</p>
                  <p className="text-gray-500 mt-1">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'itinerary' && trip.itinerary && (
          <div className="space-y-6">
            {Object.keys(trip.itinerary).map((dayKey) => (
              <div key={dayKey}>
                <h4 className="text-xl font-semibold mb-2 capitalize">{dayKey}</h4>
                <div className="space-y-4">
                  {trip.itinerary[dayKey].map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 border-t pt-4">
                      {item.placeImageURL && (
                        <img
                          src={item.placeImageURL}
                          alt={item.placeName}
                          className="w-full md:w-1/3 h-48 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-lg font-bold">{item.placeName}</p>
                        <p className="text-gray-500">{item.placeDetails}</p>
                        <p className="text-gray-500 mt-1">
                          <strong>Ticket:</strong> {item.ticketPricing} | <strong>Best time:</strong> {item.bestTimeToVisit} | <strong>Travel:</strong> {item.travelTimeToFromPrevious}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DisplayGeneratedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/generated-trips');
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
        toast.error('Failed to load trips.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">Loading trips...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-10">Generated Trips</h1>
        {trips.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No trips have been generated yet.</p>
        ) : (
          trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
        )}
      </div>
    </div>
  );
};

export default DisplayGeneratedTrips;
